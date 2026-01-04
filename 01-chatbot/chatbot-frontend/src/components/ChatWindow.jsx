import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ flex: 1, overflowY: "auto", p: 3, bgcolor: "#f7f7f8" }}>
      {messages.map((m, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
          </Typography>
        </Box>
      ))}
      <div ref={bottomRef} />
    </Box>
  );
}
