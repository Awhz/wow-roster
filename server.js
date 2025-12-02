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
    const { name, characterClass, spec, secondarySpec, role, playstyle, comment, rerolls } = req.body;
    try {
        const result = await db.execute({
            sql: "INSERT INTO roster (name, characterClass, spec, secondarySpec, role, playstyle, comment, rerolls) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            args: [name, characterClass, spec, secondarySpec, role, playstyle, comment, JSON.stringify(rerolls)]
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

// API to update roster entry (Admin)
app.put('/api/roster/:id', async (req, res) => {
    const { id } = req.params;
    const { name, characterClass, spec, secondarySpec, role, playstyle, comment, rerolls, isAccepted } = req.body;

    try {
        // Dynamic update query construction could be better, but for now simple fixed query
        // We assume all fields are sent or we handle partial updates if needed. 
        // For simplicity, let's update everything provided.

        // However, for the specific "Accept" toggle, we might only send isAccepted.
        // Let's check what's in the body.

        let sql = "UPDATE roster SET ";
        const args = [];
        const updates = [];

        if (name !== undefined) { updates.push("name = ?"); args.push(name); }
        if (characterClass !== undefined) { updates.push("characterClass = ?"); args.push(characterClass); }
        if (spec !== undefined) { updates.push("spec = ?"); args.push(spec); }
        if (secondarySpec !== undefined) { updates.push("secondarySpec = ?"); args.push(secondarySpec); }
        if (role !== undefined) { updates.push("role = ?"); args.push(role); }
        if (playstyle !== undefined) { updates.push("playstyle = ?"); args.push(playstyle); }
        if (comment !== undefined) { updates.push("comment = ?"); args.push(comment); }
        if (rerolls !== undefined) { updates.push("rerolls = ?"); args.push(JSON.stringify(rerolls)); }
        if (isAccepted !== undefined) { updates.push("isAccepted = ?"); args.push(isAccepted); }

        if (updates.length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        sql += updates.join(", ") + " WHERE id = ?";
        args.push(id);

        const result = await db.execute({ sql, args });
        res.json({ message: "Entry updated successfully", changes: result.rowsAffected });
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
