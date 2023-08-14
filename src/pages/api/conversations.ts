import {NextApiRequest, NextApiResponse} from 'next';
// import Database from 'better-sqlite3';

let Database: any;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new Database('./conversations.db');

  db.exec(`
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            ai TEXT NOT NULL
        );
    `);

  if (req.method === 'POST') {
    const stmt = db.prepare('INSERT INTO conversations (user, ai) VALUES (?, ?)');
    const result = stmt.run(req.body.user, req.body.ai);
    res.json(result);
  }

  if (req.method === 'GET') {
    const conversations = db.prepare('SELECT * FROM conversations').all();
    res.json(conversations);
  }
}
