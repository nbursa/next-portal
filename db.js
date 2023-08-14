const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('conversations.db');

db.all('SELECT * FROM conversations', (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    if (rows.length > 0) {
        return rows.forEach(row => {
            console.log(row);
        });
    }
    return console.log('No entries found');
});

db.close();