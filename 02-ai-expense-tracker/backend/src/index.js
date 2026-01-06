import express from "express";
import cors from "cors";
import "./db/database.js";
import expenseRoutes from "./routes/expenses.js";
import insightRoutes from "./routes/insights.js";
import queryRoutes from "./routes/query.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/query", queryRoutes);


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(4000, () => {
  console.log("✅ Expense backend running on port 4000");
});
