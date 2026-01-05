import { ChromaClient } from "chromadb";
import { OllamaEmbeddings } from "@langchain/ollama";

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false
});

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseUrl: "http://localhost:11434"
});

export async function getCollection() {
  return await client.getOrCreateCollection({
    name: "documents"
  });
}

export async function searchDocs(query) {
  const collection = await getCollection();

  // 🔥 Generate embedding explicitly
  const queryEmbedding = await embeddings.embedQuery(query);

  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3
  });

  return result.documents?.flat() || [];
}
