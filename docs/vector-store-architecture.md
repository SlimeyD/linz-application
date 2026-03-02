# Vector Store & RAG Architecture

## Overview

This application uses OpenAI's Responses API with a built-in vector store for Retrieval-Augmented Generation (RAG). User queries are augmented with relevant information retrieved from a predefined knowledge base, enabling accurate and context-rich responses about the LINZ District Valuation Roll (DVR).

## How It Works

1.  **User Query**: A user sends a message through the chat interface.
2.  **API Route**: The frontend calls `src/app/api/chat/route.ts` with the message and `previous_response_id` for conversation continuity.
3.  **OpenAI Responses API**: The route invokes `openai.responses.create()`:
    *   Model: `gpt-4o-mini` (configured in `src/lib/assistant-config.ts`).
    *   `file_search` tool with the vector store ID (`OPENAI_VECTOR_STORE_ID`).
    *   OpenAI performs semantic search on the vector store, retrieves relevant documents, and augments generation.
4.  **Citation Processing**: The route processes file search annotations (`【n†filename】` markers):
    *   Strips inline citation markers from the text.
    *   Appends a "Sources:" footer with links mapped via `src/lib/citation-config.ts`.
5.  **Streaming**: The response is streamed to the frontend in real-time.

## Setup

The vector store is created by a one-time setup script:

```bash
npx tsx scripts/setup-assistant.ts
```

The script performs these steps:

1.  Creates a vector store via `openai.vectorStores.create()`.
2.  Uploads all markdown files from `/knowledge/`.
3.  Attaches files to the vector store.
4.  Polls until indexing completes.
5.  Outputs `OPENAI_VECTOR_STORE_ID` — add this to `.env.local`.

> **Note:** The script also creates an OpenAI Assistant via `openai.beta.assistants.create()`, but this assistant is **not used at runtime**. See [Vestigial Assistant ID](#note-on-vestigial-assistant-id).

## Knowledge Base

7 markdown files in `/knowledge/`:

| File | Content |
|------|---------|
| `dvr-data-dictionary.md` | Main field definitions and structure |
| `dvr-lookup-codes.md` | Property codes and reference tables |
| `dvr-api-access.md` | API documentation and access patterns |
| `dvr-data-availability.md` | Geographic coverage and territorial authorities |
| `dvr-common-issues.md` | FAQs and troubleshooting |
| `dvr-metadata.md` | ISO metadata and data governance |
| `dvr-table-relationships.md` | Database schema and relationships |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `OPENAI_VECTOR_STORE_ID` | Yes | Vector store ID (from setup script) |
| `OPENAI_ASSISTANT_ID` | No | Set by setup script but **not used at runtime** |

## Key Files

| File | Purpose |
|------|---------|
| `src/app/api/chat/route.ts` | Runtime API — calls `openai.responses.create()` with `file_search` |
| `scripts/setup-assistant.ts` | One-time setup — creates vector store and uploads knowledge |
| `knowledge/*.md` | Knowledge base documents |
| `src/lib/citation-config.ts` | Filename → URL mapping for citation links |
| `src/lib/assistant-config.ts` | Model and system instructions config |

## Updating Knowledge

1.  Edit or add markdown files in `/knowledge/`.
2.  Re-run the setup script — this creates a **new** vector store.
3.  Update `OPENAI_VECTOR_STORE_ID` in `.env.local` with the new ID.

Alternatively, update an existing vector store via the OpenAI dashboard or API.

## Note on Vestigial Assistant ID

`OPENAI_ASSISTANT_ID` is created by the setup script but is **not referenced** by any runtime code. The app calls `openai.responses.create()` directly with the vector store ID — the Assistants API is not involved at runtime. This env var can safely be removed.
