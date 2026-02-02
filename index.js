const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 1. Connection Logic (Cached)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Give up after 5 seconds instead of 30
    });
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

// 2. Routes (Moved outside main to be registered immediately)
const ItemRoute = require("./src/routes/itemRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");

// Health check and root
app.get('/', (req, res) => {
  res.send('Spicy Script Recipe App Server');
});

// Apply DB connection to all /api routes
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use('/api', ItemRoute);
app.use('/api', CategoryRoutes);

// 3. Export for Vercel (Instead of just app.listen)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Local server listening on port ${port}`);
  });
}

module.exports = app;
