import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;
app.use(cors());
app.use(express.json());

let db;
const initDB = async () => {
    try {
        db = await open({
            filename: './orders.db',
            driver: sqlite3.Database
        });
        await db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'PENDING',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('SQLite (Order Service) initialized.');
    } catch (err) {
        console.error('SQLite connection error:', err);
    }
};
initDB();

app.get('/health', (req, res) => res.status(200).json({ status: 'OK', service: 'order-service' }));

app.post('/', async (req, res) => {
  try {
    const { user_id, total_amount } = req.body;
    const result = await db.run(
        'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
        [user_id, total_amount]
    );
    const order = await db.get('SELECT * FROM orders WHERE id = ?', result.lastID);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/user/:userId', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Order service is running on port ${PORT}`));
