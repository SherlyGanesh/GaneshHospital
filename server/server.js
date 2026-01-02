import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('✅ Connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:');
        console.error('Reason:', err.message);
        console.error('TIP: If this is a ServerSelectionError, ensure your IP is whitelisted in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security-whitelist/');
    }
};

connectDB();

// Basic Routes
app.get('/', (req, res) => {
    res.send('Hospital Management System API is running...');
});

// Import Routes
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import hospitalDataRoutes from './routes/hospitalDataRoutes.js';

// Use Routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/emergencies', emergencyRoutes);
app.use('/api/hospital-data', hospitalDataRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err.stack);
    
    // Check for MongoDB connection errors
    if (err.name === 'MongooseServerSelectionError' || err.message.includes('buffering timed out')) {
        return res.status(503).json({
            message: 'Database Connection Error. Please ensure your IP is whitelisted in MongoDB Atlas.',
            error: err.message,
            tip: 'Go to Atlas -> Network Access -> Add IP Address'
        });
    }

    res.status(500).json({ 
        message: 'Something went wrong on the server!', 
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// Serve frontend in production or if build exists
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
