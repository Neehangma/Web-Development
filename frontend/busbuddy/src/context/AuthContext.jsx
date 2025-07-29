import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    try {
      setLoading(true);
      
      if (userType === 'admin') {
        // Admin login logic
        const adminUsers = [
          { id: 'admin-1', email: 'admin@busbuddy.com', password: 'admin123', name: 'Admin User', type: 'admin' },
          { id: 'admin-2', email: 'operator@busbuddy.com', password: 'operator123', name: 'Bus Operator', type: 'admin' }
        ];
        
        const admin = adminUsers.find(a => a.email === email && a.password === password);
        if (admin) {
          const userData = { ...admin };
          delete userData.password;
          setUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          return true;
        }
      } else {
        // Passenger login logic
        const passengers = JSON.parse(localStorage.getItem('passengers') || '[]');
        const passenger = passengers.find(p => p.email === email && p.password === password);
        
        if (passenger) {
          const userData = { 
            id: passenger.id, 
            email: passenger.email, 
            name: passenger.name, 
            type: 'passenger' 
          };
          setUser(userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      
      // Check if user already exists
      const passengers = JSON.parse(localStorage.getItem('passengers') || '[]');
      const existingUser = passengers.find(p => p.email === email);
      
      if (existingUser) {
        return false;
      }
      
      // Create new passenger
      const newPassenger = {
        id: `passenger-${Date.now()}`,
        name,
        email,
        password,
        type: 'passenger',
        createdAt: new Date().toISOString()
      };
      
      const updatedPassengers = [...passengers, newPassenger];
      localStorage.setItem('passengers', JSON.stringify(updatedPassengers));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};