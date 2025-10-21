const pool = require('../db');

// Create a task
const createTask = async (userId, title, description, priority, dueDate) => {
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description, priority, due_date)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, title, description, priority, dueDate]
  );
  return result.rows[0];
};

// Get all tasks for a user
const getTasksByUser = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};

// Update a task
const updateTask = async (taskId, title, description, priority, completed, dueDate) => {
  const result = await pool.query(
    `UPDATE tasks 
     SET title = $1, description = $2, priority = $3, completed = $4, due_date = $5
     WHERE id = $6 RETURNING *`,
    [title, description, priority, completed, dueDate, taskId]
  );
  return result.rows[0];
};

// Delete a task
const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
};

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };
