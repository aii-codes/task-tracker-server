const { Pool } = require("pg");
require("dotenv").config();

let pool;

// 🧠 Use local DB when DATABASE_URL is not set (development)
if (process.env.DATABASE_URL) {
  // 🌐 Render / production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // required for Render hosted Postgres
    },
  });
  console.log("🟢 Using Render PostgreSQL connection");
} else {
  // 💻 Local development
  pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  console.log("🟢 Using local PostgreSQL connection");
}

pool
  .connect()
  .then(async () => {
    console.log("✅ Connected to PostgreSQL");
    await pool.query("SET TIMEZONE = 'UTC'"); // ✅ ensure consistent timezone
    console.log("🕒 Timezone set to UTC");
  })
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
