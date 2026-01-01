import express from 'express';
import { HospitalData } from '../models/HospitalData.js';

const router = express.Router();

// Get hospital data (blood bank, stats, analytics)
router.get('/', async (req, res) => {
    try {
        let data = await HospitalData.findOne();
        if (!data) {
            // Seed default if not found
            data = new HospitalData({
                bloodBank: [
                    { bloodGroup: 'A+', units: 45, status: 'Available' },
                    { bloodGroup: 'A-', units: 12, status: 'Low' },
                    { bloodGroup: 'B+', units: 38, status: 'Available' },
                    { bloodGroup: 'B-', units: 8, status: 'Critical' },
                    { bloodGroup: 'O+', units: 52, status: 'Available' },
                    { bloodGroup: 'O-', units: 15, status: 'Low' },
                    { bloodGroup: 'AB+', units: 22, status: 'Available' },
                    { bloodGroup: 'AB-', units: 6, status: 'Critical' }
                ],
                stats: {
                    totalPatients: 248,
                    todayAppointments: 12,
                    activeDoctors: 50,
                    emergencyCases: 3,
                    totalRevenue: 45200,
                    pendingInvoices: 18
                },
                analytics: {
                    appointmentsPerDay: [
                        { date: '2025-12-01', count: 8 },
                        { date: '2025-12-02', count: 15 },
                        { date: '2025-12-03', count: 12 },
                        { date: '2025-12-04', count: 18 },
                        { date: '2025-12-05', count: 22 },
                        { date: '2025-12-06', count: 10 },
                        { date: '2025-12-07', count: 7 },
                    ],
                    revenueMonthly: [
                        { month: 'Jul', amount: 32000 },
                        { month: 'Aug', amount: 35000 },
                        { month: 'Sep', amount: 28000 },
                        { month: 'Oct', amount: 42000 },
                        { month: 'Nov', amount: 38000 },
                        { month: 'Dec', amount: 45000 },
                    ],
                    patientGrowth: [
                        { month: 'Jul', total: 180 },
                        { month: 'Aug', total: 195 },
                        { month: 'Sep', total: 210 },
                        { month: 'Oct', total: 230 },
                        { month: 'Nov', total: 240 },
                        { month: 'Dec', total: 248 },
                    ],
                    specialtyDistribution: [
                        { name: 'Cardiology', value: 35 },
                        { name: 'Pediatrics', value: 25 },
                        { name: 'Surgery', value: 20 },
                        { name: 'General', value: 40 },
                        { name: 'Neurology', value: 15 },
                    ]
                }
            });
            await data.save();
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
