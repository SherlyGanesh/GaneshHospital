import { useState, useEffect, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { Users, Calendar, Activity, AlertCircle, Video, Phone, CreditCard, FileText, Clock, Heart, TrendingUp, IndianRupee, Package, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
  const { patients, appointments, doctors, analytics, stats: initialStats } = useHospital();
  const { user } = useAuth();
  const { addToast } = useToast();
  const isUser = user?.role === 'User';
  const isDoctor = user?.role === 'Doctor';

  // Safe chart fallbacks
  const chartAppointments = useMemo(() => analytics?.appointmentsPerDay || [], [analytics]);
  const chartPatientGrowth = useMemo(() => analytics?.patientGrowth || [], [analytics]);
  const chartRevenueMonthly = useMemo(() => analytics?.revenueMonthly || [], [analytics]);
  const chartSpecialtyDistribution = useMemo(() => analytics?.specialtyDistribution || [], [analytics]);
  
  const topSpecialty = useMemo(() => {
    if (!chartSpecialtyDistribution.length) return 'N/A';
    return [...chartSpecialtyDistribution].sort((a, b) => b.value - a.value)[0].name;
  }, [chartSpecialtyDistribution]);
  
  // Dynamic Stats Calculation
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  const doctorAppointments = useMemo(() => 
    appointments.filter(apt => apt.date === today && apt.doctorName.toLowerCase().includes(user?.name?.toLowerCase() || '')),
    [appointments, today, user?.name]
  );

  const adminAppointmentsToday = useMemo(() => 
    appointments.filter(a => a.date === today),
    [appointments, today]
  );

  const emergencyCases = useMemo(() => 
    appointments.filter(apt => apt.type === 'Emergency' && apt.status === 'Pending').length,
    [appointments]
  );

  const doctorStatCards = useMemo(() => [
    { label: 'Today\'s Appointments', value: doctorAppointments.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100', trend: 'Live' },
    { label: 'Patients Today', value: doctorAppointments.filter(a => a.status !== 'Cancelled').length, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', trend: 'Stable' },
    { label: 'Pending Reports', value: 3, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100', trend: 'High' },
    { label: 'Emergency Calls', value: emergencyCases, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-100', trend: 'Critical' },
    { label: 'Available Slots', value: 8, icon: Clock, color: 'text-green-600', bg: 'bg-green-100', trend: 'Good' }
  ], [doctorAppointments, emergencyCases]);

  const adminStatCards = useMemo(() => [
    { label: 'Total Patients', value: patients.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%' },
    { label: 'Total Doctors', value: doctors.length, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+2' },
    { label: 'Today\'s Appointments', value: adminAppointmentsToday.length, icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-100', trend: '+5' },
    { label: 'Revenue Today', value: `₹${initialStats.totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100', trend: '+18%' },
    { label: 'Pending Bills', value: initialStats.pendingInvoices, icon: CreditCard, color: 'text-yellow-600', bg: 'bg-yellow-100', trend: '-3' },
    { label: 'Emergency Alerts', value: emergencyCases, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-100', trend: 'Critical', severity: 'High' }
  ], [patients.length, doctors.length, adminAppointmentsToday, initialStats.totalRevenue, initialStats.pendingInvoices, emergencyCases]);

  const [animatedValues, setAnimatedValues] = useState({});

  useEffect(() => {
    const cards = isDoctor ? doctorStatCards : adminStatCards;
    const timers = [];

    cards.forEach(card => {
        if (typeof card.value === 'number') {
            let start = 0;
            const end = card.value;
            if (end === 0) {
                setAnimatedValues(prev => ({ ...prev, [card.label]: 0 }));
                return;
            }
            const duration = 800;
            const steps = duration / 16;
            const increment = end / steps;
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setAnimatedValues(prev => ({ ...prev, [card.label]: end }));
                    clearInterval(timer);
                } else {
                    setAnimatedValues(prev => ({ ...prev, [card.label]: Math.floor(start) }));
                }
            }, 16);
            timers.push(timer);
        } else {
            setAnimatedValues(prev => ({ ...prev, [card.label]: card.value }));
        }
    });

    return () => timers.forEach(t => clearInterval(t));
  }, [adminStatCards, doctorStatCards, isDoctor]);

  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  if (isUser) {
    // Patient Dashboard
    const nextAppointment = appointments.find(a => a.status === 'Confirmed') || {
      doctorName: 'Dr. Smith',
      date: '2025-12-25',
      time: '10:00 AM'
    };

    const patientCards = [
      {
        title: 'Upcoming Appointment',
        icon: Calendar,
        content: (
          <div className="space-y-2">
            <p className="font-semibold text-gray-800 dark:text-gray-100">{nextAppointment.doctorName}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
               <Clock className="w-4 h-4" />
               <span>{nextAppointment.date} at {nextAppointment.time}</span>
            </div>
            <div className="flex gap-2 mt-2">
                <button 
                    onClick={() => addToast("Joining video consultation...", "info")}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white text-xs px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                    <Video className="w-3 h-3" /> Join
                </button>
                 <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-xs px-3 py-2 rounded-lg transition-colors">
                    Cancel
                </button>
            </div>
          </div>
        ),
        color: 'from-blue-400 to-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20'
      },
      {
        title: 'Health Summary',
        icon: Heart,
        content: (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Blood Group</span>
                <span className="font-bold text-gray-800 dark:text-gray-100">O+</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Checkup</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">2 Nov 2025</span>
            </div>
            <div className="mt-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
                3 New Reports Available
            </div>
          </div>
        ),
        color: 'from-red-400 to-pink-600',
        bg: 'bg-pink-50 dark:bg-pink-900/20'
      },
      {
        title: 'Bills Due',
        icon: CreditCard,
        content: (
          <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Amount</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">₹150.00</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Consultation Fees</p>
             <Link to="/billing" className="block w-full text-center bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-2 rounded-lg transition-colors font-semibold mt-2">
                Pay Now
            </Link>
          </div>
        ),
        color: 'from-orange-400 to-orange-600',
        bg: 'bg-orange-50 dark:bg-orange-900/20'
      },
      {
        title: 'Emergency Contact',
        icon: AlertCircle,
        content: (
          <div className="space-y-2 text-center">
             <p className="text-xs text-gray-500 mb-2">24/7 Ambulance & Support</p>
             <div className="relative group">
                <div className="absolute -inset-1 bg-red-500 rounded-full opacity-25 group-hover:opacity-50 blur animate-pulse"></div>
                <button className="relative w-full bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105">
                    <Phone className="w-4 h-4" /> 
                    <span>Call 108</span>
                </button>
             </div>
          </div>
        ),
        color: 'from-red-500 to-red-700',
        bg: 'bg-red-50 dark:bg-red-900/10'
      }
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2">
                Welcome back, {user?.name || 'User'}! <span className='text-primary-500'>👋</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                Your health journey matters to us. Here's your daily summary.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {patientCards.map((card, index) => (
                    <div key={index} className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 pointer-events-auto">
                         <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center shadow-lg shadow-gray-200 dark:shadow-none`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-700 dark:text-gray-200">{card.title}</h3>
                         </div>
                         {card.content}
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                 {/* Recent Activity / Simplified for User */}
                 <div className="card">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary-500" /> Recent Reports
                    </h2>
                    <div className="space-y-3">
                         {[1, 2].map((i) => (
                             <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                                     <div>
                                         <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Blood Test Report</p>
                                         <p className="text-xs text-gray-500">2 Nov 2025</p>
                                     </div>
                                </div>
                                <span className="text-xs font-semibold text-primary-500">View</span>
                             </div>
                         ))}
                    </div>
                 </div>
                 
                  <div className="card">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-secondary-500" /> Upcoming Schedule
                    </h2>
                     <div className="text-center py-8 text-gray-500 italic">
                         No other appointments scheduled for this week.
                     </div>
                  </div>
            </div>
        </div>
    );
  }

  if (isDoctor) {
    // Doctor Dashboard
    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="card flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2 italic">
                    Good Morning, Dr. {user?.name}! <span className='text-primary-500'>👨‍⚕️</span>
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    You have <span className="font-bold text-primary-500">{doctorAppointments.length}</span> appointments scheduled for today.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => {
                            addToast("Starting virtual clinic session...", "success");
                            window.open('https://meet.google.com/new', '_blank');
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-2xl text-sm font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 italic"
                    >
                        <Video className="w-4 h-4" /> Go Live
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {doctorStatCards.map((card, idx) => (
                    <div key={idx} className="card group hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                card.trend === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                            }`}>
                                {card.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 italic">{card.label}</p>
                        <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 italic">
                            {animatedValues[card.label] || 0}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">Today's Timeline</h3>
                            <button className="text-xs font-bold text-primary-500 hover:secondary-500 transition-colors italic uppercase tracking-wider">View Full Schedule</button>
                        </div>
                        <div className="space-y-4">
                            {doctorAppointments.length === 0 ? (
                                <div className="text-center py-10 text-gray-500 italic">No appointments for today.</div>
                            ) : (
                                doctorAppointments.map((apt, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-l-4 border-l-primary-500 hover:shadow-md transition-all group">
                                        <div className="text-center border-r border-gray-200 dark:border-gray-600 pr-4">
                                            <p className="text-xs font-bold text-gray-400">{apt.time.split(' ')[1]}</p>
                                            <p className="text-lg font-black text-gray-800 dark:text-gray-100">{apt.time.split(' ')[0]}</p>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 dark:text-gray-100">{apt.patientName}</h4>
                                                    <p className="text-xs text-gray-500 italic">{apt.type} • Bed #0{i+1}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="p-2 bg-white dark:bg-gray-800 text-primary-500 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-sm" title="Video Call"><Video className="w-4 h-4" /></button>
                                                    <button className="p-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 shadow-lg shadow-primary-500/20" title="Check Patient"><Activity className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="card h-[280px]">
                             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 italic">Patient Load Analysis</h3>
                             <div className="h-[200px] w-full">
                                 {chartAppointments.length > 0 ? (
                                     <ResponsiveContainer width="100%" height="100%">
                                         <AreaChart data={chartAppointments.slice(-7)}>
                                             <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={3} />
                                         </AreaChart>
                                     </ResponsiveContainer>
                                 ) : (
                                     <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">No appointment data available</div>
                                 )}
                             </div>
                         </div>
                         <div className="card h-[280px]">
                             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 italic">Treatment Success</h3>
                             <div className="h-[200px] w-full">
                                 {chartPatientGrowth.length > 0 ? (
                                     <ResponsiveContainer width="100%" height="100%">
                                         <LineChart data={chartPatientGrowth.slice(-6)}>
                                             <Line type="basis" dataKey="total" stroke="#10b981" strokeWidth={4} dot={false} />
                                         </LineChart>
                                     </ResponsiveContainer>
                                 ) : (
                                     <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">No growth data available</div>
                                 )}
                             </div>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card bg-red-600 h-fit">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-white animate-pulse" />
                            </div>
                            <h3 className="font-bold text-white italic">Active Emergencies</h3>
                        </div>
                        <div className="space-y-3">
                            {emergencyCases > 0 ? (
                                <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-white active:scale-95 cursor-pointer transition-transform">
                                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Cardiac Emergency</p>
                                    <p className="text-lg font-black">Patient #ERT-99</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-[10px] bg-red-800 px-2 py-0.5 rounded-full font-bold">URGENT</span>
                                        <button className="text-[10px] font-bold underline">Respond Now</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-white/60 text-sm italic">All quiet at the moment.</p>
                            )}
                        </div>
                    </div>

                    <div className="card">
                         <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 italic">Clinical Notes</h3>
                         <textarea 
                             className="w-full h-40 bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl p-4 text-sm italic focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                             placeholder="Jot down quick observations..."
                         />
                         <button className="w-full mt-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl text-xs font-bold italic hover:shadow-lg transition-all">
                             Save Draft Note
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome & Analytics Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="card flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent mb-2 italic">
            Welcome, Admin {user?.name}!{" "}
            <span className="text-primary-500">👤</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            System performance is optimal. You have{" "}
            <span className="font-bold text-red-500">{emergencyCases}</span>{" "}
            pending emergencies requiring attention.
          </p>
        </div>
        <div className="flex gap-3 h-fit">
          <button
            onClick={() =>
              addToast("Preparing medical records for export...", "info")
            }
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm italic"
          >
            <Package className="w-4 h-4" /> Export Data
          </button>
          <button
            onClick={() =>
              addToast(
                "Scanning system components... All systems nominal.",
                "success"
              )
            }
            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-2xl text-sm font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 italic"
          >
            <TrendingUp className="w-4 h-4" /> System Health
          </button>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {adminStatCards.map((card, idx) => (
          <div
            key={idx}
            className="card group hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-2xl ${card.bg} ${card.color} shadow-sm group-hover:scale-110 transition-transform`}
              >
                <card.icon className="w-6 h-6" />
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  card.severity === "High"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {card.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 italic">
              {card.label}
            </p>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 italic">
              {typeof card.value === "number"
                ? animatedValues[card.label] || 0
                : card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Analytics Subsection */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Appointments Chart */}
        <div className="card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Appointments Overview
            </h3>
            <select className="bg-gray-50 dark:bg-gray-700 border-none text-xs font-semibold rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            {chartAppointments.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartAppointments}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">
                    No appointment data available
                </div>
            )}
          </div>
        </div>

        {/* Specialty Distribution */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
            Specialty Load
          </h3>
          <div className="h-[300px] w-full relative">
              {chartSpecialtyDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartSpecialtyDistribution}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartSpecialtyDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">
                  No distribution data
                </div>
              )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Top Load
              </span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 truncate w-full px-4 text-center">
                {topSpecialty}
              </span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {chartSpecialtyDistribution.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[idx] }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Analytics */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Revenue Stream (Monthly)
            </h3>
            <Link
              to="/admin/billing"
              className="text-xs text-primary-500 hover:underline"
            >
              View Invoices
            </Link>
          </div>
          <div className="h-[250px] w-full">
              {chartRevenueMonthly.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartRevenueMonthly}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                      contentStyle={{ borderRadius: "12px", border: "none" }}
                    />
                    <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">
                  No revenue data available
                </div>
              )}
          </div>
        </div>

        {/* Patient Growth */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Patient Growth
            </h3>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="h-[250px] w-full">
            {chartPatientGrowth.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPatientGrowth}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "none" }}
                  />
                  <Line
                    type="step"
                    dataKey="total"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400 italic">
                    No growth data available
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
