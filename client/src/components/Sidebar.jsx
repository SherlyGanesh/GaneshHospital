import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Heart,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  Bell,
  HelpCircle,
  Pill,
  Ambulance,
  User,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Layers,
  Lock,
  AlertTriangle,
  Activity,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed = false, setIsCollapsed = () => {} }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const isUser = user?.role === 'User';
  const isAdmin = user?.role === 'Admin' || user?.role === 'Administrator';
  const isDoctor = user?.role === 'Doctor';

  const menuGroups = [
    {
        title: 'Main',
        items: [
            { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            ...(isDoctor ? [
                { path: '/appointments', icon: Calendar, label: 'My Appointments' },
                { path: '/patients', icon: Users, label: 'My Patients' },
                { path: '/prescriptions', icon: Pill, label: 'Prescriptions' },
            ] : !isUser ? [
                { path: '/patients', icon: Users, label: 'Patients' },
                { path: '/appointments', icon: Calendar, label: 'Appointments' },
            ] : [
                { path: '/appointments', icon: Calendar, label: 'Appointments' },
                { path: '/prescriptions', icon: Pill, label: 'Prescriptions' },
            ])
        ]
    },
    ...(isDoctor ? [
        {
            title: 'Clinical',
            items: [
                { path: '/medical-reports', icon: FileText, label: 'Medical Reports' },
                { path: '/availability', icon: Clock, label: 'Availability Schedule' },
                { path: '/emergency-alerts', icon: AlertTriangle, label: 'Emergency Alerts' },
            ]
        },
        {
            title: 'Workspace',
            items: [
                { path: '/messages', icon: Bell, label: 'Messages / Notes' },
                { path: '/profile', icon: User, label: 'Profile Settings' },
            ]
        }
    ] : []),
    ...(isAdmin ? [
        {
            title: 'Management',
            items: [
                { path: '/admin/users', icon: Users, label: 'User Management' },
                { path: '/admin/doctors', icon: Activity, label: 'Doctor Management', customIcon: Heart }, // Fallback to Heart if Activity not imported
                { path: '/admin/departments', icon: Layers, label: 'Departments' },
            ]
        },
        {
            title: 'Financials',
            items: [
                { path: '/admin/billing', icon: CreditCard, label: 'Billing & Payments' },
            ]
        },
        {
            title: 'System',
            items: [
                { path: '/admin/analytics', icon: BarChart3, label: 'Reports & Analytics' },
                { path: '/admin/emergency', icon: AlertTriangle, label: 'Emergency Cases' },
                { path: '/admin/settings', icon: Settings, label: 'System Settings' },
                { path: '/admin/roles', icon: Lock, label: 'Roles & Permissions' },
            ]
        }
    ] : []),
    ...(isUser ? [
         {
            title: 'Services',
            items: [
                { path: '/billing', icon: CreditCard, label: 'Billing' },
                { path: '/notifications', icon: Bell, label: 'Notifications' },
            ]
        },
        {
            title: 'Support',
            items: [
                { path: '/emergency', icon: Ambulance, label: 'Emergency Help' },
                { path: '/support', icon: HelpCircle, label: 'Support' },
                { path: '/profile', icon: User, label: 'My Profile' },
            ]
        }
    ] : [])
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? 'bg-gradient-to-r from-primary-500 to-accent text-white shadow-lg shadow-primary-500/30'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        } ${isCollapsed ? 'justify-center px-0 w-12 mx-auto' : ''}`
      }
      title={isCollapsed ? item.label : ''}
    >
        {({ isActive }) => {
            const Icon = item.icon;
            return (
                <>
                    {isActive && !isCollapsed && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'animate-pulse' : ''}`} />
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                    {isActive && isCollapsed && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full" />
                    )}
                </>
            );
        }}
    </NavLink>
  );

  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen fixed left-0 top-0 transition-all duration-300 flex flex-col z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo Section */}
      <div className={`p-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 ${isCollapsed ? 'px-4' : ''}`}>
        <div className="flex items-center gap-3 relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Heart className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent whitespace-nowrap">
                Ganesh Hospital
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">Patient Care</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md z-10 hover:text-primary-500 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation Scroll Area */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
        {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
                {!isCollapsed && (
                    <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                        {group.title}
                    </p>
                )}
                {isCollapsed && <div className="h-px bg-gray-100 dark:bg-gray-800 mx-2 mb-4" />}
                <div className="space-y-1">
                    {group.items.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </div>
            </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0 bg-gray-50/50 dark:bg-gray-900/50">
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to logout?')) {
              logout();
              navigate('/login');
            }
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-300 w-full group ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
