import path from "path";
import * as fs from "fs";
import {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === 'GET') {
    try {
      const filePath = path.resolve(process.cwd(), 'prompt.txt');
      console.log('Prompt file path: ', filePath);
      const prompt = fs.readFileSync(filePath, 'utf8');
      res.status(200).json({ prompt });
    } catch (error) {
      res.status(500).json({ error: 'Unable to load prompt' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
