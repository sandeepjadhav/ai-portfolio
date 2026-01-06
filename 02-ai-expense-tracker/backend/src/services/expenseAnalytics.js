import db from "../db/database.js";

export function getMonthlySummary(month) {
  // month format: YYYY-MM
  const rows = db
    .prepare(
      `
    SELECT 
      category,
      SUM(amount) as total
    FROM expenses
    WHERE strftime('%Y-%m', date) = ?
    GROUP BY category
    ORDER BY total DESC
  `
    )
    .all(month);

  const totalSpent = rows.reduce((sum, r) => sum + r.total, 0);

  return {
    month,
    totalSpent,
    breakdown: rows,
  };
}
