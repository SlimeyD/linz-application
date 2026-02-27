import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

// Ensure these environment variables are set in your .env.local file
function getAssistantId(): string {
  const id = process.env.OPENAI_ASSISTANT_ID;
  if (!id) throw new Error('Missing OPENAI_ASSISTANT_ID environment variable.');
  return id;
}

// Simple in-memory rate limiting for demonstration purposes.
// In a production environment, consider persistent storage (e.g., Redis) and more robust mechanisms.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_HOUR = 20;
const RESET_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Extracts the client's IP address from the request headers.
 * Prioritizes 'x-forwarded-for' for proxy compatibility.
 */
function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  // Fallback for non-proxied environments or testing
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  let currentThreadId: string | undefined; // To store the final thread ID for the header

  try {
    const { threadId: clientThreadId, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const clientIp = getClientIp(req);
    const now = Date.now();

    // Apply rate limiting
    let userRateLimit = rateLimitMap.get(clientIp);
    if (!userRateLimit || now >= userRateLimit.resetAt) {
      userRateLimit = { count: 0, resetAt: now + RESET_WINDOW_MS };
      rateLimitMap.set(clientIp, userRateLimit);
    }

    if (userRateLimit.count >= MAX_MESSAGES_PER_HOUR) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }

    // Initialize or retrieve the thread
    let thread;
    if (clientThreadId) {
      try {
        thread = await openai.beta.threads.retrieve(clientThreadId);
      } catch (error: any) {
        // If thread not found or other retrieval error, create a new one
        console.warn(`Failed to retrieve thread ${clientThreadId}. Creating a new one.`, error);
        thread = await openai.beta.threads.create();
      }
    } else {
      thread = await openai.beta.threads.create();
    }
    currentThreadId = thread.id; // Store thread ID for the response header

    // Add the user message to the thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Increment rate limit count AFTER successfully adding a user message
    userRateLimit.count++;
    rateLimitMap.set(clientIp, userRateLimit); // Update map with new count

    // Create a run with streaming enabled
    const runStream = openai.beta.threads.runs.stream(currentThreadId, {
      assistant_id: getAssistantId(),
      // If the assistant is not pre-configured with the vector store,
      // you would add tool_resources here:
      // tool_resources: {
      //   file_search: {
      //     vector_store_ids: [OPENAI_VECTOR_STORE_ID!],
      //   },
      // },
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const event of runStream) {
          // Look for 'thread.message.delta' events which contain the assistant's response fragments
          if (event.event === 'thread.message.delta' && event.data.delta.content) {
            for (const contentDelta of event.data.delta.content) {
              if (contentDelta.type === 'text' && contentDelta.text?.value) {
                // Encode and enqueue the text value for streaming
                controller.enqueue(encoder.encode(contentDelta.text.value));
              }
            }
          }
          // Other events like 'thread.run.completed', 'thread.tool.steps' etc.,
          // can be handled here if more granular client-side UI updates are needed.
        }
        controller.close();
      },
    });

    // Return a streaming response with the custom thread ID header
    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain', // Use text/plain for raw text streaming
        'X-Thread-Id': currentThreadId, // Custom header for thread ID
        'Cache-Control': 'no-cache, no-transform', // Important for streaming responses
      },
      status: 200,
    });
  } catch (error) {
    console.error('API Error:', error);

    // Provide a more descriptive error message if it's an OpenAI error
    let errorMessage = 'An unexpected error occurred.';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      // You could check for specific error types from OpenAI if needed
      // e.g., if (error.name === 'OpenAIError') statusCode = error.status;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode, headers: { 'X-Thread-Id': currentThreadId || '' } });
  }
}
