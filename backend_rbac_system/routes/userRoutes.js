const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTaskStatus } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All User routes need protection and 'User' or higher role
// Typically Users access this, but maybe Admins too? 
// For strict RBAC where Users just do work:
router.get('/tasks', protect, authorize('User', 'Admin', 'SuperAdmin'), getTasks);
router.post('/tasks', protect, authorize('User', 'Admin', 'SuperAdmin'), createTask);
router.put('/tasks/:id', protect, authorize('User', 'Admin', 'SuperAdmin'), updateTaskStatus);

module.exports = router;
