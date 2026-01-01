import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const addToast = useCallback((message, type = 'info') => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
                {toasts.map(toast => (
                    <div 
                        key={toast.id}
                        className={`pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-sm p-4 rounded-xl shadow-lg border-l-4 transition-all duration-300 transform translate-x-0 ${
                            toast.type === 'success' ? 'bg-white dark:bg-gray-800 border-green-500 text-gray-800 dark:text-gray-100' :
                            toast.type === 'error' ? 'bg-white dark:bg-gray-800 border-red-500 text-gray-800 dark:text-gray-100' :
                            toast.type === 'warning' ? 'bg-white dark:bg-gray-800 border-yellow-500 text-gray-800 dark:text-gray-100' :
                            'bg-white dark:bg-gray-800 border-blue-500 text-gray-800 dark:text-gray-100'
                        }`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">{toast.message}</p>
                        </div>
                        <button 
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
