import { useState } from 'react';
import { User, Mail, Phone, MapPin, Heart, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const isDoctor = user?.role === 'Doctor';

  const [formData, setFormData] = useState({
    name: user?.name || 'Yasar',
    email: user?.email || 'yasar@example.com',
    phone: '9876543210',
    address: '123, Health Street, Mumbai, India',
    bloodGroup: 'O+',
    age: '25',
    emergencyContact: '9876543211',
    emergencyName: 'Father',
    // Doctor specific
    specialization: 'Senior Cardiologist',
    experience: '12 Years',
    degree: 'MBBS, MD',
    department: 'Cardiology'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="card max-w-4xl mx-auto border-l-4 border-l-primary-500">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent italic tracking-tighter uppercase">
              {isDoctor ? 'Clinician Profile' : 'Student/Patient Profile'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic font-bold">
                {isDoctor ? 'Manage your medical credentials and clinical identity.' : 'Manage your personal and emergency information.'}
            </p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              isEditing 
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20' 
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-xl shadow-primary-500/20'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Synchronize</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                <span>Modify Records</span>
              </>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 to-accent" />
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary-400 to-accent p-1 shadow-2xl group-hover:rotate-3 transition-transform">
                  <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <User className="w-16 h-16 text-gray-300" />
                  </div>
                </div>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Update</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 italic text-center leading-none mb-2">{formData.name}</h2>
              <p className="px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl text-[10px] font-black uppercase tracking-widest italic tracking-tighter">{isDoctor ? formData.specialization : user?.role}</p>
            </div>

            <div className={`p-8 rounded-3xl border ${isDoctor ? 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800' : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800'}`}>
              <h3 className={`font-black text-[10px] uppercase tracking-widest mb-6 flex items-center gap-2 ${isDoctor ? 'text-indigo-600' : 'text-red-600'}`}>
                {isDoctor ? <><Save className="w-4 h-4" /> Clinical Bio</> : <><Heart className="w-4 h-4" /> Emergency Protocol</>}
              </h3>
              <div className="space-y-4">
                {isDoctor ? (
                    <>
                        <div>
                            <label className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">Experience</label>
                            <p className="text-xl font-black text-gray-800 dark:text-gray-100 italic">{formData.experience}</p>
                        </div>
                        <div>
                            <label className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">Core Department</label>
                            <p className="text-lg font-bold text-gray-700 dark:text-gray-300 italic">{formData.department}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <label className="text-[10px] text-red-600 dark:text-red-400 uppercase font-black tracking-widest">Blood Type</label>
                            <p className="text-2xl font-black text-gray-800 dark:text-gray-100 italic">{formData.bloodGroup}</p>
                        </div>
                        <div>
                            <label className="text-[10px] text-red-600 dark:text-red-400 uppercase font-black tracking-widest">Registry Contact</label>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 italic">{formData.emergencyContact} ({formData.emergencyName})</p>
                        </div>
                    </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Clinical Index / Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

                {isDoctor && (
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Medical Degree & Credentials</label>
                        <input
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                    </div>
                )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Digital Mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Contact</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-none rounded-2xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Residential/Clinician Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-primary-500" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-none rounded-3xl text-sm italic focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
