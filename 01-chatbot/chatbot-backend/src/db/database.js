import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbDir = path.resolve("data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);

const db = new Database("data/chat.db");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT,
    role TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
