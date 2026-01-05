// import axios from "axios";

// export const sendMessage = async (message) => {
//   const res = await axios.post("http://localhost:3000/api/chat", {
//     message
//   });
//   return res.data.reply;
// };

// export async function sendMessage(message, sessionId) {
//   const res = await fetch("http://localhost:3000/api/chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ message, sessionId })
//   });

//   const data = await res.json();
//   return data.reply;
// }

export async function sendMessage(message, chatId) {
  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message }),
  });

  const data = await res.json();
  return data.reply;
}

export async function fetchChats() {
  const res = await fetch("http://localhost:3000/api/chat/chats");
  return res.json();
}

export async function fetchMessages(chatId) {
  const res = await fetch(
    `http://localhost:3000/api/chat/chats/${chatId}/messages`
  );
  return res.json();
}

export async function streamMessage(message, onChunk) {
  const res = await fetch("http://localhost:3000/api/chat/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const matches = text.match(/data:\s*(.*)/g) || [];

    for (const m of matches) {
      const chunk = m.replace("data:", "").trim();
      if (chunk !== "[DONE]") onChunk(chunk);
    }
  }
}

export async function renameChat(chatId, title) {
  await fetch(`http://localhost:3000/api/chat/chats/${chatId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
}

export async function deleteChat(chatId) {
  await fetch(`http://localhost:3000/api/chat/chats/${chatId}`, {
    method: "DELETE"
  });
}
export async function uploadDocument(file) {
  const form = new FormData();
  form.append("file", file);

  await fetch("http://localhost:3000/api/documents/upload", {
    method: "POST",
    body: form
  });
}