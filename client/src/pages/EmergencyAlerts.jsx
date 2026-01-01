import { useState } from 'react';
import { AlertTriangle, MapPin, Activity, Phone, Clock, CheckCircle, Bell, ChevronRight, Ambulance } from 'lucide-react';

const EmergencyAlerts = () => {
    
    // Mock emergency data
    const [activeEmergencies, setActiveEmergencies] = useState([
        { 
            id: 'E1', 
            type: 'Cardiac Arrest', 
            location: 'Ward A, Room 302', 
            time: '2 mins ago', 
            priority: 'Critical',
            patientName: 'John Doe',
            vitals: 'BP: 90/60, HR: 140'
        },
        { 
            id: 'E2', 
            type: 'Acute Respiratory Distress', 
            location: 'Emergency Wing', 
            time: '5 mins ago', 
            priority: 'High',
            patientName: 'Jane Smith',
            vitals: 'O2: 82%, RR: 30'
        }
    ]);

    const handleRespond = (id) => {
        window.alert(`Response initiated for Emergency ${id}. Hospital staff alerted.`);
        setActiveEmergencies(prev => prev.filter(e => e.id !== id));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="card border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 shadow-xl shadow-red-500/20 animate-pulse">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-red-600 dark:text-red-400 italic uppercase tracking-tighter">
                                Emergency Command Center
                            </h1>
                            <p className="text-sm text-red-500/80 dark:text-red-400/60 italic font-bold">
                                ACTIVE CRISES REQUIRING IMMEDIATE CLINICAL INTERVENTION.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {activeEmergencies.length === 0 ? (
                    <div className="col-span-full card py-20 text-center">
                        <Ambulance className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                        <h2 className="text-xl font-black text-gray-400 italic uppercase">Code Clear</h2>
                        <p className="text-gray-400 italic">No active medical emergencies reported at this time.</p>
                    </div>
                ) : (
                    activeEmergencies.map((e) => (
                        <div key={e.id} className={`card border-2 transition-all duration-300 relative overflow-hidden group ${
                            e.priority === 'Critical' ? 'border-red-500 shadow-xl shadow-red-500/10' : 'border-orange-400 shadow-xl shadow-orange-500/10'
                        }`}>
                            {/* Flash Overlay */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${
                                e.priority === 'Critical' ? 'bg-red-500' : 'bg-orange-500'
                            } animate-pulse`} />

                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            e.priority === 'Critical' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                                        }`}>
                                            {e.priority}
                                        </span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{e.id}</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 italic uppercase tracking-tighter leading-none">{e.type}</h2>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Elapsed Time</p>
                                    <p className="text-sm font-black text-red-500 italic">{e.time}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-3 h-3 text-red-500" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-800 dark:text-gray-200 italic">{e.location}</p>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity className="w-3 h-3 text-red-500" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Initial Vitals</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-800 dark:text-gray-200 italic">{e.vitals}</p>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 dark:bg-gray-100 rounded-2xl mb-6 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-800 dark:bg-gray-200 rounded-xl flex items-center justify-center text-white dark:text-gray-900 font-black">
                                        {e.patientName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest leading-none">Subject</p>
                                        <p className="text-xs font-black text-white dark:text-gray-900 italic">{e.patientName}</p>
                                    </div>
                                </div>
                                <button className="text-white dark:text-gray-900 border border-gray-600 dark:border-gray-300 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-900/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>

                            <button 
                                onClick={() => handleRespond(e.id)}
                                className={`w-full py-4 rounded-2xl font-black text-sm uppercase italic tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 ${
                                    e.priority === 'Critical' 
                                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/20' 
                                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20'
                                }`}
                            >
                                <ChevronRight className="w-5 h-5 animate-bounce-x" /> Respond Now
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="card">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 italic">Protocol & Triage Checklist</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black text-xs">01</div>
                        <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase">Immediate Triage</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-black text-xs">02</div>
                        <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase">Alert Response Team</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xs">03</div>
                        <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase">Securing Vitals</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-black text-xs">04</div>
                        <p className="text-[10px] font-black text-gray-600 dark:text-gray-400 uppercase">Doctor On-site</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyAlerts;
