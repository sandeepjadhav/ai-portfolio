import express from "express";
import { getMonthlySummary } from "../services/expenseAnalytics.js";
import { generateInsights } from "../services/aiInsights.js";

const router = express.Router();

router.get("/monthly", async (req, res) => {
  const { month } = req.query;
 console.log("Requested insights for month:", month);
  if (!month) {
    return res.status(400).json({ error: "month required (YYYY-MM)" });
  }

  const summary = getMonthlySummary(month);

  const insights = await generateInsights(summary);

  res.json({
    summary,
    insights,
  });
});

export default router;
