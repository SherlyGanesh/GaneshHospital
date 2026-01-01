import { useHospital } from '../../context/HospitalContext';
import { useToast } from '../../context/ToastContext';
import { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, Filter, Calendar, TrendingUp, Users, Activity } from 'lucide-react';

const AdminAnalytics = () => {
    const { analytics } = useHospital();
    const { addToast } = useToast();
    const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

    // Defensive fallbacks to avoid runtime errors when analytics data is missing
    const appointments = analytics?.appointmentsPerDay ?? [];
    const revenueMonthly = analytics?.revenueMonthly ?? [];
    const patientGrowth = analytics?.patientGrowth ?? [];
    const specialtyDistribution = analytics?.specialtyDistribution ?? [];

    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [isFiltering, setIsFiltering] = useState(false);

    const handleFilter = (range) => {
        setIsFiltering(true);
        setDateRange(range);
        setTimeout(() => setIsFiltering(false), 800);
        addToast(`Data filtered for ${range}`, "info");
    };

    return (
        <div className={`p-6 space-y-6 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border-b border-primary-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500 italic">Detailed insights into hospital operations and performance.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all italic">
                            <Calendar className="w-4 h-4 text-primary-500" /> {dateRange}
                        </button>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-50 dark:border-gray-700 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50 overflow-hidden">
                            {['Today', 'Last 7 Days', 'Last 30 Days', 'This Year'].map(range => (
                                <button 
                                    key={range}
                                    onClick={() => handleFilter(range)}
                                    className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors italic border-b border-gray-50 last:border-0"
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl text-xs font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 italic">
                        <Download className="w-4 h-4" /> Export
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                     <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase">
                        <Calendar className="w-5 h-5 text-blue-500" /> Appointment Trends
                     </h3>
                     <div className="h-[300px] w-full">
                        {appointments.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={appointments}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                                    <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-gray-400">No appointment data</div>
                        )}
                     </div>
                </div>

                <div className="card">
                     <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase">
                        <TrendingUp className="w-5 h-5 text-green-500" /> Revenue Growth
                     </h3>
                     <div className="h-[300px] w-full">
                        {revenueMonthly.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueMonthly}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} />
                                    <Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-gray-400">No revenue data</div>
                        )}
                     </div>
                </div>

                <div className="card">
                     <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase">
                        <Users className="w-5 h-5 text-purple-500" /> Patient Acquisition
                     </h3>
                     <div className="h-[300px] w-full">
                        {patientGrowth.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={patientGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Line type="step" dataKey="total" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-gray-400">No growth data</div>
                        )}
                     </div>
                </div>

                <div className="card">
                     <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase">
                        <Activity className="w-5 h-5 text-red-500 shadow-sky-50" /> Department Load Distribution
                     </h3>
                     <div className="h-[300px] w-full">
                        {specialtyDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={specialtyDistribution}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {specialtyDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">No distribution data</div>
                        )}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
