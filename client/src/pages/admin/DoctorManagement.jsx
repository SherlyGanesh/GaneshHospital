import { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { useToast } from '../../context/ToastContext';
import { 
    Search, Filter, CheckCircle, XCircle, Star, Briefcase, 
    MapPin, Activity, UserCheck, Layers, MoreVertical, 
    Edit2, Trash2, X, Check, UserPlus
} from 'lucide-react';

const DoctorManagement = () => {
    const { doctors, users, approveDoctor, deleteUser, addUser, updateUser } = useHospital();
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');

    const [showDocForm, setShowDocForm] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialty: '',
        experience: '',
        role: 'Doctor',
        status: 'Active'
    });

    const pendingDoctors = users.filter(u => (u.role === 'Doctor' || u.role === 'Administrator') && u.status === 'Pending');

    const handleApprove = (id) => {
        if(window.confirm('Approve this medical professional for active duty?')) {
            approveDoctor(id);
            addToast("Doctor approved and notified", "success");
        }
    };





    const handleReject = (id) => {
        if(window.confirm('Reject this application? The user will be removed.')) {
            deleteUser(id);
            addToast("Application rejected", "error");
        }
    };

    const handleOpenAddForm = () => {
        setFormData({
            name: '',
            email: '',
            specialty: '',
            experience: '',
            role: 'Doctor',
            status: 'Active'
        });
        setIsEditing(false);
        setShowDocForm(true);
    };

    const handleOpenEditForm = (doc) => {
        setSelectedDoc(doc);
        setFormData({
            name: doc.name,
            email: doc.email,
            specialty: doc.specialty || '',
            experience: doc.experience || '',
            role: doc.role,
            status: doc.status
        });
        setIsEditing(true);
        setShowDocForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isEditing) {
                await updateUser(selectedDoc._id || selectedDoc.id, formData);
                addToast("Doctor details updated", "success");
            } else {
                await addUser(formData);
            }
            setShowDocForm(false);
        } catch (err) {
            console.error("Form submission error:", err);
            // Error is already toasted in context, but we can add a specific one if needed
            if (!err.message) {
                addToast("Failed to save doctor details. Please try again.", "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete Dr. ${selectedDoc.name}?`)) {
            await deleteUser(selectedDoc._id || selectedDoc.id);
            addToast("Doctor deleted", "success");
            setShowDocForm(false);
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-primary-500 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Medical Staff Directory</h1>
                    <p className="text-sm text-gray-500 italic">Manage credentials, medical departments, and approvals.</p>
                </div>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={handleOpenAddForm}
                        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-primary-500/25 italic"
                    >
                        <UserPlus className="w-5 h-5" /> Add Doctor Details
                    </button>
                    <div className="text-right border-l-2 border-gray-100 dark:border-gray-700 pl-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Staff</p>
                        <p className="text-2xl font-black text-primary-500">{doctors.length}</p>
                    </div>
                </div>
            </div>

            {/* Pending Approvals Section */}
            {pendingDoctors.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                            <UserCheck className="w-5 h-5 shadow-inner shadow-gray-200" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">Pending Credentials Review</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingDoctors.map(doc => (
                            <div key={doc._id || doc.id} className="card border-2 border-orange-100 dark:border-orange-900/20 bg-orange-50/5 hover:border-orange-200 transition-all">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold text-lg">
                                        {doc.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100 italic">{doc.name}</h3>
                                        <p className="text-xs text-gray-500">{doc.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-400 font-bold italic">
                                    <p className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-orange-400" /> MD - Cardiology Intensive</p>
                                    <p className="flex items-center gap-2"><Star className="w-4 h-4 text-orange-400" /> Harvard Med Graduate</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleApprove(doc._id || doc.id)}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-green-500/20 italic"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Approve
                                    </button>
                                    <button 
                                        onClick={() => handleReject(doc._id || doc.id)}
                                        className="flex-1 bg-white dark:bg-gray-800 border border-red-100 dark:border-red-900/30 text-red-500 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-red-50 italic"
                                    >
                                        <XCircle className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Active Members Search */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">Active Medical Team</h2>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Find doctor by name or specialty..."
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-2xl shadow-sm text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doctors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(doc => (
                        <div key={doc._id || doc.id} className="card group hover:-translate-y-1 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-2xl flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                                        <Activity className="w-8 h-8" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-lg" />
                                </div>

                            </div>
                            
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 italic truncate">{doc.name}</h3>
                            <p className="text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-4">{doc.specialty}</p>

                            <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                                <div className="flex justify-between items-center text-[11px] font-bold italic">
                                    <span className="text-gray-400 uppercase">Experience</span>
                                    <span className="text-gray-700 dark:text-gray-300">{doc.experience}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold italic">
                                    <span className="text-gray-400 uppercase">Load</span>
                                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full">{doc.patients} Patients</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => handleOpenEditForm(doc)}
                                className="w-full mt-6 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold hover:bg-primary-500 hover:text-white transition-all italic"
                            >
                                Manage Profile
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Doctor Form Modal */}
            {showDocForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-8 bg-gradient-to-r from-primary-500 to-indigo-600 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black italic">{isEditing ? 'Edit Doctor Details' : 'Add New Doctor'}</h2>
                                <p className="text-xs opacity-80 uppercase tracking-widest mt-1 font-bold">Medical Staff Information System</p>
                            </div>
                            <button 
                                onClick={() => setShowDocForm(false)}
                                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Full Name</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
                                        placeholder="Dr. Sherly"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Email Address</label>
                                    <input 
                                        type="email"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
                                        placeholder="example@hospital.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Specialty</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
                                        placeholder="e.g. Cardiology"
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Experience</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
                                        placeholder="e.g. 10 Years"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex gap-3">
                                    {isEditing && (
                                        <button 
                                            type="button"
                                            onClick={handleDelete}
                                            className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-red-500/10 italic"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowDocForm(false)}
                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-2xl text-xs font-black uppercase tracking-widest transition-all italic"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary-500/30 italic ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <CheckCircle className="w-4 h-4" /> {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Save Details')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorManagement;
