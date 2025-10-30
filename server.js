const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// ✅ Allow both localhost & Vercel
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://task-tracker-frontend.vercel.app",
];


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server and no-origin requests (e.g. Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests (Express 5 safe)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  }
  next();
});

// ✅ Parse JSON
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Task Tracker Backend running with full CORS support!");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Start server on port 5000 (for local testing)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
