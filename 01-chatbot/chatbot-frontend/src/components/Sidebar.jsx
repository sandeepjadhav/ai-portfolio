import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

export default function Sidebar({ chats, activeChatId, onSelect, onNew }) {
  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#202123",
        color: "white",
        height: "100vh",
        p: 1
      }}
    >
      <Button
        fullWidth
        variant="outlined"
        sx={{ mb: 2, color: "white", borderColor: "gray" }}
        onClick={onNew}
      >
        + New Chat
      </Button>

      <List>
        {chats.map((chat) => (
          <ListItem
            button
            key={chat.id}
            selected={chat.id === activeChatId}
            onClick={() => onSelect(chat.id)}
          >
            <ListItemText
              primary={chat.title}
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
