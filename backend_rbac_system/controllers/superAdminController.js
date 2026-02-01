const AdminRequest = require('../models/AdminRequest');
const User = require('../models/User');

// Get all pending requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await AdminRequest.find({ status: 'Pending' })
            .populate('requestedBy', 'username email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Process a request (Approve/Reject)
exports.processRequest = async (req, res) => {
    const { requestId, decision } = req.body; // decision: 'Approved' or 'Rejected'

    try {
        const request = await AdminRequest.findById(requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        if (request.status !== 'Pending') {
            return res.status(400).json({ message: 'Request already processed' });
        }

        if (decision === 'Rejected') {
            request.status = 'Rejected';
            request.reviewedBy = req.user._id;
            await request.save();
            return res.json({ message: 'Request Rejected' });
        }

        if (decision === 'Approved') {
            // EXECUTE THE LOGIC HERE based on actionType
            if (request.actionType === 'DELETE_USER') {
                const userIdToDelete = request.details.userId;
                await User.findByIdAndDelete(userIdToDelete);
                // Can verify deletion success here
            }
            
            // Add more action handlers here...

            request.status = 'Approved';
            request.reviewedBy = req.user._id;
            await request.save();
            return res.json({ message: 'Request Approved and Action Executed' });
        }

        res.status(400).json({ message: 'Invalid decision' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// SuperAdmin can also do direct actions if we wanted, 
// using the same logic function but calling it directly.
