import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { addExpense, getExpenses, deleteExpense, getMonthlyInsights } from "./services/api";
import MonthlyInsights from "./components/MonthlyInsights";
import ExpenseCharts from "./components/ExpenseCharts";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState(null);

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

  useEffect(() => {
    getMonthlyInsights("2026-01").then(setInsights);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Expense Tracker
      </Typography>

      <ExpenseForm onAdd={add} />
      <ExpenseList expenses={expenses} onDelete={remove} />
      <MonthlyInsights data={insights} />
<ExpenseCharts data={insights?.summary?.breakdown} />

    </Container>
  );
}
