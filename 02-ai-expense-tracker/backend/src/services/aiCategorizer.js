import axios from "axios";

const CATEGORIES = [
  "Food",
  "Transport",
  "Groceries",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Travel",
  "Other",
];

export async function categorizeExpense(description) {
  const prompt = `
You are an expense categorization AI.

Given an expense description, classify it into ONE of these categories:
${CATEGORIES.join(", ")}

Respond strictly in JSON:
{
  "category": "<category>",
  "confidence": <number between 0 and 100>
}

Expense: "${description}"
`;

  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2:1b",
    prompt,
    stream: false,
  });

  try {
    return JSON.parse(res.data.response);
  } catch {
    return { category: "Other", confidence: 50 };
  }
}
