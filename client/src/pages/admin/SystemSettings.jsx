import { useState } from 'react';
import { Settings, Hospital, Clock, CreditCard, Bell, Palette, Save, ArrowRight } from 'lucide-react';

const SystemSettings = () => {
    const [activeTab, setActiveTab] = useState('hospital');

    const tabs = [
        { id: 'hospital', label: 'Hospital Info', icon: Hospital },
        { id: 'hours', label: 'Working Hours', icon: Clock },
        { id: 'payment', label: 'Payment Gateway', icon: CreditCard },
        { id: 'notifications', label: 'Email/SMS', icon: Bell },
        { id: 'appearance', label: 'Theme Controls', icon: Palette },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="card">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 italic">System Settings</h1>
                        <p className="text-sm text-gray-500 italic">Configure hospital parameters, integrations, and look & feel.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Tabs Sidebar */}
                    <div className="lg:w-64 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <tab.icon className="w-5 h-5" />
                                    <span className="font-semibold text-sm italic">{tab.label}</span>
                                </div>
                                {activeTab === tab.id && <ArrowRight className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 italic">
                        {activeTab === 'hospital' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">General Hospital Information</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase italic">Hospital Name</label>
                                        <input type="text" defaultValue="Ganesh Hospital" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary-500 font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase italic">Registration No.</label>
                                        <input type="text" defaultValue="GH-2025-IND" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary-500 font-bold" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase italic">Primary Address</label>
                                        <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary-500 font-bold">123 Health Ave, Medical District, City-400101, India</textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hours' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">Department Working Hours</h3>
                                <div className="space-y-4">
                                    {['OPD', 'Emergency', 'Laboratory', 'Pharmacy'].map(dept => (
                                        <div key={dept} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                                            <span className="font-bold text-gray-700 dark:text-gray-200">{dept}</span>
                                            <div className="flex gap-4">
                                                <input type="time" defaultValue="09:00" className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold outline-none" />
                                                <span className="text-gray-400">to</span>
                                                <input type="time" defaultValue="18:00" className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold outline-none" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">Payment Gateways</h3>
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border-l-4 border-blue-600">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-[10px] text-white">Stripe</div>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">Stripe Integration</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-2 py-1 rounded">Connected</span>
                                     </div>
                                     <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border-l-4 border-purple-600">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-purple-600 rounded flex items-center justify-center font-bold text-[10px] text-white">Razor</div>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">Razorpay API</span>
                                        </div>
                                        <button className="text-[10px] font-bold text-primary-500 uppercase tracking-widest hover:underline">Connect Now</button>
                                     </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">Email & SMS Templates</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase italic">Appointment Confirmation</label>
                                        <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm font-medium" defaultValue="Dear {patient_name}, your appointment with {doctor_name} is confirmed for {date} at {time}." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase italic">Emergency Alert Message</label>
                                        <textarea rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 outline-none text-sm font-medium" defaultValue="CRITICAL: Emergency case reported at {location}. {patient_id} requires immediate attention." />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 italic">Interface & Branding</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-primary-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-3">Primary Color</p>
                                        <div className="flex gap-2">
                                            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                                                <div key={color} className="w-6 h-6 rounded-full cursor-pointer shadow-inner" style={{ backgroundColor: color }} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-3">Sidebar Style</p>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-gray-900 rounded shadow-lg" />
                                            <div className="w-8 h-8 bg-white border border-gray-200 rounded" />
                                            <div className="w-8 h-8 bg-primary-600 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button className="flex items-center gap-2 bg-primary-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20 italic transform active:scale-95">
                                <Save className="w-5 h-5" /> Save Configuration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;
