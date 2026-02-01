const Task = require('../models/Task');

// Get all tasks for logged in user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            createdBy: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task status (User can mark own task as completed)
exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(task.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({ message: "Not authorized" });
        }
        task.status = req.body.status || task.status;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
