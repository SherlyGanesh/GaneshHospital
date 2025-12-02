import { Users, Calendar, Activity, AlertCircle } from 'lucide-react';
import { stats, appointments, patients } from '../data/mockData';

const Dashboard = () => {
  const statCards = [
    {
      icon: Users,
      label: 'Total Patients',
      value: stats.totalPatients,
      color: 'from-primary-400 to-primary-600',
      bg: 'bg-primary-50 dark:bg-primary-900/20'
    },
    {
      icon: Calendar,
      label: "Today's Appointments",
      value: stats.todayAppointments,
      color: 'from-secondary-400 to-secondary-600',
      bg: 'bg-secondary-50 dark:bg-secondary-900/20'
    },
    {
      icon: Activity,
      label: 'Active Doctors',
      value: stats.activeDoctors,
      color: 'from-accent to-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: AlertCircle,
      label: 'Emergency Cases',
      value: stats.emergencyCases,
      color: 'from-red-400 to-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="card">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2">
          Welcome Back, Admin! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your hospital today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="card hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-7 h-7 text-white" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Upcoming Appointments
          </h2>
          <div className="space-y-3">
            {appointments.slice(0, 4).map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {appointment.patientName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.doctorName}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    appointment.status === 'Confirmed'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>📅 {appointment.date}</span>
                  <span>🕐 {appointment.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Recent Patients
          </h2>
          <div className="space-y-3">
            {patients.slice(0, 4).map((patient) => (
              <div
                key={patient.id}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {patient.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {patient.condition}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded-full text-xs font-semibold">
                    {patient.bloodGroup}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>👨‍⚕️ {patient.doctor}</span>
                  <span>📅 {patient.lastVisit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
