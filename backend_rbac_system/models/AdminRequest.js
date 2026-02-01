const mongoose = require('mongoose');

const adminRequestSchema = new mongoose.Schema({
    actionType: { type: String, required: true }, // e.g., 'DELETE_USER', 'MODIFY_SETTINGS'
    details: { type: Object, required: true }, // Data related to the action
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // SuperAdmin who reviewed it
}, { timestamps: true });

module.exports = mongoose.model('AdminRequest', adminRequestSchema);
