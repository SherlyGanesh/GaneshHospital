import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    phone: { type: String },
    lastVisit: { type: String },
    condition: { type: String },
    status: { type: String, default: 'Stable' },
    doctor: { type: String },
    assignedBlock: { type: String },
    isTreated: { type: Boolean, default: false }
}, { timestamps: true });

export const Patient = mongoose.model('Patient', patientSchema);
