import Database from "better-sqlite3";
import fs from "fs";

if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}

const db = new Database("data/expenses.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category TEXT,
    description TEXT,
    date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

try {
  db.exec(`ALTER TABLE expenses ADD COLUMN ai_category TEXT`);
  db.exec(`ALTER TABLE expenses ADD COLUMN ai_confidence REAL`);
  db.exec(`ALTER TABLE expenses ADD COLUMN category_source TEXT`);
} catch (e) {}

db.exec(`
  CREATE TABLE IF NOT EXISTS budgets (
    category TEXT,
    month TEXT,
    limit_amount REAL
  );
`);


export default db;
