import { useState } from 'react';
import { Layers, Plus, Search, Edit2, Trash2, Users, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const DepartmentManagement = () => {
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    
    // Mock departments data for demo
    const [departments, setDepartments] = useState([
        { id: 1, name: 'Cardiology', head: 'Dr. Sarah Wilson', staff: 12, beds: 25, status: 'Active', color: 'bg-red-500' },
        { id: 2, name: 'Neurology', head: 'Dr. James Moore', staff: 8, beds: 15, status: 'Active', color: 'bg-purple-500' },
        { id: 3, name: 'Pediatrics', head: 'Dr. Emily Chen', staff: 15, beds: 30, status: 'Active', color: 'bg-green-500' },
        { id: 4, name: 'Orthopedics', head: 'Dr. Michael Ross', staff: 10, beds: 20, status: 'Active', color: 'bg-blue-500' },
    ]);

    const handleEdit = (dept) => {
        const newName = window.prompt("Enter new department name:", dept.name);
        if (newName) {
            setDepartments(prev => prev.map(d => d.id === dept.id ? { ...d, name: newName } : d));
            addToast("Department updated", "success");
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this department?")) {
            setDepartments(prev => prev.filter(d => d.id !== id));
            addToast("Department removed", "error");
        }
    };

    const handleAdd = () => {
        const name = window.prompt("Enter new department name:");
        if (name) {
            setDepartments(prev => [...prev, {
                id: Date.now(),
                name,
                head: 'Unassigned',
                staff: 0,
                beds: 0,
                status: 'Active',
                color: 'bg-primary-500'
            }]);
            addToast("Department added", "success");
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Department Management</h1>
                    <p className="text-sm text-gray-500 italic">Configure hospital wings, staffing, and resource allocation.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105 italic"
                >
                    <Plus className="w-5 h-5" /> Add Department
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search departments..."
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-xl shadow-sm text-sm outline-none focus:ring-2 focus:ring-primary-500 italic"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase())).map(dept => (
                    <div key={dept.id} className="card group overflow-hidden border-t-4" style={{ borderTopColor: dept.color.replace('bg-', '') }}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${dept.color} text-white shadow-lg shadow-gray-200`}>
                                <Layers className="w-6 h-6" />
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => handleEdit(dept)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                ><Edit2 className="w-4 h-4" /></button>
                                <button 
                                    onClick={() => handleDelete(dept.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                ><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 italic">{dept.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                            <ArrowRight className="w-3 h-3" /> Head: <span className="font-semibold text-gray-700 dark:text-gray-300">{dept.head}</span>
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                                    <Users className="w-3 h-3" /> Staff
                                </p>
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">{dept.staff}</p>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Bed Load
                                </p>
                                <p className="text-lg font-bold text-gray-700 dark:text-gray-200">{dept.beds}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-600">
                                {dept.status}
                            </span>
                            <button 
                                onClick={() => addToast(`Opening resource allocation for ${dept.name}`, "info")}
                                className="text-xs font-bold text-primary-500 hover:underline flex items-center gap-1 italic"
                            >
                                Resources <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentManagement;
