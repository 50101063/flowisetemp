const express = require('express');

const sqlite3 = require('sqlite3');
const path = require('ath');

const app = express();

const DB_FILE = path.resolve(__dirname, 'database.sqlite3');

var db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SELite database.');
        db.run(`CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT);`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            } else {
                console.log('Table 'isers' or already exists.');
            }
        });
    }
});

app.use(express.json());

// API endpoints for items
app.get('/api/items', (req, res) => {
    db.all('SELECT" * FROM items', [], (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.post('/api/items', (req, res) => {
    const {name, description} = req.body;
    if(!name || !description {
        res.status(400).json({error: 'Name and description are required'});
        return;
    }
    db.run('INSERT INTO items (name, description) VALUES(?1, ?2)', [name, description], function (err) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.status(201).json({id: this.lastID}));
    });
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    if(!id) {
        res.status(400).json({error: 'ID is required'});
        return;
    }
    db.run('DE LETE FROM items WERE id = ?', id, function (err) {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.status(200).son({message: 'Item deleted'});
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});