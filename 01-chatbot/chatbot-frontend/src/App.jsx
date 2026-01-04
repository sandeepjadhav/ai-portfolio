import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import {
  sendMessage,
  fetchChats,
  fetchMessages
} from "./services/api";

export default function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // 🔹 Load chats on app start
  useEffect(() => {
    fetchChats().then(setChats);
  }, []);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // 🔹 FIX: Use this function
  const selectChat = async (chatId) => {
    setActiveChatId(chatId);

    const messages = await fetchMessages(chatId);

    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId ? { ...c, messages } : c
      )
    );
  };

  const newChat = () => {
    const id = crypto.randomUUID();
    setChats([
      {
        id,
        title: "New Chat",
        messages: []
      },
      ...chats
    ]);
    setActiveChatId(id);
  };

  const send = async (text) => {
    if (!activeChatId) return;

    // Add user message immediately
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title:
                c.messages.length === 0
                  ? text.slice(0, 20)
                  : c.title,
              messages: [
                ...c.messages,
                { role: "user", content: text }
              ]
            }
          : c
      )
    );

    const reply = await sendMessage(text, activeChatId);

    // Add AI response
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { role: "assistant", content: reply }
              ]
            }
          : c
      )
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelect={selectChat}  
        onNew={newChat}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <ChatWindow messages={activeChat?.messages || []} />
        {activeChatId && <ChatInput onSend={send} />}
      </Box>
    </Box>
  );
}
