import { createContext, useContext, useState, useEffect, useMemo } from 'react';
// Mock data imports removed
import { useToast } from './ToastContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://ganesh-hospital-backend.onrender.com/api');

const HospitalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};

export const HospitalProvider = ({ children }) => {
  const { addToast } = useToast();
  
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalReports, setMedicalReports] = useState([]);
  const [availability, setAvailability] = useState({});
  const [bloodBank, setBloodBank] = useState([]);
  const [stats, setStats] = useState({
      totalPatients: 0,
      todayAppointments: 0,
      activeDoctors: 0,
      emergencyCases: 0,
      totalRevenue: 0,
      pendingInvoices: 0
  });
  const [analytics, setAnalytics] = useState({
      appointmentsPerDay: [],
      revenueMonthly: [],
      patientGrowth: [],
      specialtyDistribution: []
  });

  const doctors = users.filter(u => u.role === 'Doctor');

  // Fetch initial data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, appointmentsRes, usersRes, notificationsRes, emergenciesRes, hDataRes] = await Promise.all([
          fetch(`${API_URL}/patients`),
          fetch(`${API_URL}/appointments`),
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/notifications`),
          fetch(`${API_URL}/emergencies`),
          fetch(`${API_URL}/hospital-data`)
        ]);

        if (patientsRes.ok) setPatients(await patientsRes.json());
        if (appointmentsRes.ok) setAppointments(await appointmentsRes.json());
        if (usersRes.ok) setUsers(await usersRes.json());
        if (notificationsRes.ok) setNotifications(await notificationsRes.json());
        if (emergenciesRes.ok) setEmergencyAlerts(await emergenciesRes.json());
        if (hDataRes.ok) {
            const hData = await hDataRes.json();
            setBloodBank(hData.bloodBank);
            setStats(hData.stats);
            setAnalytics(hData.analytics);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);


  // Actions
  const addNotification = async (msg, type = 'info', recipientRole = 'All', recipientName = null) => {
      const notification = {
          message: msg,
          type,
          read: false,
          timestamp: new Date().toISOString(),
          recipientRole,
          recipientName
      };

      try {
        const response = await fetch(`${API_URL}/notifications`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notification)
        });
        if (response.ok) {
          const newNotification = await response.json();
          setNotifications(prev => [newNotification, ...prev]);
          addToast(msg, type);
        }
      } catch (error) {
        console.error('Error adding notification:', error);
      }
  };

  const addUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, password: userData.password || 'password123' })
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers(prev => [...prev, newUser]);
        addToast(`User ${newUser.name} created successfully`, "success");
        return newUser;
      } else {
        const error = await response.json();
        addToast(error.message || "Failed to create user", "error");
        throw new Error(error.message || "Failed to create user");
      }
    } catch (error) {
      console.error('Error adding user:', error);
      if (!error.message.includes("Failed")) {
          addToast("Connection error while adding user", "error");
      }
      throw error;
    }
  };

  const addPatient = async (patient) => {
    try {
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
      });
      if (response.ok) {
        const newPatient = await response.json();
        setPatients(prev => [...prev, newPatient]);
        addNotification(`New patient ${patient.name} assigned to you.`, 'info', 'Doctor', patient.doctor);
        addNotification(`You have been assigned to Dr. ${patient.doctor}.`, 'info', 'Patient', patient.name);
      } else {
        const error = await response.json();
        addToast(error.message || "Failed to add patient", "error");
        throw new Error(error.message || "Failed to add patient");
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      if (!error.message?.includes("Failed")) {
          addToast("Connection error while adding patient", "error");
      }
      throw error;
    }
  };

  const updatePatient = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const updated = await response.json();
        setPatients(prev => prev.map(p => p._id === id || p.id === id ? updated : p));
      } else {
        const error = await response.json();
        addToast(error.message || "Failed to update patient", "error");
        throw new Error(error.message || "Failed to update patient");
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      if (!error.message?.includes("Failed")) {
          addToast("Connection error while updating patient", "error");
      }
      throw error;
    }
  };

  const deletePatient = async (id) => {
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPatients(prev => prev.filter(p => p._id !== id && p.id !== id));
        addToast("Patient record deleted", "info");
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const treatPatient = async (patientId, doctorName) => {
    await updatePatient(patientId, { isTreated: true, status: 'Treated' });
    const stats = getDoctorStats(doctorName);
    addNotification(`Treatment completed for patient by Dr. ${doctorName}${stats}`, 'success', 'Admin');
  };

  const addAppointment = async (appointment) => {
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...appointment, status: 'Pending' })
      });
      if (response.ok) {
        const newApt = await response.json();
        setAppointments(prev => [...prev, newApt]);
        addNotification(`New appointment request from ${appointment.patientName} with Dr. ${appointment.doctorName}`, 'info', 'Admin');
      } else {
        const error = await response.json();
        addToast(error.message || "Failed to schedule appointment", "error");
        throw new Error(error.message || "Failed to schedule appointment");
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      if (!error.message?.includes("Failed")) {
          addToast("Connection error while scheduling appointment", "error");
      }
      throw error;
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        const updated = await response.json();
        setAppointments(prev => prev.map(apt => apt._id === id || apt.id === id ? updated : apt));
        const apt = appointments.find(a => a._id === id || a.id === id);
        if (apt) {
            const stats = getDoctorStats(apt.doctorName);
            addNotification(`Appointment for ${apt.patientName} marked as ${status} by Dr. ${apt.doctorName}${stats}`, status === 'Confirmed' ? 'success' : 'warning', 'Admin');
            addNotification(`Your appointment with Dr. ${apt.doctorName} has been ${status}.`, status === 'Confirmed' ? 'success' : 'warning', 'Patient', apt.patientName);
        }
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const updateAppointment = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        const updated = await response.json();
        setAppointments(prev => prev.map(apt => apt._id === id || apt.id === id ? updated : apt));
        addToast("Appointment updated", "success");
      } else {
        throw new Error("Failed to update appointment");
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
       addToast("Failed to update appointment", "error");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAppointments(prev => prev.filter(apt => apt._id !== id && apt.id !== id));
        addToast("Appointment removed", "info");
      }
    } catch (error) {
       console.error('Error deleting appointment:', error);
       addToast("Failed to delete appointment", "error");
    }
  };

  const getDoctorStats = (doctorName) => {
    const matchesDoctor = (name) => name.toLowerCase().includes(doctorName.toLowerCase());
    const treatedPatients = patients.filter(p => matchesDoctor(p.doctor) && p.isTreated).length;
    const completedAppointments = appointments.filter(a => matchesDoctor(a.doctorName) && (a.status === 'Confirmed' || a.status === 'Completed')).length;
    const totalCompleted = treatedPatients + completedAppointments;
    const untreatedPatients = patients.filter(p => matchesDoctor(p.doctor) && !p.isTreated);
    const pendingAppointments = appointments.filter(a => matchesDoctor(a.doctorName) && a.status === 'Pending');
    const totalUnfinished = untreatedPatients.length + pendingAppointments.length;
    let currentWork = "None";
    if (pendingAppointments.length > 0) {
      currentWork = `Appointment with ${pendingAppointments[0].patientName}`;
    } else if (untreatedPatients.length > 0) {
      currentWork = `Patient ${untreatedPatients[0].name}`;
    }
    return `\nStats:\n- Completed Tasks: ${totalCompleted}\n- Remaining Work: ${totalUnfinished}\n- Current Focus: ${currentWork}`;
  };

  // New Doctor Actions
  const addPrescription = (prescription) => {
    setPrescriptions(prev => [...prev, { ...prescription, id: `${Date.now()}-${Math.random()}` }]);
    addToast("Prescription created successfully", "success");
    addNotification(`New prescription received from Dr. ${prescription.doctorName}`, 'success', 'Patient', prescription.patientName);
  };

  const updateAvailability = (doctorName, slots) => {
    setAvailability(prev => ({ ...prev, [doctorName]: slots }));
    addToast("Availability updated successfully", "success");
  };

  const uploadMedicalReport = (report) => {
    setMedicalReports(prev => [...prev, { ...report, id: `${Date.now()}-${Math.random()}` }]);
    addToast("Medical report uploaded", "success");
    addNotification(`New medical report uploaded by Dr. ${report.doctorName}`, 'info', 'Patient', report.patientName);
  };

  const markNotificationRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/notifications/${id}/read`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setNotifications(prev => prev.map(n => n._id === id || n.id === id ? { ...n, read: true } : n));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const value = useMemo(() => ({
    patients,
    addPatient,
    updatePatient,
    deletePatient,
    treatPatient,
    doctors,
    appointments,
    notifications,
    addAppointment,
    addAppointment,
    updateAppointmentStatus,
    updateAppointment,
    deleteAppointment,
    addNotification,
    markNotificationRead,
    clearNotifications,
    prescriptions,
    addPrescription,
    medicalReports,
    uploadMedicalReport,
    availability,
    updateAvailability,
    bloodBank,
    stats,
    analytics,
    users,
    addUser,
    emergencyAlerts,
    updateUser: async (id, updates) => {
        try {
          const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
          });
          if (response.ok) {
            const updated = await response.json();
            setUsers(prev => prev.map(u => u._id === id || u.id === id ? updated : u));
            addToast("User updated successfully", "success");
          } else {
            const error = await response.json();
            addToast(error.message || "Failed to update user", "error");
            throw new Error(error.message || "Failed to update user");
          }
        } catch (error) {
          console.error('Error updating user:', error);
          if (!error.message.includes("Failed")) {
              addToast("Connection error while updating user", "error");
          }
          throw error;
        }
    },
    deleteUser: async (id) => {
        try {
          const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            setUsers(prev => prev.filter(u => u._id !== id && u.id !== id));
            addToast("User deleted successfully", "info");
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
    },
    approveDoctor: async (id) => {
        try {
          const response = await fetch(`${API_URL}/users/${id}/approve`, {
            method: 'PATCH'
          });
          if (response.ok) {
            const updated = await response.json();
            setUsers(prev => prev.map(u => u._id === id || u.id === id ? updated : u));
            addToast("Doctor approved successfully", "success");
            addNotification(`Doctor account for Dr. ${updated.name} has been approved.`, 'success', 'Admin');
          }
        } catch (error) {
          console.error('Error approving doctor:', error);
        }
    },
    resolveEmergency: async (id) => {
        try {
          const response = await fetch(`${API_URL}/emergencies/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            setEmergencyAlerts(prev => prev.filter(e => e._id !== id && e.id !== id));
            addToast("Emergency case marked as resolved", "success");
          }
        } catch (error) {
          console.error('Error resolving emergency:', error);
        }
    }
  }), [patients, doctors, appointments, notifications, prescriptions, medicalReports, availability, bloodBank, stats, analytics, users, emergencyAlerts, addToast]);

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};
