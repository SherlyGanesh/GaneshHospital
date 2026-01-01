import { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Search, Filter, Plus, Edit2, Trash2, Key, ShieldCheck, ShieldAlert, MoreVertical } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const UserManagement = () => {
    const { users, updateUser, deleteUser, addNotification, addUser } = useHospital();
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User', status: 'Active' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAction = (user, action) => {
        if (action === 'delete') {
            if (window.confirm('Are you sure you want to delete this user?')) {
                deleteUser(user._id || user.id);
                addToast("User deleted successfully", "success");
            }
        } else if (action === 'block') {
            updateUser(user._id || user.id, { status: 'Blocked' });
            addNotification(`User account blocked.`, 'warning', 'Admin');
        } else if (action === 'activate') {
            updateUser(user._id || user.id, { status: 'Active' });
            addNotification(`User account activated.`, 'success', 'Admin');
        } else if (action === 'edit') {
            setSelectedUser(user);
            setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
            setShowModal(true);
        } else if (action === 'reset') {
            addToast(`Password reset link sent to ${user.email}`, "info");
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setFormData({ name: '', email: '', role: 'User', status: 'Active' });
        setShowModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (selectedUser) {
                await updateUser(selectedUser._id || selectedUser.id, formData);
                addToast("User details updated", "success");
            } else {
                await addUser(formData);
            }
            setShowModal(false);
        } catch (err) {
            console.error("User form error:", err);
            if (!err.message) {
                addToast("Failed to process user request", "error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">User Management</h1>
                    <p className="text-sm text-gray-500">Manage system users, permissions, and security.</p>
                </div>
                <button 
                    onClick={handleAddUser}
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-primary-500/25 italic"
                >
                    <Plus className="w-5 h-5" /> Add User Details
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-12 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <select 
                            className="pl-9 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-xl shadow-sm outline-none text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="All">All Roles</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="User">Patient</option>
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id || user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-gray-100">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        user.role === 'Admin' ? 'border-purple-200 text-purple-600 bg-purple-50' : 
                                        user.role === 'Doctor' ? 'border-blue-200 text-blue-600 bg-blue-50' : 
                                        'border-gray-200 text-gray-600 bg-gray-50 shadow-gray-200'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className={`text-sm font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleAction(user, 'edit')}
                                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(user, user.status === 'Active' ? 'block' : 'activate')}
                                            className={`p-2 transition-colors ${user.status === 'Active' ? 'text-gray-400 hover:text-orange-500' : 'text-orange-500 hover:text-green-500'}`}
                                            title={user.status === 'Active' ? 'Block' : 'Activate'}
                                        >
                                            {user.status === 'Active' ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                                        </button>
                                        <button 
                                            onClick={() => handleAction(user, 'reset')}
                                            className="p-2 text-gray-400 hover:text-purple-500 transition-colors" title="Reset Password"
                                        >
                                            <Key className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(user, 'delete')}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* User Details Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-8 bg-gradient-to-r from-primary-500 to-indigo-600 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-black italic">{selectedUser ? 'Edit User Details' : 'Add New User'}</h2>
                                <p className="text-xs opacity-80 uppercase tracking-widest mt-1 font-bold">System Credentials & Role Management</p>
                            </div>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Full Name</label>
                                    <input 
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100"
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
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Role</label>
                                    <select 
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100 appearance-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="User">Patient</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">Account Status</label>
                                    <select 
                                        className="w-full bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm font-bold italic focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-gray-100 appearance-none"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Blocked">Blocked</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="flex justify-between gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex gap-2">
                                    {selectedUser && (
                                        <button 
                                            type="button"
                                            onClick={() => handleAction(selectedUser, 'delete')}
                                            className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-red-500/10 italic"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all italic"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-primary-500/30 italic ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? 'Processing...' : (selectedUser ? 'Save Changes' : 'Save Details')}
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

export default UserManagement;
