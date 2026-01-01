import { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Calendar, Coffee, Save, Plus, Trash2, Shield, AlertTriangle } from 'lucide-react';

const Availability = () => {
    const { availability, updateAvailability } = useHospital();
    const { user } = useAuth();
    const doctorName = user?.name || '';

    const initialSchedule = {
        workingHours: { start: '09:00', end: '17:00' },
        breaks: [{ type: 'Lunch', start: '13:00', end: '14:00' }],
        leaves: [],
        daysOff: ['Saturday', 'Sunday']
    };

    const [schedule, setSchedule] = useState(availability[doctorName] || initialSchedule);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        updateAvailability(doctorName, schedule);
        setTimeout(() => setIsSaving(false), 800);
    };

    const toggleDayOff = (day) => {
        setSchedule(prev => ({
            ...prev,
            daysOff: prev.daysOff.includes(day) 
                ? prev.daysOff.filter(d => d !== day)
                : [...prev.daysOff, day]
        }));
    };

    const addLeave = () => {
        const date = window.prompt("Enter leave date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
        if (date) {
            setSchedule(prev => ({
                ...prev,
                leaves: [...prev.leaves, date]
            }));
        }
    };

    const removeLeave = (date) => {
        setSchedule(prev => ({
            ...prev,
            leaves: prev.leaves.filter(l => l !== date)
        }));
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (user?.role !== 'Doctor') {
        return (
            <div className="p-6">
                <div className="card text-center py-20">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 italic uppercase">Access Restricted</h2>
                    <p className="text-gray-500 italic">Only clinical personnel can manage consultation schedules.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 shadow-lg shadow-indigo-500/10">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent italic">
                                Availability Schedule
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                Configure your clinical hours, breaks, and holiday registry.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            isSaving ? 'bg-green-500 text-white' : 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:shadow-xl'
                        }`}
                    >
                        {isSaving ? 'Schedule Synced!' : <><Save className="w-4 h-4" /> Commit Changes</>}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card">
                        <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-6 italic uppercase tracking-wider flex items-center gap-2">
                             Working Days Configuration
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                            {days.map(day => (
                                <button
                                    key={day}
                                    onClick={() => toggleDayOff(day)}
                                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 group ${
                                        schedule.daysOff.includes(day)
                                        ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 text-gray-400 scale-95 opacity-60'
                                        : 'bg-white dark:bg-gray-800 border-indigo-100 dark:border-indigo-900 text-indigo-600 shadow-sm hover:border-indigo-500'
                                    }`}
                                >
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{day.substring(0, 3)}</span>
                                    {schedule.daysOff.includes(day) ? (
                                        <AlertTriangle className="w-4 h-4 opacity-50" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card">
                             <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 italic">Daily Session Hours</h3>
                             <div className="space-y-4">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Morning Start</p>
                                    <input 
                                        type="time" 
                                        className="bg-transparent border-none text-xl font-black text-gray-800 dark:text-gray-100 italic outline-none w-full"
                                        value={schedule.workingHours.start}
                                        onChange={(e) => setSchedule({...schedule, workingHours: {...schedule.workingHours, start: e.target.value}})}
                                    />
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Evening End</p>
                                    <input 
                                        type="time" 
                                        className="bg-transparent border-none text-xl font-black text-gray-800 dark:text-gray-100 italic outline-none w-full"
                                        value={schedule.workingHours.end}
                                        onChange={(e) => setSchedule({...schedule, workingHours: {...schedule.workingHours, end: e.target.value}})}
                                    />
                                </div>
                             </div>
                        </div>

                        <div className="card">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 italic">Clinical Breaks</h3>
                            <div className="space-y-3">
                                {schedule.breaks.map((b, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                                        <Coffee className="w-4 h-4 text-indigo-500" />
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">{b.type}</p>
                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 italic">{b.start} - {b.end}</p>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl text-[10px] font-black uppercase text-gray-400 tracking-widest hover:border-indigo-400 hover:text-indigo-400 transition-all">
                                    Add Break Slot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 italic uppercase">Holiday Registry</h3>
                            <button onClick={addLeave} className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                            {schedule.leaves.length === 0 ? (
                                <div className="text-center py-10">
                                    <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                                    <p className="text-xs text-gray-400 italic">No leaves registered.</p>
                                </div>
                            ) : (
                                schedule.leaves.map(date => (
                                    <div key={date} className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 group">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-4 h-4 text-red-500" />
                                            <span className="text-sm font-black text-red-600 italic tracking-tight">{date}</span>
                                        </div>
                                        <button onClick={() => removeLeave(date)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-700">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Availability;
