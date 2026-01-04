import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderTop: "1px solid #ddd",
        bgcolor: "white"
      }}
    >
      <TextField
        fullWidth
        placeholder="Send a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <Button onClick={send} sx={{ ml: 2 }} variant="contained">
        Send
      </Button>
    </Box>
  );
}
