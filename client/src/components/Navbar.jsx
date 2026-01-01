import { Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useHospital } from '../context/HospitalContext';
import { useState } from 'react';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { notifications, markNotificationRead, clearNotifications } = useHospital();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => {
    if (n.read) return false;
    
    // Admin/Administrator sees 'Admin' or 'All' messages
    if (user?.role === 'Admin' || user?.role === 'Administrator') {
        return n.recipientRole === 'Admin' || n.recipientRole === 'All';
    }
    
    // Doctor sees 'Doctor' or 'All' messages (Name check removed for demo flexibility)
    if (user?.role === 'Doctor') {
        return n.recipientRole === 'Doctor' || n.recipientRole === 'All';
    }

    // Patient sees 'Patient' or 'All' messages (Relaxed for demo)
    return n.recipientRole === 'Patient' || n.recipientRole === 'All';
  }).length;

  const filteredNotifications = notifications.filter(n => {
      if (user?.role === 'Admin' || user?.role === 'Administrator') {
          return n.recipientRole === 'Admin' || n.recipientRole === 'All';
      }
      if (user?.role === 'Doctor') {
          return n.recipientRole === 'Doctor' || n.recipientRole === 'All';
      }
      return n.recipientRole === 'Patient' || n.recipientRole === 'All';
  });

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 ml-64 transition-colors duration-300">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        {/* Spacer to push content to right */}
        <div className="flex-1"></div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
                  {notifications.length > 0 && (
                    <button 
                      onClick={clearNotifications}
                      className="text-xs text-primary-500 hover:text-primary-600"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                      No notifications
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div 
                        key={notification._id || notification.id}
                        onClick={() => markNotificationRead(notification._id || notification.id)}
                        className={`p-4 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-1 whitespace-pre-wrap">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent text-white shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {user?.name || 'Guest User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role || 'Guest'}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'G'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
