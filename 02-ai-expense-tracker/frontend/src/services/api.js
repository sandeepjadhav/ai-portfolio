import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export const addExpense = async (expense) => {
  const res = await axios.post(`${API_BASE}/expenses`, expense);
  return res.data;
};

export const getExpenses = async () => {
  const res = await axios.get(`${API_BASE}/expenses`);
  return res.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_BASE}/expenses/${id}`);
};
