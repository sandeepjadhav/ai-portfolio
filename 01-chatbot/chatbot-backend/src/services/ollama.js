import axios from "axios";

export async function chatWithLLM(message) {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3.2:1b",
      prompt: message,
      stream: false
    }
  );

  return response.data.response;
}

/**
 * Sends full conversation to Ollama and returns a single response
 */
export async function chatWithMemory(messages) {
  const response = await axios.post(
    "http://localhost:11434/api/chat",
    {
      model: "llama3.2:1b",
      messages,
      stream: false
    }
  );

  return response.data.message.content;
}


export function streamWithLLM(prompt, onChunk) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3.2:1b",
          prompt,
          stream: true
        },
        { responseType: "stream" }
      );

      response.data.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        for (const line of lines) {
          if (!line.trim()) continue;

          const json = JSON.parse(line);
          if (json.response) onChunk(json.response);

          if (json.done) resolve();
        }
      });

      response.data.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
}
