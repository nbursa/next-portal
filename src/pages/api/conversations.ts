import {NextApiRequest, NextApiResponse} from 'next';
import Database from 'better-sqlite3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = new Database('./conversations.db');

  db.exec(`
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            ai TEXT NOT NULL
        );s
    `);

  try {
    if (req.method === 'POST') {
      const conversations = req.body;

      if (!Array.isArray(conversations)) {
        res.status(400).json({ error: 'Invalid conversation data format.' });
        return;
      }

      const lastConversation = conversations[conversations.length - 1];
      const { user, ai } = lastConversation;

      if (user && ai) {
        const stmt = db.prepare('INSERT INTO conversations (user, ai) VALUES (?, ?)');
        stmt.run(user, ai);
        res.json({ message: 'Last conversation added successfully.' });
      } else {
        res.status(400).json({ error: 'Invalid conversation entry format.' });
      }
    }

    if (req.method === 'GET') {
      const conversations = db.prepare('SELECT * FROM conversations').all();
      res.json(conversations);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  } finally {
    db.close();
  }
}