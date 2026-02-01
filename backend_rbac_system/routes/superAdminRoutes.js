const express = require('express');
const router = express.Router();
const { getAllRequests, processRequest } = require('../controllers/superAdminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/requests', protect, authorize('SuperAdmin'), getAllRequests);
router.post('/process-request', protect, authorize('SuperAdmin'), processRequest);

module.exports = router;
