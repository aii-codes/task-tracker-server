const pool = require('../db');

// Create a task
const createTask = async (userId, title, description, priority, dueDate) => {
  // ✅ FIX: Cast the date to DATE type and format the returned date
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description, priority, due_date)
     VALUES ($1, $2, $3, $4, $5::date) 
     RETURNING id, user_id, title, description, priority, completed, status,
               TO_CHAR(due_date, 'YYYY-MM-DD') as due_date,
               created_at`,
    [userId, title, description, priority, dueDate]
  );
  return result.rows[0];
};

// Get all tasks for a user
const getTasksByUser = async (userId) => {
  // ✅ FIX: Convert due_date to simple date string format
  const result = await pool.query(
    `SELECT id, user_id, title, description, priority, completed, status,
            TO_CHAR(due_date, 'YYYY-MM-DD') as due_date,
            created_at
     FROM tasks 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

// Update a task
const updateTask = async (taskId, title, description, priority, completed, dueDate, status) => {
  // ✅ FIX: Cast the date to DATE type to avoid timezone conversion
  const result = await pool.query(
    `UPDATE tasks 
     SET title = $1, description = $2, priority = $3, completed = $4, due_date = $5::date, status = $6
     WHERE id = $7 
     RETURNING id, user_id, title, description, priority, completed, status,
               TO_CHAR(due_date, 'YYYY-MM-DD') as due_date,
               created_at`,
    [title, description, priority, completed, dueDate, status, taskId]
  );
  return result.rows[0];
};

// Delete a task
const deleteTask = async (taskId) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
};

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };