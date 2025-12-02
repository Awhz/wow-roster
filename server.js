const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

// Fix for BigInt serialization (caused by @libsql/client)
BigInt.prototype.toJSON = function () { return this.toString() };

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API to submit roster entry
app.post('/api/roster', async (req, res) => {
    const { name, characterClass, spec, role, playstyle, comment } = req.body;
    try {
        const result = await db.execute({
            sql: "INSERT INTO roster (name, characterClass, spec, role, playstyle, comment) VALUES (?, ?, ?, ?, ?, ?)",
            args: [name, characterClass, spec, role, playstyle, comment]
        });
        res.json({ id: result.lastInsertRowid, message: "Entry added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get all roster entries (for admin)
app.get('/api/roster', async (req, res) => {
    try {
        const result = await db.execute("SELECT * FROM roster");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to reset roster (Admin only)
app.delete('/api/roster', async (req, res) => {
    try {
        const result = await db.execute("DELETE FROM roster");
        res.json({ message: "Roster reset successfully", changes: result.rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to delete specific roster entry
app.delete('/api/roster/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.execute({
            sql: "DELETE FROM roster WHERE id = ?",
            args: [id]
        });
        res.json({ message: "Entry deleted successfully", changes: result.rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
