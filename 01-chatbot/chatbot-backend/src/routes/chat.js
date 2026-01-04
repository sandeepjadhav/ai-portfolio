import express from "express";
// import { chatWithLLM, chatWithMemory, streamWithLLM } from "../services/ollama.js";
import { chatWithMemory, streamWithLLM } from "../services/ollama.js";
import db from "../db/database.js";

const router = express.Router();

// router.post("/", async (req, res) => {
//   const { message } = req.body;
//   const reply = await chatWithLLM(message);
//   res.json({ reply });
// });

router.post("/stream", async (req, res) => {
  console.log("🔥 Streaming started");

  const { message } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // nginx safety
  res.flushHeaders?.();

  // 🔥 IMPORTANT: send immediate heartbeat
  res.write(": connected\n\n");

  let closed = false;

  req.on("close", () => {
    closed = true;
    console.log("❌ Client disconnected");
  });

  try {
    await streamWithLLM(message, (chunk) => {
      if (!closed) {
        res.write(`data: ${chunk}\n\n`);
      }
    });

    if (!closed) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (err) {
    console.error("Stream error:", err);
    if (!closed) res.end();
  }
});


/**
 * In-memory conversation store
 * Keyed by sessionId
 */
// const conversations = new Map();

// router.post("/", async (req, res) => {
//   const { message, sessionId } = req.body;

//   if (!sessionId) {
//     return res.status(400).json({ error: "sessionId required" });
//   }

//   // Initialize memory
//   if (!conversations.has(sessionId)) {
//     conversations.set(sessionId, [
//       {
//         role: "system",
//         content: "You are a helpful AI assistant."
//       }
//     ]);
//   }

//   const history = conversations.get(sessionId);

//   // Add user message
//   history.push({ role: "user", content: message });

//   try {
//     const reply = await chatWithMemory(history);

//     // Add assistant reply to memory
//     history.push({ role: "assistant", content: reply });

//     res.json({ reply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "AI error" });
//   }
// });



/**
 * Send message to AI
 */
router.post("/", async (req, res) => {
  const { chatId, message } = req.body;

  if (!chatId || !message) {
    return res.status(400).json({ error: "chatId and message required" });
  }

  // Create chat if not exists
  const chat = db
    .prepare("SELECT * FROM chats WHERE id = ?")
    .get(chatId);

  if (!chat) {
    db.prepare(
      "INSERT INTO chats (id, title) VALUES (?, ?)"
    ).run(chatId, message.slice(0, 30));
  }

  // Save user message
  db.prepare(
    "INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)"
  ).run(chatId, "user", message);

  // Load full conversation
  const history = db
    .prepare(
      "SELECT role, content FROM messages WHERE chat_id = ? ORDER BY id"
    )
    .all(chatId);

  // Add system prompt
  const messages = [
    { role: "system", content: "You are a helpful AI assistant." },
    ...history
  ];

  try {
    const reply = await chatWithMemory(messages);

    // Save AI reply
    db.prepare(
      "INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)"
    ).run(chatId, "assistant", reply);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

/**
 * Get all chats (sidebar)
 */
router.get("/chats", (req, res) => {
  const chats = db
    .prepare("SELECT * FROM chats ORDER BY created_at DESC")
    .all();

  res.json(chats);
});

/**
 * Get messages of a chat
 */
router.get("/chats/:chatId/messages", (req, res) => {
  const messages = db
    .prepare(
      "SELECT role, content FROM messages WHERE chat_id = ? ORDER BY id"
    )
    .all(req.params.chatId);

  res.json(messages);
});

// Rename a chat
router.put("/chats/:chatId", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title required" });
  }

  db.prepare(
    "UPDATE chats SET title = ? WHERE id = ?"
  ).run(title, req.params.chatId);

  res.json({ success: true });
});

router.delete("/chats/:chatId", (req, res) => {
  const { chatId } = req.params;

  db.prepare("DELETE FROM messages WHERE chat_id = ?").run(chatId);
  db.prepare("DELETE FROM chats WHERE id = ?").run(chatId);

  res.json({ success: true });
});

export default router;
