import React from 'react';
import { Bell } from 'lucide-react';

const Notifications = () => {
    return (
        <div className="p-6">
            <div className="card">
                <div className='flex items-center gap-4 mb-6'>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500">
                        <Bell className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            Notifications
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Stay updated with your appointments and health tips</p>
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                        <h3 className="font-semibold text-blue-800 dark:text-blue-300">Welcome to Ganesh Hospital!</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">We are glad to have you here. Complete your profile to get the best experience.</p>
                        <p className="text-xs text-blue-400 dark:text-blue-500 mt-2">Just now</p>
                    </div>
                     <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400 text-center text-sm">No other new notifications.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
