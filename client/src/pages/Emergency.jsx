import { Phone, MapPin, Ambulance } from 'lucide-react';

const Emergency = () => {
    return (
        <div className="p-6">
            <div className="card border-l-4 border-red-500">
                <div className='flex items-center gap-4 mb-6'>
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-500 animate-pulse">
                        <Ambulance className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
                            Emergency Help
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Immediate assistance is just a click away</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-800 text-center">
                        <h3 className="font-bold text-xl text-red-700 dark:text-red-300 mb-2">Ambulance</h3>
                        <p className="text-red-600/80 mb-6">24/7 Priority Dispatch</p>
                        <button className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                            <Phone className="w-6 h-6" />
                            <span>Call 108 Now</span>
                        </button>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                         <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 mb-2">Hospital Hotline</h3>
                        <p className="text-blue-600/80 mb-6">General Emergency Line</p>
                         <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                            <Phone className="w-6 h-6" />
                            <span>Call (022) 1234-5678</span>
                        </button>
                    </div>
                </div>
                
                 <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Ganesh Hospital, Main Branch</p>
                        <p className="text-sm text-gray-500">123, Healthcare Blvd, Medical District, Mumbai - 400001</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emergency;
