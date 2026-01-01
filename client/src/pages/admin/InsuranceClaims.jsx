import { useState } from 'react';
import { Shield, Search, Filter, CheckCircle, XCircle, FileText, ChevronRight, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const InsuranceClaims = () => {
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');

    const [claims, setClaims] = useState([
        { id: 'CLM-001', patient: 'Michael Scott', insurance: 'HealthCare Plus', amount: 15000, date: '2025-12-18', status: 'Pending', severity: 'High' },
        { id: 'CLM-002', patient: 'Pam Beesly', insurance: 'MediSecure', amount: 4200, date: '2025-12-19', status: 'Approved', severity: 'Medium' },
        { id: 'CLM-003', patient: 'Jim Halpert', insurance: 'Global Shield', amount: 8900, date: '2025-12-17', status: 'Under Review', severity: 'Low' },
        { id: 'CLM-004', patient: 'Dwight Schrute', insurance: 'FarmMed', amount: 25000, date: '2025-12-15', status: 'Pending', severity: 'High' },
    ]);

    const handleAction = (id, newStatus) => {
        setClaims(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        addToast(`Claim ${id} marking as ${newStatus}`, "info");
    };

    return (
        <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold italic flex items-center gap-3">
                            <Shield className="w-8 h-8" /> Insurance Hub
                        </h1>
                        <p className="text-blue-100 mt-2 font-medium italic">Streamline approvals and communication with insurance providers.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center px-6 py-2 bg-white/10 rounded-2xl backdrop-blur-md">
                            <p className="text-[10px] font-bold uppercase opacity-80">Pending Claims</p>
                            <p className="text-2xl font-bold">14</p>
                        </div>
                        <div className="text-center px-6 py-2 bg-white/10 rounded-2xl backdrop-blur-md">
                            <p className="text-[10px] font-bold uppercase opacity-80">Payout This Week</p>
                            <p className="text-2xl font-bold">₹42.5k</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Filter by ID, Patient or Provider..."
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border-none rounded-2xl shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {claims.filter(c => c.patient.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.includes(searchTerm)).map(claim => (
                    <div key={claim.id} className="card group hover:shadow-md transition-all border-l-4" style={{ 
                        borderLeftColor: claim.status === 'Approved' ? '#10b981' : 
                                       claim.status === 'Pending' ? '#f59e0b' : '#3b82f6' 
                    }}>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1 flex items-center gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                    <FileText className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100 italic">{claim.patient}</h3>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{claim.id}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        Provider: <span className="font-bold text-gray-700 dark:text-gray-300">{claim.insurance}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-px h-10 bg-gray-100 dark:bg-gray-700 hidden md:block" />

                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Amount Requested</p>
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">₹{claim.amount.toLocaleString()}</p>
                            </div>

                            <div className="w-px h-10 bg-gray-100 dark:bg-gray-700 hidden md:block" />

                            <div className="flex-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    claim.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                    claim.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {claim.status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {claim.status === 'Pending' ? (
                                    <>
                                        <button 
                                            onClick={() => handleAction(claim.id, 'Approved')}
                                            className="p-2.5 bg-green-500 text-white rounded-xl hover:shadow-lg transition-all"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(claim.id, 'Rejected')}
                                            className="p-2.5 bg-red-500 text-white rounded-xl hover:shadow-lg transition-all"
                                        >
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </>
                                ) : (
                                    <button className="p-2.5 bg-gray-50 dark:bg-gray-700 text-gray-400 rounded-xl hover:text-gray-600">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsuranceClaims;
