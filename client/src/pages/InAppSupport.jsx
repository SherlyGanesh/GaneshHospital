import React from 'react';
import { HelpCircle } from 'lucide-react';

const InAppSupport = () => {
    return (
        <div className="p-6">
            <div className="card">
                <div className='flex items-center gap-4 mb-6'>
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-500">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                            In-App Support
                        </h1>
                         <p className="text-sm text-gray-500 dark:text-gray-400">Get help and support anytime</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Need assistance? Our support team is here to help you 24/7.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Chat with Us</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start a live chat with a support agent.</p>
                        </div>
                         <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100">FAQs</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Browse frequently asked questions.</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Send us a message</label>
                        <textarea 
                            rows="4"
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Describe your issue..."
                        ></textarea>
                        <button className="mt-3 btn-primary">
                            Submit Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InAppSupport;
