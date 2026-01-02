import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Doctor', 'User', 'Staff'], default: 'User' },
    status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Active' },
    specialty: { type: String },
    experience: { type: String },
    block: { type: String },
    lastLogin: { type: Date }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
