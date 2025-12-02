export const patients = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    lastVisit: '2025-11-28',
    condition: 'Regular Checkup',
    status: 'Stable',
    doctor: 'Dr. Anjali Mehta'
  },
  {
    id: 2,
    name: 'Sneha Patel',
    age: 35,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+91 98765 43211',
    lastVisit: '2025-11-30',
    condition: 'Diabetes Management',
    status: 'Under Treatment',
    doctor: 'Dr. Rajesh Kumar'
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    age: 42,
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+91 98765 43212',
    lastVisit: '2025-12-01',
    condition: 'Hypertension',
    status: 'Stable',
    doctor: 'Dr. Anjali Mehta'
  },
  {
    id: 4,
    name: 'Kavya Iyer',
    age: 31,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '+91 98765 43213',
    lastVisit: '2025-11-25',
    condition: 'Pregnancy Care',
    status: 'Monitoring',
    doctor: 'Dr. Priya Nair'
  }
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Anjali Mehta',
    specialty: 'General Physician',
    experience: '12 years',
    availability: 'Mon-Fri, 9AM-5PM',
    patients: 45,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Endocrinologist',
    experience: '15 years',
    availability: 'Mon-Sat, 10AM-6PM',
    patients: 38,
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    specialty: 'Gynecologist',
    experience: '10 years',
    availability: 'Tue-Sat, 9AM-4PM',
    patients: 52,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Dr. Vikram Singh',
    specialty: 'Cardiologist',
    experience: '18 years',
    availability: 'Mon-Fri, 11AM-7PM',
    patients: 41,
    rating: 4.9
  }
];

export const appointments = [
  {
    id: 1,
    patientName: 'Priya Sharma',
    doctorName: 'Dr. Anjali Mehta',
    date: '2025-12-03',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 2,
    patientName: 'Sneha Patel',
    doctorName: 'Dr. Rajesh Kumar',
    date: '2025-12-03',
    time: '11:30 AM',
    type: 'Consultation',
    status: 'Confirmed'
  },
  {
    id: 3,
    patientName: 'Kavya Iyer',
    doctorName: 'Dr. Priya Nair',
    date: '2025-12-04',
    time: '2:00 PM',
    type: 'Checkup',
    status: 'Pending'
  },
  {
    id: 4,
    patientName: 'Ananya Reddy',
    doctorName: 'Dr. Anjali Mehta',
    date: '2025-12-05',
    time: '9:30 AM',
    type: 'Follow-up',
    status: 'Confirmed'
  }
];

export const bloodBank = [
  { bloodGroup: 'A+', units: 45, status: 'Available' },
  { bloodGroup: 'A-', units: 12, status: 'Low' },
  { bloodGroup: 'B+', units: 38, status: 'Available' },
  { bloodGroup: 'B-', units: 8, status: 'Critical' },
  { bloodGroup: 'O+', units: 52, status: 'Available' },
  { bloodGroup: 'O-', units: 15, status: 'Low' },
  { bloodGroup: 'AB+', units: 22, status: 'Available' },
  { bloodGroup: 'AB-', units: 6, status: 'Critical' }
];

export const stats = {
  totalPatients: 248,
  todayAppointments: 12,
  activeDoctors: 8,
  emergencyCases: 3
};
