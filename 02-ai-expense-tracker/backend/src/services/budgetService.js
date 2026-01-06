import db from "../db/database.js";

export function checkBudget(month) {
  const budgets = db
    .prepare(
      `
    SELECT b.category, b.limit_amount, SUM(e.amount) as spent
    FROM budgets b
    LEFT JOIN expenses e
      ON b.category = e.category
     AND strftime('%Y-%m', e.date) = b.month
    WHERE b.month = ?
    GROUP BY b.category
  `
    )
    .all(month);

  return budgets.filter((b) => b.spent > b.limit_amount);
}
