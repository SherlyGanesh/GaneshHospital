import express from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// Login (Simplified for now - matching frontend behavior)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && user.password === password) { // In a real app, use hashing!
            user.lastLogin = new Date();
            await user.save();
            res.json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password, role: role || 'User' });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Initial Users (Optional utility)
router.post('/seed', async (req, res) => {
    try {
        const initialUsers = [
            { name: 'Admin User', email: 'admin@hospital.com', password: 'password123', role: 'Admin', status: 'Active' },
            { name: 'Super Admin', email: 'admin@ganeshhospital.com', password: 'password123', role: 'Admin', status: 'Active' },
            { name: 'Dr. Smith', email: 'smith@hospital.com', password: 'password123', role: 'Doctor', status: 'Active', specialty: 'Family Medicine', block: 'A-1' },
            { name: 'John Patient', email: 'john@gmail.com', password: 'password123', role: 'User', status: 'Active' }
        ];
        await User.insertMany(initialUsers);
        res.json({ message: 'Users seeded successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all users (doctors for list, etc.)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve doctor
router.patch('/:id/approve', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { status: 'Active' }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
