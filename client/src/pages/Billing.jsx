import { CreditCard, Download, ExternalLink } from 'lucide-react';

const Billing = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className='flex items-center gap-4 mb-6'>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Billing & Payments
                        </h1>
                         <p className="text-sm text-gray-500 dark:text-gray-400">View and pay your medical bills</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                     <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white shadow-xl">
                        <p className="text-gray-400 text-sm mb-1">Total Due</p>
                        <h2 className="text-4xl font-bold mb-6">₹150.00</h2>
                        <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                            Pay Now
                        </button>
                     </div>
                     <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Payment Methods</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
                                <div className="w-10 h-6 bg-blue-600 rounded"></div>
                                <div>
                                    <p className="font-semibold text-sm">Visa ending in 4242</p>
                                    <p className="text-xs text-gray-500">Expires 12/28</p>
                                </div>
                            </div>
                            <button className="text-sm text-primary-500 font-semibold hover:text-primary-600 px-2">+ Add New Card</button>
                        </div>
                     </div>
                </div>

                <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-4">Recent Invoices</h3>
                <div className="space-y-3">
                     <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Consultation Fee - Dr. Smith</p>
                                <p className="text-xs text-gray-500">Due Dec 05, 2025</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <span className="font-bold text-gray-800 dark:text-gray-200">₹150.00</span>
                             <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending</span>
                             <button className="p-2 text-gray-400 hover:text-primary-500">
                                 <Download className="w-4 h-4" />
                             </button>
                        </div>
                     </div>

                      <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-75">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-200 text-gray-600 rounded-lg">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Blood Test Report</p>
                                <p className="text-xs text-gray-500">Paid Nov 02, 2025</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <span className="font-bold text-gray-800 dark:text-gray-200">₹50.00</span>
                             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Paid</span>
                             <button className="p-2 text-gray-400 hover:text-primary-500">
                                 <Download className="w-4 h-4" />
                             </button>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
import { FileText } from 'lucide-react';
export default Billing;
