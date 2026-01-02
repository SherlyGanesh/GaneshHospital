import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalProvider } from './context/HospitalContext';
import { ToastProvider } from './context/ToastContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import BloodBank from './pages/BloodBank';
import Insurance from './pages/Insurance';
import Billing from './pages/Billing';
import Notifications from './pages/Notifications';
import InAppSupport from './pages/InAppSupport';
import Profile from './pages/Profile';
import Prescriptions from './pages/Prescriptions';
import Emergency from './pages/Emergency';
import UserManagement from './pages/admin/UserManagement';
import DoctorManagement from './pages/admin/DoctorManagement';
import DepartmentManagement from './pages/admin/DepartmentManagement';
import BillingManagement from './pages/admin/BillingManagement';
import InsuranceClaims from './pages/admin/InsuranceClaims';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import EmergencyCases from './pages/admin/EmergencyCases';
import SystemSettings from './pages/admin/SystemSettings';
import RolePermissions from './pages/admin/RolePermissions';
import MedicalReports from './pages/MedicalReports';
import Availability from './pages/Availability';
import EmergencyAlerts from './pages/EmergencyAlerts';
import Messages from './pages/Messages';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Special case for Admin/Administrator alias
    const isAdminAlias = allowedRoles.includes('Admin') && user?.role === 'Administrator';
    if (!isAdminAlias) return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 transition-all duration-300">
        <Navbar />
        <main className={`min-h-screen p-4 md:p-6 lg:p-8 ml-20 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'} transition-all duration-300`}>
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
           <HospitalProvider>
            <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Patients />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Appointments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blood-bank"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <BloodBank />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Billing />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Notifications />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <InAppSupport />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/prescriptions"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Prescriptions />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Emergency />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/medical-reports"
              element={
                <ProtectedRoute allowedRoles={['Doctor', 'Admin', 'User']}>
                  <DashboardLayout>
                    <MedicalReports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/availability"
              element={
                <ProtectedRoute allowedRoles={['Doctor', 'Admin']}>
                  <DashboardLayout>
                    <Availability />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency-alerts"
              element={
                <ProtectedRoute allowedRoles={['Doctor', 'Admin']}>
                  <DashboardLayout>
                    <EmergencyAlerts />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute allowedRoles={['Doctor', 'Admin', 'User']}>
                  <DashboardLayout>
                    <Messages />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <DashboardLayout>
                    <UserManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <DashboardLayout>
                    <DoctorManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <DepartmentManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/billing"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <BillingManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <AdminAnalytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/emergency"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <EmergencyCases />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <SystemSettings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/roles"
              element={
                <ProtectedRoute allowedRoles={['Admin', 'Administrator']}>
                  <DashboardLayout>
                    <RolePermissions />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
          </HospitalProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
