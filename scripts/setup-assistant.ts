import OpenAI from 'openai';
import * as fs from 'node:fs';
import * as path from 'node:path';

const openai = new OpenAI();

const KNOWLEDGE_DIR = 'knowledge';
const ASSISTANT_NAME = 'LINZ Data Assistant';
const VECTOR_STORE_NAME = 'LINZ DVR Documentation';
const MODEL = 'gpt-4o-mini';
const INSTRUCTIONS = `You are the LINZ Data Assistant, an expert on the LINZ District Valuation Roll (DVR) dataset. You help developers query and understand DVR data. Always search the provided documentation before answering. Cite which document area your answer comes from. Be concise, technical but accessible. If unsure, say so rather than guessing.`;

async function setupAssistant() {
  console.log('--- OpenAI Assistant Setup ---');

  if (process.env.OPENAI_ASSISTANT_ID) {
    console.log(`Assistant already exists: ${process.env.OPENAI_ASSISTANT_ID}`);
    return;
  }

  // 1. Create vector store (top-level API in v6)
  console.log('Creating vector store...');
  const vectorStore = await openai.vectorStores.create({
    name: VECTOR_STORE_NAME,
  });
  console.log(`Vector store created: ${vectorStore.id}`);

  // 2. Upload knowledge files
  const knowledgePath = path.join(process.cwd(), KNOWLEDGE_DIR);
  const files = fs.readdirSync(knowledgePath).filter(f => f.endsWith('.md'));
  console.log(`Uploading ${files.length} files...`);

  const fileIds: string[] = [];
  for (const filename of files) {
    const filePath = path.join(knowledgePath, filename);
    const file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: 'assistants',
    });
    fileIds.push(file.id);
    console.log(`  Uploaded: ${filename} -> ${file.id}`);
  }

  // 3. Attach files to vector store
  console.log('Attaching files to vector store...');
  for (const fileId of fileIds) {
    await openai.vectorStores.files.create(vectorStore.id, {
      file_id: fileId,
    });
  }

  // 4. Wait for processing
  console.log('Waiting for files to process...');
  let vs = await openai.vectorStores.retrieve(vectorStore.id);
  while (vs.status === 'in_progress') {
    await new Promise(r => setTimeout(r, 2000));
    vs = await openai.vectorStores.retrieve(vectorStore.id);
    console.log(`  Status: ${vs.status} (${vs.file_counts.completed}/${vs.file_counts.total} files)`);
  }
  console.log(`Vector store ready: ${vs.file_counts.completed} files processed`);

  // 5. Create assistant (still under beta in v6)
  console.log('Creating assistant...');
  const assistant = await openai.beta.assistants.create({
    name: ASSISTANT_NAME,
    model: MODEL,
    instructions: INSTRUCTIONS,
    tools: [{ type: 'file_search' }],
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStore.id],
      },
    },
  });
  console.log(`Assistant created: ${assistant.id}`);

  console.log('\n--- Add these to .env.local ---');
  console.log(`OPENAI_ASSISTANT_ID="${assistant.id}"`);
  console.log(`OPENAI_VECTOR_STORE_ID="${vectorStore.id}"`);
}

setupAssistant().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
