const express = require('express');
const router = express.Router();
const { addTask, getTasks, editTask, removeTask } = require('../controllers/taskController');

// CRUD routes
router.post('/', addTask);         // Create
router.get('/', getTasks);         // Read
router.put('/:id', editTask);      // ✅ Update (fix here)
router.delete('/:id', removeTask); // Delete

module.exports = router;
