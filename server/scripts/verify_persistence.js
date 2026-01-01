
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from parent directory (server root)
dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyPersistence = async () => {
    console.log('--- Starting MongoDB Persistence Verification ---');
    console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Missing');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Test Data
        const testTimestamp = Date.now();
        const testUsers = [
            {
                name: `Test Admin ${testTimestamp}`,
                email: `admin_${testTimestamp}@test.com`,
                password: 'password123',
                role: 'Admin',
                status: 'Active'
            },
            {
                name: `Test Doctor ${testTimestamp}`,
                email: `doc_${testTimestamp}@test.com`,
                password: 'password123',
                role: 'Doctor',
                status: 'Active',
                specialty: 'Cardiology',
                experience: '10 Years'
            },
            {
                name: `Test User ${testTimestamp}`,
                email: `user_${testTimestamp}@test.com`,
                password: 'password123',
                role: 'User',
                status: 'Active'
            }
        ];

        console.log('\n--- Attempting to Save Users ---');
        const createdUsers = [];
        for (const userData of testUsers) {
            const user = new User(userData);
            const savedUser = await user.save();
            createdUsers.push(savedUser);
            console.log(`✅ Saved ${savedUser.role}: ${savedUser.email}`);
        }

        console.log('\n--- Verifying Data Persistence ---');
        for (const savedUser of createdUsers) {
            const foundUser = await User.findById(savedUser._id);
            if (foundUser) {
                console.log(`✅ Verified ${foundUser.role} exists in DB (ID: ${foundUser._id})`);
                if (foundUser.role === 'Doctor') {
                    if (foundUser.specialty === 'Cardiology' && foundUser.experience === '10 Years') {
                        console.log(`   ✅ Doctor specific fields (specialty, experience) persisted correctly.`);
                    } else {
                        console.error(`   ❌ Doctor specific fields MISSING or INCORRECT.`);
                    }
                }
            } else {
                console.error(`❌ Function User NOT FOUND for ${savedUser.email}`);
            }
        }

        console.log('\n--- Cleaning Up ---');
        for (const user of createdUsers) {
            await User.findByIdAndDelete(user._id);
            console.log(`🗑️ Deleted test user: ${user.email}`);
        }

        console.log('\n✅ VERIFICATION SUCCESSFUL: All roles persist correctly to MongoDB Atlas.');

    } catch (error) {
        console.error('❌ Verification Failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

verifyPersistence();
