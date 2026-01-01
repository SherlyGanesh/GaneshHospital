import { useState } from 'react';
import { Shield, Lock, Check, X, ShieldAlert, User, Activity, CreditCard, Settings } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            enabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
        }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
    </button>
);

const RolePermissions = () => {
    const { addToast } = useToast();
    const [selectedRole, setSelectedRole] = useState('Admin');
    const [rolePerms, setRolePerms] = useState([
        { category: 'General', items: [
            { name: 'View Dashboard', roles: ['Admin', 'Doctor', 'User'] },
            { name: 'Edit Profile', roles: ['Admin', 'Doctor', 'User'] },
            { name: 'Manage Appointments', roles: ['Admin', 'Doctor', 'User'] },
        ]},
        { category: 'Management', items: [
            { name: 'Manage Users', roles: ['Admin'] },
            { name: 'Manage Doctors', roles: ['Admin'] },
            { name: 'Configure Departments', roles: ['Admin'] },
        ]},
        { category: 'Financials', items: [
            { name: 'View Billing', roles: ['Admin', 'User'] },
            { name: 'Manage Invoices', roles: ['Admin'] },
            { name: 'Approve Insurance', roles: ['Admin'] },
        ]},
        { category: 'System', items: [
            { name: 'Global Settings', roles: ['Admin'] },
            { name: 'System Logs', roles: ['Admin'] },
        ]},
    ]);

    const roles = [
        { id: 'Admin', icon: ShieldAlert, description: 'Full system access, management of all hospital operations.' },
        { id: 'Doctor', icon: Activity, description: 'Clinical management, patient records, and appointments.' },
        { id: 'User', icon: User, description: 'Patient access to personal records and bookings.' },
    ];

    const togglePermission = (categoryIndex, itemIndex) => {
        setRolePerms(prev => {
            const newPerms = [...prev];
            const item = { ...newPerms[categoryIndex].items[itemIndex] };
            const roleIndex = item.roles.indexOf(selectedRole);

            if (roleIndex > -1) {
                item.roles = item.roles.filter(r => r !== selectedRole);
                addToast(`${item.name} disabled for ${selectedRole}`, "warning");
            } else {
                item.roles = [...item.roles, selectedRole];
                addToast(`${item.name} enabled for ${selectedRole}`, "success");
            }

            newPerms[categoryIndex].items[itemIndex] = item;
            return newPerms;
        });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-b border-primary-100">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Roles & Permissions</h1>
                    <p className="text-sm text-gray-500 italic">Define access levels and fine-tune security protocols.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Roles Selector */}
                <div className="space-y-4">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Select Role</h2>
                    {roles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`w-full p-6 rounded-2xl transition-all text-left border-2 ${
                                selectedRole === role.id 
                                ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10' 
                                : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className={`p-2 rounded-lg ${selectedRole === role.id ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <role.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-gray-800 dark:text-gray-100">{role.id}</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed italic">{role.description}</p>
                        </button>
                    ))}
                </div>

                {/* Permissions Grid */}
                <div className="lg:col-span-2 space-y-6">
                    {rolePerms.map((cat, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-50 dark:border-gray-700">
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{cat.category}</h3>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {cat.items.map((perm, pIdx) => (
                                    <div key={pIdx} className="px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{perm.name}</span>
                                        </div>
                                        <Toggle 
                                            enabled={perm.roles.includes(selectedRole)} 
                                            onChange={() => togglePermission(idx, pIdx)} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RolePermissions;
