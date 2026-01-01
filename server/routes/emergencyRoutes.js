import express from 'express';
import { EmergencyAlert } from '../models/EmergencyAlert.js';

const router = express.Router();

// Get all active emergency alerts
router.get('/', async (req, res) => {
    try {
        const alerts = await EmergencyAlert.find({ status: 'Active' }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add an emergency alert
router.post('/', async (req, res) => {
    const alert = new EmergencyAlert(req.body);
    try {
        const newAlert = await alert.save();
        res.status(201).json(newAlert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Resolve an emergency alert
router.delete('/:id', async (req, res) => {
    try {
        await EmergencyAlert.findByIdAndUpdate(req.params.id, { status: 'Resolved' });
        res.json({ message: 'Emergency alert resolved' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
