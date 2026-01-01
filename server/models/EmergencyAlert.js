import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  patient: { type: String, required: true },
  severity: { type: String, enum: ['Critical', 'High', 'Medium', 'Low'], default: 'High' },
  location: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Resolved'], default: 'Active' },
}, { timestamps: true });

export const EmergencyAlert = mongoose.model('EmergencyAlert', emergencyAlertSchema);
