const sqlite3 = require('sqlite3').Database;

const db = new sqlite3('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    }
});

// Create tables if they do not exist
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS User`);
    
    db.run(`CREATE TABLE User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE Address(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        address TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

module.exports = db;
