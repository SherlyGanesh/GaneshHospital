import { Shield, Info, CheckCircle, Smartphone } from 'lucide-react';

const Insurance = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className='flex items-center gap-4 mb-6'>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Insurance Integration
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your health insurance plans</p>
                    </div>
                </div>
                
                {/* Active Policy Card */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <p className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Active Policy</p>
                            <h2 className="text-2xl font-bold mt-1">Health Shield Plus</h2>
                            <p className="text-blue-100 text-xs">Policy #HSP-8829-2025</p>
                        </div>
                        <Shield className="w-10 h-10 text-blue-300" />
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                        <div>
                            <p className="text-blue-300 text-xs uppercase">Coverage</p>
                            <p className="font-semibold">$50,000</p>
                        </div>
                        <div>
                            <p className="text-blue-300 text-xs uppercase">Valid Till</p>
                            <p className="font-semibold">Dec 2026</p>
                        </div>
                        <div>
                            <p className="text-blue-300 text-xs uppercase">Members</p>
                            <p className="font-semibold">4 Family</p>
                        </div>
                        <div>
                            <p className="text-blue-300 text-xs uppercase">Claims</p>
                            <p className="font-semibold">0 Active</p>
                        </div>
                     </div>
                </div>

                {/* Features */}
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
                 <div className="grid md:grid-cols-3 gap-4">
                    <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Info className="w-6 h-6 text-blue-500" />
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-200">Benefit Guide</span>
                    </button>
                    <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Smartphone className="w-6 h-6 text-purple-500" />
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-200">Digital ID Card</span>
                    </button>
                     <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-medium text-sm text-gray-700 dark:text-gray-200">Network Hospitals</span>
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default Insurance;
