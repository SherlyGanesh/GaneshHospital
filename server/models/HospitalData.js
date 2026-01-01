import mongoose from 'mongoose';

const hospitalDataSchema = new mongoose.Schema({
  bloodBank: [{
    bloodGroup: String,
    units: Number,
    status: String
  }],
  stats: {
    totalPatients: Number,
    todayAppointments: Number,
    activeDoctors: Number,
    emergencyCases: Number,
    totalRevenue: Number,
    pendingInvoices: Number
  },
  analytics: {
    appointmentsPerDay: [{ date: String, count: Number }],
    revenueMonthly: [{ month: String, amount: Number }],
    patientGrowth: [{ month: String, total: Number }],
    specialtyDistribution: [{ name: String, value: Number }]
  }
}, { timestamps: true });

export const HospitalData = mongoose.model('HospitalData', hospitalDataSchema);
