import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import {
  addExpense,
  getExpenses,
  deleteExpense
} from "./services/api";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const add = async (expense) => {
    await addExpense(expense);
    loadExpenses();
  };

  const remove = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Expense Tracker
      </Typography>

      <ExpenseForm onAdd={add} />
      <ExpenseList expenses={expenses} onDelete={remove} />
    </Container>
  );
}
