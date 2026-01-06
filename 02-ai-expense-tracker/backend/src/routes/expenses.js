import express from "express";
import db from "../db/database.js";
import { categorizeExpense } from "../services/aiCategorizer.js";

const router = express.Router();

/**
 * Add a new expense
 */
 router.post("/", async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || !date) {
    return res.status(400).json({ error: "amount and date required" });
  }

  let finalCategory = category;
  let aiCategory = null;
  let aiConfidence = null;
  let categorySource = "manual";

  // 🤖 AI categorization if category not provided
  if (!category && description) {
    const aiResult = await categorizeExpense(description);

    finalCategory = aiResult.category;
    aiCategory = aiResult.category;
    aiConfidence = aiResult.confidence;
    categorySource = "ai";
  }

  const result = db.prepare(`
    INSERT INTO expenses 
    (amount, category, description, date, ai_category, ai_confidence, category_source)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    amount,
    finalCategory,
    description,
    date,
    aiCategory,
    aiConfidence,
    categorySource
  );

  res.json({
    id: result.lastInsertRowid,
    amount,
    category: finalCategory,
    aiCategory,
    aiConfidence,
    categorySource
  });
});

/**
 * List expenses (optionally filtered)
 */
router.get("/", (req, res) => {
  const { from, to, category } = req.query;

  let query = "SELECT * FROM expenses WHERE 1=1";
  const params = [];

  if (from) {
    query += " AND date >= ?";
    params.push(from);
  }

  if (to) {
    query += " AND date <= ?";
    params.push(to);
  }

  if (category) {
    query += " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY date DESC";

  const expenses = db.prepare(query).all(...params);

  res.json(expenses);
});

/**
 * Delete an expense
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.prepare("DELETE FROM expenses WHERE id = ?").run(id);

  res.json({ success: true });
});

export default router;
