import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Dialog, DialogTitle, DialogActions } from "@mui/material";

export default function Sidebar({
  chats,
  activeChatId,
  onSelect,
  onNew,
  onRename,
  onDelete,
}) {
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <>
      <Box
        sx={{
          width: 260,
          bgcolor: "#202123",
          color: "white",
          height: "100vh",
          p: 1,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          sx={{ mb: 2, color: "white" }}
          onClick={onNew}
        >
          + New Chat
        </Button>
        <TextField
          size="small"
          placeholder="Search chats"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 1, bgcolor: "#2a2b2f" }}
        />
        <List>
          {chats
            .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
            .map((chat) => (
              <ListItem
                key={chat.id}
                selected={chat.id === activeChatId}
                onClick={() => onSelect(chat.id)}
                onDoubleClick={() => {
                  setEditingId(chat.id);
                  setTitle(chat.title);
                }}
              >
                {editingId === chat.id ? (
                  <TextField
                    value={title}
                    size="small"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => {
                      onRename(chat.id, title);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onRename(chat.id, title);
                        setEditingId(null);
                      }
                    }}
                  />
                ) : (
                  <>
                    <ListItemText primary={chat.title} />
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmId(chat.id);
                      }}
                    >
                      <DeleteIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </>
                )}
              </ListItem>
            ))}
        </List>
      </Box>
      <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
        <DialogTitle>Delete this chat?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => {
              onDelete(confirmId);
              setConfirmId(null);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
