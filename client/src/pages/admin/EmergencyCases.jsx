import { useHospital } from '../../context/HospitalContext';
import { AlertTriangle, MapPin, Clock, Phone, CheckCircle, ShieldAlert, Ambulance } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const EmergencyCases = () => {
    const { emergencyAlerts, resolveEmergency } = useHospital();
    const { addToast } = useToast();

    return (
        <div className="p-6 space-y-6">
            <div className="bg-red-500 p-8 rounded-2xl text-white shadow-xl shadow-red-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3 italic">
                        <ShieldAlert className="w-8 h-8 animate-pulse" /> Emergency Control Center
                    </h1>
                    <p className="text-red-100 mt-2 font-medium italic">Active emergency alerts requiring immediate attention.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 italic">Active Alerts</h2>
                    {emergencyAlerts.length === 0 ? (
                        <div className="card text-center py-12">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <p className="text-gray-500">No active emergency alerts. All cases resolved.</p>
                        </div>
                    ) : (
                        emergencyAlerts.map(alert => (
                            <div key={alert._id || alert.id} className={`card border-l-4 ${
                                alert.severity === 'Critical' ? 'border-red-500 bg-red-50/10' : 
                                alert.severity === 'High' ? 'border-orange-500 bg-orange-50/10' : 'border-yellow-500'
                            } transition-transform hover:scale-[1.01]`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl ${
                                             alert.severity === 'Critical' ? 'bg-red-100 text-red-600 shadow-sm shadow-blue-50' : 
                                             alert.severity === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            <Ambulance className="w-5 h-5 shadow-inner" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-100">{alert.type}</h3>
                                            <p className="text-xs text-gray-500">Patient: {alert.patient}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                                        alert.severity === 'Critical' ? 'bg-red-500 text-white shadow-emerald-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-bold italic">
                                        <MapPin className="w-4 h-4" /> {alert.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-bold italic">
                                        <Clock className="w-4 h-4" /> {alert.time}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => resolveEmergency(alert._id || alert.id)}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all italic"
                                    >
                                        <CheckCircle className="w-4 h-4" /> Resolve Case
                                    </button>
                                    <button 
                                        onClick={() => addToast("Viewing detailed dispatch log...", "info")}
                                        className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 italic"
                                    >
                                        <Phone className="w-4 h-4 " /> Dispatch Log
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="card h-fit">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 italic">Emergency Resources</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 italic">Ambulances Available</span>
                                <span className="text-lg font-bold text-primary-500">8/12</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden italic">
                                <div className="w-[66%] h-full bg-primary-500 italic"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl italic">
                            <div className="flex justify-between items-center mb-2 ">
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">ER Bed Capacity</span>
                                <span className="text-lg font-bold text-orange-500">3/15</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden italic">
                                <div className="w-[20%] h-full bg-orange-500 italic"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl italic">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">On-Call Staff</span>
                                <span className="text-lg font-bold text-green-500">22</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyCases;
