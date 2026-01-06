import axios from "axios";

export async function budgetAdvice(overruns) {
  const prompt = `
You are a financial advisor.

These categories exceeded budget:
${JSON.stringify(overruns, null, 2)}

Give short, practical advice.
`;

  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2:1b",
    prompt,
    stream: false,
  });

  return res.data.response;
}
