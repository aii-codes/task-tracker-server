const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// 🧩 UNIVERSAL, FUTURE-PROOF CORS CONFIG
app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server or curl calls with no origin
      if (!origin) return callback(null, true);
      // allow all your Vercel preview URLs and local dev
      if (
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost")
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ handle preflight OPTIONS requests explicitly
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
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// parse JSON body
app.use(express.json());

// simple root test route
app.get("/", (req, res) => {
  res.send("✅ Task Tracker Backend is running with working CORS!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
