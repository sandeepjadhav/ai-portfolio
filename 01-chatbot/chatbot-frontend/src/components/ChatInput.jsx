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
        bgcolor: "white",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Send a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.ctrlKey) {
            e.preventDefault();
            send();
          }

          if (e.key === "Escape") {
            setText("");
          }
        }}
      />
      <Button onClick={send} sx={{ ml: 2 }} variant="contained">
        Send
      </Button>
    </Box>
  );
}
