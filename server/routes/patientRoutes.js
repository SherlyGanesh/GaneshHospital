import express from 'express';
import { Patient } from '../models/Patient.js';

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a patient
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a patient
router.patch('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
