const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// ✅ CORS should always be the first middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow server-to-server or curl
      try {
        const hostname = new URL(origin).hostname;
        if (hostname.endsWith("vercel.app") || hostname.includes("localhost")) {
          return callback(null, true); // ✅ allow all Vercel previews + localhost
        }
      } catch (err) {
        return callback(new Error("Invalid origin"));
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicit preflight handler
app.options("*", (req, res) => {
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// ✅ Parse incoming JSON requests
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("✅ Task Tracker Backend running with proper CORS!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
