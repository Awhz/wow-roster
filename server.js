const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API to submit roster entry
app.post('/api/roster', (req, res) => {
    const { name, characterClass, spec, role, playstyle } = req.body;
    const stmt = db.prepare("INSERT INTO roster (name, characterClass, spec, role, playstyle) VALUES (?, ?, ?, ?, ?)");
    stmt.run(name, characterClass, spec, role, playstyle, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: "Entry added successfully" });
    });
    stmt.finalize();
});

// API to get all roster entries (for admin)
app.get('/api/roster', (req, res) => {
    db.all("SELECT * FROM roster", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to reset roster (Admin only)
app.delete('/api/roster', (req, res) => {
    db.run("DELETE FROM roster", [], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Roster reset successfully", changes: this.changes });
    });
});

// API to delete specific roster entry
app.delete('/api/roster/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM roster WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Entry deleted successfully", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
