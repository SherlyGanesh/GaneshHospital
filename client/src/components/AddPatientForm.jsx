import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';

const AddPatientForm = ({ onClose, onSuccess, initialData }) => {
  const { doctors, addPatient, updatePatient, deleteUser, deletePatient, patients } = useHospital();
  const isEdit = !!initialData;
  
  const [formData, setFormData] = useState(initialData || {
    name: '',
    age: '',
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '',
    condition: '',
    doctor: doctors[0]?.name || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age || formData.age < 1 || formData.age > 120)
      newErrors.age = 'Valid age is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.condition.trim()) newErrors.condition = 'Condition is required';
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
        await updatePatient(initialData._id || initialData.id, {
          ...formData,
          age: parseInt(formData.age)
        });
        onSuccess?.("Patient updated successfully");
      } else {
        const selectedDoctorArg = doctors.find(d => d.name === formData.doctor);
        const assignedBlock = selectedDoctorArg ? selectedDoctorArg.block : 'Unassigned';

        const newPatient = {
          ...formData,
          age: parseInt(formData.age),
          lastVisit: new Date().toISOString().split('T')[0],
          status: 'Stable',
          assignedBlock: assignedBlock,
          doctor: formData.doctor
        };

        await addPatient(newPatient);
        onSuccess?.("Patient added successfully");
      }
      onClose();
    } catch (err) {
      console.error("Patient form error:", err);
      // addToast is handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete patient ${formData.name}?`)) {
      deletePatient(initialData._id || initialData.id);
      onSuccess?.("Patient record deleted");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Patient Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
            errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="Enter patient name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Age *
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
              errors.age ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Age"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Blood Group & Phone */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
              errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
            } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Medical Condition *
        </label>
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border ${
            errors.condition ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500`}
          placeholder="e.g., Regular Checkup, Diabetes"
        />
        {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
      </div>

      {/* Doctor */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Assigned Doctor
        </label>
        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {doctors.map((doc) => (
            <option key={doc._id || doc.id} value={doc.name}>
              {doc.name} - {doc.specialty}
            </option>
          ))}
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
                {isSubmitting ? 'Processing...' : (isEdit ? 'Save Changes' : 'Save Details')}
            </button>
        </div>
      </div>
    </form>
  );
};

export default AddPatientForm;
