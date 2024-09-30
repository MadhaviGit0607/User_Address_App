const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db/database');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/register', (req, res) => {
    const { name, address } = req.body;

    const userQuery = 'INSERT INTO User (name) VALUES (?)';
    db.run(userQuery, [name], function(err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ error: 'User registration failed.' });
        }

    const userId = this.lastID; 

    const addressQuery = 'INSERT INTO address (userId, address) VALUES (?, ?)';
    db.run(addressQuery, [userId, address], (err) => {
        if (err) {
            console.error('Error inserting address:', err.message);
            return res.status(500).json({ error: 'Address registration failed.' });
        }

        res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});


app.get('/users', (req, res) => {
    const query = `
        SELECT User.id, User.name, Address.address
        FROM User
        LEFT JOIN Address ON User.id = Address.userId;
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving users:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve users.' });
        }
        
        res.status(200).json(rows);
    });
});

app.get('/address', (req, res) => {
    const query = `
        SELECT Address.id, Address.userId, Address.address, User.name
        FROM Address
        LEFT JOIN User ON Address.userId = User.id;
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving addresses:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve addresses.' });
        }
        
        res.status(200).json(rows);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
