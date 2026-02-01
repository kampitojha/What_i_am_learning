const express = require('express');
const router = express.Router();
const { getUsers, requestDeleteUser, createGenericRequest } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/users', protect, authorize('Admin', 'SuperAdmin'), getUsers);

// Only Admins (and SuperAdmins if they want) can make requests.
// Though SuperAdmins can usually just DO IT. 
router.post('/request-delete-user', protect, authorize('Admin'), requestDeleteUser);
router.post('/request-action', protect, authorize('Admin'), createGenericRequest);

module.exports = router;
