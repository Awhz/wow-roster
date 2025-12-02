const { createClient } = require('@libsql/client');
require('dotenv').config({ path: '.env.local' });

const url = process.env.TURSO_DATABASE_URL || 'file:roster.db';
const authToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
  url,
  authToken,
});

// Initialize database table
(async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS roster (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        characterClass TEXT,
        spec TEXT,
        role TEXT,
        playstyle TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database initialized connected to:", url);
  } catch (err) {
    console.error("Error initializing database:", err);
  }
})();

module.exports = db;
