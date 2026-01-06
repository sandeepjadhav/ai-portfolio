import express from "express";
import { checkBudget } from "../services/budgetService.js";
import { budgetAdvice } from "../services/aiBudgetAdvisor.js";

const router = express.Router();

router.get("/alerts", async (req, res) => {
  const { month } = req.query;

  const overruns = checkBudget(month);
  const advice = await budgetAdvice(overruns);

  res.json({ overruns, advice });
});

export default router;
