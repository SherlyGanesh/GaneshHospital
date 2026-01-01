import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: 'Consultation' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
