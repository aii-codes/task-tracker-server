const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

console.log('✅ authRoutes loaded:', authRoutes);

const app = express();
app.use(cors());
app.use(express.json()); // lets backend read JSON data

app.get('/', (req, res) => {
  res.send('✅ Task Tracker Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
