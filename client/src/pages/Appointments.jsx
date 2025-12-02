import { useState } from 'react';
import { appointments } from '../data/mockData';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';
import Modal from '../components/Modal';
import NewAppointmentForm from '../components/NewAppointmentForm';

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2">
              Appointments
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Schedule and manage patient appointments
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="card hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {appointment.patientName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {appointment.doctorName}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                appointment.status === 'Confirmed'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {appointment.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {appointment.time}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-semibold">
                  {appointment.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New Appointment"
      >
        <NewAppointmentForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setRefreshKey((prev) => prev + 1);
            alert('Appointment scheduled successfully!');
          }}
        />
      </Modal>
    </div>
  );
};

export default Appointments;
