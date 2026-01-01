import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';

const NewAppointmentForm = ({ onClose, onSuccess, initialData }) => {
  const { patients, doctors, addAppointment, updateAppointment, deleteAppointment } = useHospital();
  const isEdit = !!initialData;

  const [formData, setFormData] = useState(initialData || {
    patientName: patients[0]?.name || '',
    doctorName: doctors[0]?.name || '',
    date: '',
    time: '',
    type: 'Consultation',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    
    // Check if date is in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      newErrors.date = 'Date cannot be in the past';
    }
    
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEdit) {
        await updateAppointment(initialData._id || initialData.id, formData);
        onSuccess?.("Appointment schedule updated");
      } else {
        const newAppointment = {
          ...formData,
          status: 'Pending',
        };
        await addAppointment(newAppointment);
        onSuccess?.("Appointment scheduled successfully");
      }
      onClose();
    } catch (err) {
      console.error("Appointment form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to cancel and remove this appointment?")) {
      await deleteAppointment(initialData._id || initialData.id);
      onSuccess?.("Appointment removed");
      onClose();
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Patient Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select Patient
        </label>
        <select
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {patients.map((patient) => (
            <option key={patient._id || patient.id} value={patient.name}>
              {patient.name} - {patient.age}y, {patient.bloodGroup}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select Doctor
        </label>
        <select
          name="doctorName"
          value={formData.doctorName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {doctors.map((doctor) => (
            <option key={doctor._id || doctor.id} value={doctor.name}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {doctors.find((d) => d.name === formData.doctorName)?.availability}
        </p>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
              errors.date ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Time *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
              errors.time ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>
      </div>

      {/* Appointment Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Appointment Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option>Consultation</option>
          <option>Follow-up</option>
          <option>Checkup</option>
          <option>Emergency</option>
        </select>
      </div>

      <div className="flex justify-between gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="flex gap-2">
            {isEdit && (
                <button
                    type="button"
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all italic"
                >
                    Delete
                </button>
            )}
        </div>
        <div className="flex gap-3">
            <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all italic"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary-500/30 italic ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'Scheduling...' : (isEdit ? 'Save Changes' : 'Save Details')}
            </button>
        </div>
      </div>
    </form>
  );
};

export default NewAppointmentForm;
