import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, default: 'info' },
  read: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  recipientRole: { type: String, default: 'All' },
  recipientName: { type: String, default: null },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
