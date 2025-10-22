const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// ✅ CORS configuration compatible with Express 5 / Node 22
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-tracker-client.vercel.app",
  "https://task-tracker-client-mm41l9r2t-aii-codes-projects.vercel.app",
  "https://task-tracker-client-r31l3rk6l-aii-codes-projects.vercel.app", // new deploy
];


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests manually (Express 5 safe)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Task Tracker Backend is running with CORS configured correctly!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
