import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './components/Home';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PassengerRegister from './components/passenger/PassengerRegister';
import PassengerLogin from './components/passenger/PassengerLogin';
import PassengerDashboard from './components/passenger/PassengerDashboard';
import PassengerProfile from './components/passenger/PassengerProfile';
import ForgotPassword from './components/passenger/ForgotPassword';

// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (user.type !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Redirect if already authenticated
const AuthRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    if (user.type === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/passenger/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={
                <AuthRoute>
                  <AdminLogin />
                </AuthRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Passenger Routes */}
            <Route 
              path="/passenger/register" 
              element={
                <AuthRoute>
                  <PassengerRegister />
                </AuthRoute>
              } 
            />
            <Route 
              path="/passenger/login" 
              element={
                <AuthRoute>
                  <PassengerLogin />
                </AuthRoute>
              } 
            />
            <Route
              path="/passenger/forgot-password"
              element={<ForgotPassword />}
            />
            <Route 
              path="/passenger/dashboard" 
              element={
                <ProtectedRoute userType="passenger">
                  <PassengerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/passenger/profile" 
              element={
                <ProtectedRoute userType="passenger">
                  <PassengerProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;