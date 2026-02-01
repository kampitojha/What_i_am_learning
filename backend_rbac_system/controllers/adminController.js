const User = require('../models/User');
const AdminRequest = require('../models/AdminRequest');

// View all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Request to delete a user (Goes to SuperAdmin)
exports.requestDeleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        // Validation check
        const targetUser = await User.findById(userId);
        if (!targetUser) return res.status(404).json({ message: 'User not found' });

        // Create Request
        const request = await AdminRequest.create({
            actionType: 'DELETE_USER',
            details: { userId: userId, username: targetUser.username },
            requestedBy: req.user._id
        });

        res.status(201).json({ message: 'Request submitted to SuperAdmin', requestId: request._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Request anything generic
exports.createGenericRequest = async (req, res) => {
    const { actionType, details } = req.body;
    try {
        const request = await AdminRequest.create({
            actionType,
            details,
            requestedBy: req.user._id
        });
        res.status(201).json({ message: 'Request submitted', requestId: request._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
