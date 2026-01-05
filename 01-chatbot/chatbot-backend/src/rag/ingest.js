import fs from "fs";
import * as pdf from "pdf-parse";
import { getCollection } from "./search.js";
import { OllamaEmbeddings } from "@langchain/ollama";

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
  baseUrl: "http://localhost:11434"
});

export async function ingestFile(filePath) {
  let text = "";

  if (filePath.endsWith(".pdf")) {
    const data = await pdf(fs.readFileSync(filePath));
    text = data.text;
  } else {
    text = fs.readFileSync(filePath, "utf-8");
  }

  // Simple chunking
  const chunks = text.match(/.{1,800}/g) || [];

  // 🔥 Generate embeddings ourselves
  const vectors = await embeddings.embedDocuments(chunks);

  const collection = await getCollection();

  await collection.add({
    ids: chunks.map((_, i) => `${filePath}-${i}`),
    documents: chunks,
    embeddings: vectors
  });
}
