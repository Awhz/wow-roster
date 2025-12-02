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
        comment TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add comment column if it doesn't exist (for existing DBs)
    try {
      await db.execute("ALTER TABLE roster ADD COLUMN comment TEXT");
      console.log("Migration: Added 'comment' column to roster table.");
    } catch (err) {
      // Ignore error if column already exists
      if (!err.message.includes("duplicate column name")) {
        // console.log("Column 'comment' already exists or other error:", err.message);
      }
    }

    console.log("Database initialized connected to:", url);
  } catch (err) {
    console.error("Error initializing database:", err);
  }
})();

module.exports = db;
