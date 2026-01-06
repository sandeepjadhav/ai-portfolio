import express from "express";
import db from "../db/database.js";
import { parseExpenseQuery } from "../services/aiQueryParser.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question } = req.body;

  const parsed = await parseExpenseQuery(question);
  if (!parsed) {
    return res.json({ answer: "Sorry, I couldn't understand the question." });
  }

  let sql = "SELECT SUM(amount) as total FROM expenses WHERE 1=1";
  const params = [];

  if (parsed.month) {
    sql += " AND strftime('%Y-%m', date) = ?";
    params.push(parsed.month);
  }

  if (parsed.category) {
    sql += " AND category = ?";
    params.push(parsed.category);
  }

  const result = db.prepare(sql).get(...params);

  res.json({
    parsed,
    answer: `Total spent: ₹${result.total || 0}`
  });
});

export default router;
