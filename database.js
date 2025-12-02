const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./roster.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS roster (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    characterClass TEXT,
    spec TEXT,
    role TEXT,
    playstyle TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
