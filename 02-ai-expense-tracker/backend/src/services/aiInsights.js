import axios from "axios";

export async function generateInsights(summary) {
  const prompt = `
You are a personal finance advisor.

Here is the user's expense summary for ${summary.month}:

Total spent: ₹${summary.totalSpent}

Category breakdown:
${summary.breakdown.map((b) => `- ${b.category}: ₹${b.total}`).join("\n")}

Provide:
1. Key spending observations
2. Potential problems
3. Practical saving suggestions

Respond in JSON with:
{
  "observations": [],
  "warnings": [],
  "suggestions": []
}
`;

  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2:1b",
    prompt,
    stream: false,
  });

  try {
    return JSON.parse(res.data.response);
  } catch {
    return {
      observations: [],
      warnings: [],
      suggestions: [],
    };
  }
}
