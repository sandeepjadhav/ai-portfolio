import axios from "axios";

export async function parseExpenseQuery(query) {
  const prompt = `
You are an expense query parser.

Convert the user query into JSON:
{
  "type": "summary | category | total",
  "month": "YYYY-MM or null",
  "category": "category or null"
}

User query: "${query}"
`;

  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2:1b",
    prompt,
    stream: false,
  });

  try {
    return JSON.parse(res.data.response);
  } catch {
    return null;
  }
}
