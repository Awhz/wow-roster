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
        secondarySpec TEXT,
        role TEXT,
        playstyle TEXT,
        comment TEXT,
        rerolls TEXT,
        isAccepted INTEGER DEFAULT 0,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Migration: Add columns if they don't exist
    const columnsToAdd = [
      { name: 'comment', type: 'TEXT' },
      { name: 'secondarySpec', type: 'TEXT' },
      { name: 'rerolls', type: 'TEXT' },
      { name: 'isAccepted', type: 'INTEGER DEFAULT 0' }
    ];

    for (const col of columnsToAdd) {
      try {
        await db.execute(`ALTER TABLE roster ADD COLUMN ${col.name} ${col.type}`);
        console.log(`Migration: Added '${col.name}' column to roster table.`);
      } catch (err) {
        if (!err.message.includes("duplicate column name")) {
          // console.log(`Column '${col.name}' already exists or other error:`, err.message);
        }
      }
    }

    console.log("Database initialized connected to:", url);
  } catch (err) {
    console.error("Error initializing database:", err);
  }
})();

module.exports = db;
