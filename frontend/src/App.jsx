// import React from 'react';
// import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
// import AttendanceDashboard from './pages/Dashboard/AttendanceDashboard';
// import './index.css';

// function App() {
//   return (
//     <ErrorBoundary>
//       <AttendanceDashboard />
//     </ErrorBoundary>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import Login from './components/UserAuth/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/UserAuth/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import ForgotPassword from './components/UserAuth/ForgotPassword';
import VerifyOTP from './components/UserAuth/verifyOTP';
import ResetPassword from './components/UserAuth/ResetPassword';
import Register from './components/UserAuth/Register';
import PrivacyPolicy from './pages/Dashboard/PrivacyPolicy';
import TermsOfService from './pages/Dashboard/TermsOfService';
import AttendanceDashboard from './pages/Dashboard/AttendanceDashboard';
// import NotPermitted from './pages/NotPermitted';
import './index.css';

// Role-based redirect component
const RoleBasedDashboard = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to role-specific dashboard
  switch(user?.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'hr':
      return <Navigate to="/hr/dashboard" replace />;
    case 'manager':
      return <Navigate to="/manager/dashboard" replace />;
    case 'employee':
      return <Navigate to="/employee/dashboard" replace />;
    default:
      return <Navigate to="/employee/dashboard" replace />;
  }
};

// Role-specific dashboard components
const AdminDashboard = () => <Dashboard role="admin" />;
const HRDashboard = () => <Dashboard role="hr" />;
const ManagerDashboard = () => <Dashboard role="manager" />;
const EmployeeDashboard = () => <Dashboard role="employee" />;

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* <Route path="/error" element={<NotPermitted />} /> */}
          
          {/* Public attendance dashboard (if needed) */}
          <Route path="/attendance" element={<AttendanceDashboard />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <RoleBasedDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/hr/dashboard" 
            element={
              <ProtectedRoute requiredRole="hr">
                <HRDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/manager/dashboard" 
            element={
              <ProtectedRoute requiredRole="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/employee/dashboard" 
            element={
              <ProtectedRoute requiredRole="employee">
                <AttendanceDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Root route - redirect based on auth status */}
          <Route 
            path="/" 
            element={
              <Navigate to="/dashboard" replace />
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;