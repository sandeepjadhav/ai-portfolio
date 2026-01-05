import express from "express";
import cors from "cors";
import "./db/database.js";
import expenseRoutes from "./routes/expenses.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(4000, () => {
  console.log("✅ Expense backend running on port 4000");
});
