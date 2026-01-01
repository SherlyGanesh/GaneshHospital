import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, UserPlus, Video } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Modal from '../components/Modal';
import AddPatientForm from '../components/AddPatientForm';

const Patients = () => {
  const { patients, appointments, treatPatient } = useHospital();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const isDoctor = user?.role === 'Doctor';

  const filteredPatients = patients.filter(patient => {
    // Role based filtering
    if (isDoctor) {
         // Show patient if strictly assigned OR has an appointment with this doctor
         const hasAppointment = appointments.some(apt => 
            (apt.patientName.toLowerCase() === patient.name.toLowerCase()) && 
            (apt.doctorName.toLowerCase().includes(user?.name?.toLowerCase() || '')) &&
            (apt.status !== 'Cancelled')
         );
         
         const isAssigned = patient.doctor.toLowerCase().includes(user?.name?.toLowerCase() || '');
         
         if (!isAssigned && !hasAppointment) return false;
    }

    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2 italic">
              {isDoctor ? 'Clinical Patient Registry' : 'Patient Management'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              {isDoctor ? 'Access patient medical records and manage ongoing treatments.' : 'Manage and monitor all hospital patient records.'}
            </p>
          </div>
          {!isDoctor && (
           <button 
            onClick={() => {
                setSelectedPatient(null);
                setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-primary-500/25 italic"
          >
            <UserPlus className="w-5 h-5" /> Add Patient Details
          </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 italic text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 italic text-sm outline-none"
            >
              <option>All Statuses</option>
              <option>Stable</option>
              <option>Under Treatment</option>
              <option>Monitoring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredPatients.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
                No patient records found matching your criteria.
            </div>
        ) : (
            filteredPatients.map((patient) => (
            <div
                key={patient._id || patient.id}
                className="card hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-500 group"
            >
                <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                    <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-accent rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/20 group-hover:rotate-6 transition-transform">
                            {patient.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                            patient.status === 'Stable' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                    </div>
                    <div className="ml-4">
                    <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 italic">
                        {patient.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                        {patient.age}Y • {patient.gender} • {patient.bloodGroup}
                    </p>
                    </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                    patient.status === 'Stable'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30'
                    : patient.status === 'Under Treatment'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                }`}>
                    {patient.status}
                </span>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Diagnosis</p>
                            <p className="text-sm font-black text-gray-800 dark:text-gray-200 italic">{patient.condition}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ward/Block</p>
                            <p className="text-sm font-black text-primary-500 italic">Block {patient.assignedBlock || 'General'}</p>
                        </div>
                    </div>
                    
                    {isDoctor && (
                        <div className="space-y-3 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                            <div className="flex justify-between items-center text-[10px] font-black text-primary-600 uppercase">
                                <span>Clinical History</span>
                                <span className="opacity-50">Last Update: {patient.lastVisit}</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs italic text-gray-600 dark:text-gray-400 border border-primary-100/50">No known allergies</span>
                                <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-xs italic text-gray-600 dark:text-gray-400 border border-primary-100/50">Post-Op Recovery</span>
                            </div>
                        </div>
                    )}

                {/* Action Buttons */}
                <div className="pt-4 mt-2 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-700/50">
                    <button 
                        onClick={() => {
                            setSelectedPatient(patient);
                            setIsModalOpen(true);
                        }}
                        className="px-4 py-2 text-gray-500 hover:text-primary-500 font-bold text-[10px] uppercase tracking-widest transition-colors"
                    >
                        Edit Records
                    </button>
                    {isDoctor && (
                        <>
                            <button 
                                onClick={() => addToast(`Opening Prescription Module for ${patient.name}`, "info")}
                                className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all"
                            >
                                Prescribe
                            </button>
                            {!patient.isTreated ? (
                                <button
                                onClick={() => {
                                    if(window.confirm(`Finalize treatment for ${patient.name}?`)) {
                                    treatPatient(patient._id || patient.id, user.name);
                                    }
                                }}
                                className="px-4 py-2 bg-primary-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary-600 shadow-lg shadow-primary-500/20"
                                >
                                Complete Case
                                </button>
                            ) : (
                                <span className="px-4 py-2 text-green-600 font-black text-[10px] uppercase italic">Discharged</span>
                            )}
                        </>
                    )}
                </div>
                </div>
            </div>
            ))
        )}
      </div>

      {/* Add Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Patient"
      >
        <AddPatientForm
          onClose={() => setIsModalOpen(false)}
          initialData={selectedPatient}
          onSuccess={(msg) => addToast(msg || "Action successful", "success")}
        />
      </Modal>
    </div>
  );
};

export default Patients;
