import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { Calendar as CalendarIcon, Clock, Plus, Check, X, Filter, Video, Trash2, Edit } from 'lucide-react';
import Modal from '../components/Modal';
import NewAppointmentForm from '../components/NewAppointmentForm';
import { useToast } from '../context/ToastContext';

const Appointments = () => {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useHospital();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filter, setFilter] = useState('Upcoming'); // Upcoming, History
  const [viewType, setViewType] = useState('Daily'); // Daily, Weekly
  const isDoctor = user?.role === 'Doctor';
  const isAdmin = user?.role === 'Admin' || user?.role === 'SuperAdmin';

  const filteredAppointments = appointments.filter(apt => {
    // Filter for Patients
    if (user?.role === 'User' && apt.patientId !== user?._id && apt.patientId !== user?.id && apt.patientName !== user?.name) {
        return false;
    }

    // Filter for Doctors
    if (isDoctor && !apt.doctorName.toLowerCase().includes(user?.name?.toLowerCase() || '')) {
        return false;
    }

    if (filter === 'Upcoming') {
       return apt.status === 'Pending' || apt.status === 'Confirmed';
    } else {
       // History
       return apt.status === 'Completed' || apt.status === 'Cancelled';
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2 italic">
              {isDoctor ? 'My Clinical Schedule' : 'Appointments'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              {isDoctor ? 'Manage your daily patient queue and consultations.' : 'Schedule and manage patient appointments'}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {isDoctor && (
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
                    <button 
                        onClick={() => setViewType('Daily')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                            viewType === 'Daily' 
                            ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                        }`}
                    >
                        Daily
                    </button>
                    <button 
                        onClick={() => setViewType('Weekly')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                            viewType === 'Weekly' 
                            ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                        }`}
                    >
                        Weekly
                    </button>
                </div>
            )}
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
                <button 
                  onClick={() => setFilter('Upcoming')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filter === 'Upcoming' 
                    ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  Upcoming
                </button>
                <button 
                  onClick={() => setFilter('History')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filter === 'History' 
                    ? 'bg-white dark:bg-gray-600 text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  History
                </button>
            </div>
            {user?.role !== 'Doctor' && (
                <button 
                    onClick={() => {
                        setSelectedAppointment(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-primary-500/25 italic"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden md:inline">Schedule Appointment</span>
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredAppointments.length === 0 ? (
           <div className="col-span-full text-center py-12 text-gray-500 italic">
             <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
             <p>No {filter.toLowerCase()} appointments found.</p>
           </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
                key={appointment._id || appointment.id}
                className="card hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-500 group"
            >
                <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 italic">
                    {appointment.patientName}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                    <span className="text-primary-500 font-bold uppercase tracking-wider mr-2">{isDoctor ? 'Assigned Record' : `Dr. ${appointment.doctorName}`}</span>
                    • {appointment.status}
                    </p>
                </div>
                {isDoctor ? (
                    <div className="flex gap-2">
                        {appointment.status !== 'Confirmed' && appointment.status !== 'Completed' && (
                        <button
                            onClick={() => updateAppointmentStatus(appointment._id || appointment.id, 'Confirmed')}
                            className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors shadow-sm"
                            title="Confirm Appointment"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        )}
                        {appointment.status !== 'Completed' && (
                        <button
                            onClick={() => updateAppointmentStatus(appointment._id || appointment.id, 'Completed')}
                            className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors shadow-sm"
                            title="Complete Appointment"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        )}
                        {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                        <button
                            onClick={() => updateAppointmentStatus(appointment._id || appointment.id, 'Cancelled')}
                            className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors shadow-sm"
                            title="Cancel Appointment"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        )}
                    </div>
                ) : (
                    <span className={`px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest ${
                    appointment.status === 'Confirmed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : appointment.status === 'Cancelled'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    <span className={`w-2 h-2 rounded-full ${
                         appointment.status === 'Confirmed' ? 'bg-green-500' :
                         appointment.status === 'Cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                    {appointment.status}
                    </span>
                )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <CalendarIcon className="w-5 h-5 text-primary-500" />
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Consultation Date</p>
                            <p className="text-sm font-black text-gray-800 dark:text-gray-200 italic">{appointment.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <Clock className="w-5 h-5 text-secondary-500" />
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Session Time</p>
                            <p className="text-sm font-black text-gray-800 dark:text-gray-200 italic">{appointment.time}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {appointment.type}
                    </span>
                    {isDoctor && (
                        <div className="flex gap-2">
                             <button 
                                onClick={() => {
                                    addToast('Starting Video Call...', 'success');
                                    window.open('https://meet.google.com/new', '_blank');
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-blue-600 shadow-md shadow-blue-500/20"
                            >
                                <Video className="w-3 h-3" /> Video Call
                            </button>
                            <button 
                                onClick={() => {
                                    const note = window.prompt('Add clinical notes for ' + appointment.patientName);
                                    if(note) addToast(`Note added: ${note}`, "success");
                                }}
                                className="px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-[10px] font-bold uppercase transition-all hover:shadow-lg"
                            >
                                Add Notes
                            </button>
                        </div>
                    )}
                    {isAdmin && (
                         <div className="flex gap-2">
                             <button 
                                onClick={() => {
                                    // Reuse form for edit; prefill logic is handled by passing initialData
                                    setSelectedAppointment(appointment); 
                                    setIsModalOpen(true); 
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-blue-200"
                            >
                                <Edit className="w-3 h-3" /> Edit
                            </button>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to delete this appointment?')) {
                                        deleteAppointment(appointment._id || appointment.id);
                                    }
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-red-200"
                            >
                                <Trash2 className="w-3 h-3" /> Delete
                            </button>
                         </div>
                    )}
                </div>
            </div>
          ))
        )}
      </div>

      {/* New Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule New Appointment"
      >
        <NewAppointmentForm
          onClose={() => setIsModalOpen(false)}
          initialData={selectedAppointment}
          onSuccess={(msg) => addToast(msg || "Action successful", "success")}
        />
      </Modal>
    </div>
  );
};

export default Appointments;
