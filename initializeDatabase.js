const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "conversations.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user text, 
      ai text
      )`,
            (err) => {
                if (err) {
                    console.log('Table already exists.')
                }
            });
    }
});

module.exports = db
