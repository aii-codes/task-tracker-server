const { createTask, getTasksByUser, updateTask, deleteTask } = require('../models/taskModel');
const jwt = require('jsonwebtoken');

// Helper to get user ID from token
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

// Create new task
const addTask = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { title, description, priority, due_date } = req.body;
  try {
    const task = await createTask(userId, title, description, priority, due_date);
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks for logged-in user
const getTasks = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const tasks = await getTasksByUser(userId);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
const editTask = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { id, title, description, priority, completed, due_date } = req.body;
  try {
    const updated = await updateTask(id, title, description, priority, completed, due_date);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
const removeTask = async (req, res) => {
  const userId = getUserIdFromToken(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.params;
  try {
    await deleteTask(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addTask, getTasks, editTask, removeTask };
