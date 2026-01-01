// Helper to generate doctors
const generateDoctors = () => {
  const departments = [
    'Family Medicine', 'Pediatrics', 
    'Cardiology', 'Neurology', 'Oncology', 
    'General Surgery', 'Orthopedic Surgery', 'Cardio-Thoracic Surgery',
    'Dermatology', 'Gastroenterology', 'Gynecology', 'Radiology', 
    'Psychiatry', 'Emergency Medicine',
    'Hematology', 'Endocrinology', 'Nephrology', 'Pulmonology'
  ];

  const doctorsList = [];
  let idCounter = 1;

  departments.forEach((dept, index) => {
    // Generate 9 doctors per department
    for (let i = 1; i <= 9; i++) {
        const block = String.fromCharCode(65 + (index % 5)) + '-' + (Math.floor(index / 5) + 1); // Blocks A-1, B-1, etc.
        doctorsList.push({
            id: idCounter++,
            name: `Dr. ${getDoctorName(dept, i)}`,
            specialty: dept,
            block: block,
            experience: `${Math.floor(Math.random() * 20) + 3} years`,
            availability: 'Mon-Fri, 9AM-5PM',
            patients: Math.floor(Math.random() * 50) + 10,
            rating: (4 + Math.random()).toFixed(1)
        });
    }
  });

  return doctorsList;
};

const getDoctorName = (dept, i) => {
    const names = ['Gayathri','Sawmiya', 'Chitra', 'Rathika', 'Lakshmi', 'Sherin', 'praisikah', 'Youngeshwari', 'Amulya', 'Kanaga', 'Wanathi', 'Sruthi', 'Tamil', 'Nithya', 'Harsha', 'Farhana', 'Geevitha', 'Anitha', 'renuga', 'Benasir', 'Hamalatha', 'kaviya', 'priya', 'jaya lakshmi', 'muthu lakshmi', 'sherin'];
    return `${names[(names.length + i + dept.length) % names.length]} (${dept.split(' ')[0]})`; 
};

export const doctors = generateDoctors();

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
    doctor: 'Dr. Smith (Family)',
    assignedBlock: 'A-1',
    isTreated: false
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
    doctor: 'Dr. Brown (Endocrinology)',
    assignedBlock: 'C-2',
    isTreated: false
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
    doctor: 'Dr. Jones (Cardiology)',
    assignedBlock: 'A-2',
    isTreated: false
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
    doctor: 'Dr. Garcia (Gynecology)',
    assignedBlock: 'B-2',
    isTreated: false
  }
];

export const appointments = [
  {
    id: 1,
    patientName: 'Priya Sharma',
    doctorName: 'Dr. Smith (Family)',
    date: '2025-12-03',
    time: '10:00 AM',
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 2,
    patientName: 'Sneha Patel',
    doctorName: 'Dr. Brown (Endocrinology)',
    date: '2025-12-03',
    time: '11:30 AM',
    type: 'Consultation',
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
  activeDoctors: doctors.length,
  emergencyCases: 3,
  totalRevenue: 45200,
  pendingInvoices: 18
};

export const analyticsData = {
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
};

export const users = [
    { id: 1, name: 'Admin User', email: 'admin@hospital.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Dr. Smith', email: 'smith@hospital.com', role: 'Doctor', status: 'Active' },
    { id: 3, name: 'John Patient', email: 'john@gmail.com', role: 'User', status: 'Active' },
    { id: 4, name: 'Jane Staff', email: 'jane@hospital.com', role: 'Staff', status: 'Active' },
    { id: 5, name: 'Dr. Pending', email: 'pending@hospital.com', role: 'Doctor', status: 'Pending' },
];

export const emergencyAlerts = [
    { id: 1, type: 'Ambulance', patient: 'Anonymous', location: 'City Center', time: '10 mins ago', severity: 'Critical' },
    { id: 2, type: 'Emergency ER', patient: 'Robert Gill', location: 'ER Ground Floor', time: '25 mins ago', severity: 'High' },
    { id: 3, type: 'Accident', patient: 'Unknown', location: 'NH-44 Highway', time: '1 hour ago', severity: 'Medium' },
];
