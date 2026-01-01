import express from 'express';
import { Notification } from '../models/Notification.js';

const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a notification
router.post('/', async (req, res) => {
    const notification = new Notification(req.body);
    try {
        const newNotification = await notification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mark notification as read
router.patch('/:id/read', async (req, res) => {
    try {
        const updated = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Clear all notifications
router.delete('/', async (req, res) => {
    try {
        await Notification.deleteMany({});
        res.json({ message: 'All notifications cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
