import { Box, Typography } from "@mui/material";

export default function ChatWindow({ messages }) {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 3,
        bgcolor: "#f7f7f8"
      }}
    >
      {messages.map((m, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start"
          }}
        >
          <Box
            sx={{
              maxWidth: "70%",
              p: 2,
              borderRadius: 2,
              bgcolor: m.role === "user" ? "#1976d2" : "#e0e0e0",
              color: m.role === "user" ? "white" : "black"
            }}
          >
            <Typography>{m.content}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
