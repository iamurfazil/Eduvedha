import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';

import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Database connection
const startDB = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const MONGO_URI = mongoServer.getUri();
  mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to In-Memory MongoDB (Product Service)'))
    .catch(err => console.error('MongoDB connection error:', err));
};
startDB();

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'product-service' });
});

// Seed data function for convenience
const seedProducts = async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.insertMany([
            { name: "Neural Headset Alpha", description: "Next-gen BCI interface.", price: 299.99, image: "🎧", stock: 50 },
            { name: "Quantum Keyboard", description: "Zero-latency typist dream.", price: 149.50, image: "⌨️", stock: 120 },
            { name: "Holo Display Monitor", description: "3D Holographic UI.", price: 899.00, image: "🖥️", stock: 10 },
            { name: "Ergo Logic Mouse", description: "Perfection in grip.", price: 79.99, image: "🖱️", stock: 200 },
            { name: "Cyber Deck X1", description: "Portable edge computing rig.", price: 1499.00, image: "💻", stock: 15 },
            { name: "Synthwave Smart Glasses", description: "AR overlays for daily life.", price: 349.00, image: "🕶️", stock: 75 },
            { name: "Nano-weave Gaming Chair", description: "Auto-adjusting posture support.", price: 499.00, image: "🪑", stock: 30 },
            { name: "Tachyon Router AX", description: "FTL-speed wireless networking.", price: 199.99, image: "📡", stock: 150 },
            { name: "Omni-VR Treadmill", description: "Infinite walking space.", price: 2999.00, image: "🏃", stock: 5 },
            { name: "Haptic Feedback Suit", description: "Feel the digital world.", price: 899.99, image: "👕", stock: 25 },
            { name: "RGB Ambient Towers", description: "Synced room lighting.", price: 89.00, image: "💡", stock: 300 },
            { name: "Data Crystal Drive", description: "10PB hyper-dense storage.", price: 599.00, image: "💾", stock: 42 }
        ]);
        console.log("Database seeded with sample products.");
    }
};
mongoose.connection.once('open', seedProducts);


// API Routes
app.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Product service is running on port ${PORT}`);
});
