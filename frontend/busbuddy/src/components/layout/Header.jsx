import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Bus, User, LogOut, ChevronDown, UserPlus, LogIn } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <Bus className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">BusBook</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </button>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border">
                    <button
                      onClick={() => handleNavigation(user.type === 'admin' ? '/admin/dashboard' : '/passenger/dashboard')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    {user.type === 'passenger' && (
                      <button
                        onClick={() => handleNavigation('/passenger/profile')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <span>Login / Register</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Passenger
                    </div>
                    <button
                      onClick={() => handleNavigation('/passenger/register')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Register
                    </button>
                    <button
                      onClick={() => handleNavigation('/passenger/login')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="h-4 w-4 inline mr-2" />
                      Login
                    </button>
                    
                    <hr className="my-1" />
                    
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Admin
                    </div>
                    <button
                      onClick={() => handleNavigation('/admin/login')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="h-4 w-4 inline mr-2" />
                      Admin Login
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-gray-50 px-4 py-2">
        <nav className="flex justify-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
          >
            Home
          </button>
          <button className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
            About
          </button>
          <button className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;