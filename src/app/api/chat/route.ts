import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import { ASSISTANT_MODEL, ASSISTANT_INSTRUCTIONS } from '@/lib/assistant-config';
import { CITATION_URL_MAP } from '@/lib/citation-config';

function getVectorStoreId(): string {
  const id = process.env.OPENAI_VECTOR_STORE_ID;
  if (!id) throw new Error('Missing OPENAI_VECTOR_STORE_ID environment variable.');
  return id;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_HOUR = 20;
const RESET_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

/**
 * Replaces OpenAI citation markers in the final text with markdown links.
 * Citations from the Responses API file_search appear as 【n†filename】 markers
 * in the text, with structured annotation data on the completed response.
 */
function processCitations(
  text: string,
  annotations: Array<{ type: string; filename?: string; file_id?: string; index?: number }>,
): string {
  if (!annotations.length) return text;

  let processed = text;

  // Build a deduped list of cited sources for a footer
  const citedSources = new Map<string, { label: string; url: string }>();

  for (const annotation of annotations) {
    if (annotation.type === 'file_citation' && annotation.filename) {
      const mapping = CITATION_URL_MAP[annotation.filename];
      if (mapping) {
        citedSources.set(annotation.filename, mapping);
      }
    }
  }

  // Remove inline citation markers (【...】patterns)
  processed = processed.replace(/【[^】]*】/g, '');

  // Append source links as a footer if there are citations
  if (citedSources.size > 0) {
    const sourceLinks = Array.from(citedSources.values())
      .map((s) => `[${s.label}](${s.url})`)
      .join(' · ');
    processed = processed.trimEnd() + '\n\n**Sources:** ' + sourceLinks;
  }

  return processed;
}

export async function POST(req: NextRequest) {
  try {
    const { previousResponseId, message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Rate limiting
    const clientIp = getClientIp(req);
    const now = Date.now();
    let userRateLimit = rateLimitMap.get(clientIp);
    if (!userRateLimit || now >= userRateLimit.resetAt) {
      userRateLimit = { count: 0, resetAt: now + RESET_WINDOW_MS };
      rateLimitMap.set(clientIp, userRateLimit);
    }
    if (userRateLimit.count >= MAX_MESSAGES_PER_HOUR) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }
    userRateLimit.count++;
    rateLimitMap.set(clientIp, userRateLimit);

    const vectorStoreId = getVectorStoreId();

    // Use the Responses API with streaming
    const stream = await openai.responses.create({
      model: ASSISTANT_MODEL,
      instructions: ASSISTANT_INSTRUCTIONS,
      input: message,
      tools: [{ type: 'file_search' as const, vector_store_ids: [vectorStoreId] }],
      stream: true,
      previous_response_id: previousResponseId || undefined,
    });

    let responseId = '';
    // Collect the full text and annotations for post-processing citations
    let fullText = '';
    const allAnnotations: Array<{ type: string; filename?: string; file_id?: string; index?: number }> = [];

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            // Capture response ID from the created event
            if (event.type === 'response.created') {
              responseId = event.response.id;
            }

            // Stream text deltas to client in real-time
            if (event.type === 'response.output_text.delta') {
              fullText += event.delta;
              controller.enqueue(encoder.encode(event.delta));
            }

            // Collect annotations as they arrive
            if (event.type === 'response.output_text.annotation.added') {
              const ann = event.annotation as { type: string; filename?: string; file_id?: string; index?: number };
              allAnnotations.push(ann);
            }

            // On completion, send processed citations as a final chunk
            if (event.type === 'response.completed') {
              // Also extract annotations from the completed response
              const response = event.response;
              if (response.output) {
                for (const item of response.output) {
                  if (item.type === 'message' && 'content' in item) {
                    for (const content of (item as { content: Array<{ type: string; annotations?: Array<{ type: string; filename?: string; file_id?: string; index?: number }> }> }).content) {
                      if (content.type === 'output_text' && content.annotations) {
                        // Use completed response annotations (more reliable than streamed ones)
                        allAnnotations.length = 0;
                        allAnnotations.push(...content.annotations);
                      }
                    }
                  }
                }
              }

              // Process citations and send the source links as a final chunk
              const processed = processCitations(fullText, allAnnotations);
              if (processed !== fullText) {
                // Send only the diff (the citation footer)
                const citationFooter = processed.slice(fullText.length);
                controller.enqueue(encoder.encode(citationFooter));
              }
            }
          }
          controller.close();
        } catch (streamError) {
          console.error('Stream processing error:', streamError);
          controller.error(streamError);
        }
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain',
        'X-Response-Id': responseId,
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
