import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const submit = () => {
    if (!form.amount || !form.date) return;

    onAdd({
      ...form,
      amount: Number(form.amount)
    });

    setForm({
      amount: "",
      category: "",
      description: "",
      date: ""
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="Amount"
        type="number"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />
      <TextField
        label="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />
      <TextField
        label="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
      <TextField
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={submit}>
        Add
      </Button>
    </Box>
  );
}
