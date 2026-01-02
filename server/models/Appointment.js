import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: 'Consultation' },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' }
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
