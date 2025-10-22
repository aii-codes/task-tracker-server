const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// ✅ Apply CORS early — handle all origins and preflight OPTIONS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-tracker-client.vercel.app",
      "https://task-tracker-client-mm41l9r2t-aii-codes-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests manually for safety
app.options('*', cors());

// ✅ Middleware to read JSON data
app.use(express.json());

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('✅ Task Tracker Backend is running and CORS is configured!');
});

// ✅ Route imports
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
