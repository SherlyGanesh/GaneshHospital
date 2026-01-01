import { useState } from 'react';
import { CreditCard, Search, Filter, Download, IndianRupee, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';

const BillingManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Mock billing data
    const [invoices] = useState([
        { id: 'INV-001', patient: 'John Doe', amount: 1250, status: 'Paid', date: '2025-12-18', method: 'Credit Card' },
        { id: 'INV-002', patient: 'Jane Smith', amount: 3400, status: 'Pending', date: '2025-12-19', method: 'Insurance' },
        { id: 'INV-003', patient: 'Robert Brown', amount: 850, status: 'Paid', date: '2025-12-17', method: 'Cash' },
        { id: 'INV-004', patient: 'Mary Wilson', amount: 2100, status: 'Overdue', date: '2025-12-10', method: 'Debit Card' },
    ]);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Billing & Financials</h1>
                    <p className="text-sm text-gray-500 italic">Monitor revenue, process payments, and manage invoices.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all">
                        <Download className="w-4 h-4" /> Export Stats
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card bg-gradient-to-br from-green-500 to-emerald-600 text-white border-none">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-lg"><IndianRupee className="w-5 h-5" /></div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-xs font-bold uppercase opacity-80 mb-1">Total Revenue</p>
                    <h3 className="text-2xl font-bold">₹142,500</h3>
                </div>
                <div className="card">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange-500" /> Pending
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹12,400</h3>
                    <p className="text-xs text-gray-500 mt-2">18 invoices pending</p>
                </div>
                <div className="card">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-blue-500" /> Today
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹4,250</h3>
                    <p className="text-xs text-gray-500 mt-2">Compared to ₹3,800 yesterday</p>
                </div>
                <div className="card">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Collection
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">94.2%</h3>
                    <div className="w-full h-1.5 bg-gray-100 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[94.2%]" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search by patient or ID..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-none rounded-xl text-sm italic"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Paid', 'Pending', 'Overdue'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    filterStatus === status 
                                    ? 'bg-primary-500 text-white shadow-md' 
                                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr className="text-left">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Invoice ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Patient</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Method</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase italic">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-primary-500 tracking-wider">{inv.id}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-200 italic">{inv.patient}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-200">₹{inv.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{inv.method}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            inv.status === 'Paid' ? 'bg-green-100 text-green-600' :
                                            inv.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-primary-500 transition-colors">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillingManagement;
