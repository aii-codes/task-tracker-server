const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

// ✅ CORS should always be the first middleware
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Parse incoming JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Task Tracker Backend running with full CORS support.");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
