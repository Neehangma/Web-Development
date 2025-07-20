import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bus, User, LogOut, ChevronDown, UserPlus, LogIn } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowDropdown(false);
    setShowDropdown2(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <Bus className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-white">BusBuddy</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
              About
            </button>
            <button className="text-white hover:text-blue-400 transition-colors">
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
              <div className="flex items-center space-x-3">
                {/* Register Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 border border-blue-400 text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 px-4 py-2 rounded-full font-semibold shadow-sm transition-colors duration-200 bg-transparent"
                  >
                    <UserPlus className="h-4 w-4 text-blue-400" />
                    <span>Register</span>
                    <ChevronDown className="h-4 w-4 text-blue-400" />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border">
                      <button
                        onClick={() => handleNavigation('/passenger/register')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <UserPlus className="h-4 w-4 inline mr-2" />
                        Passenger Register
                      </button>
                    </div>
                  )}
                </div>

                {/* Login Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown2(!showDropdown2)}
                    className="flex items-center space-x-2 border border-blue-400 text-white hover:bg-blue-500 hover:text-white hover:border-blue-500 px-4 py-2 rounded-full font-semibold shadow-sm transition-colors duration-200 bg-transparent"
                  >
                    <LogIn className="h-4 w-4 text-blue-400" />
                    <span>Login</span>
                    <ChevronDown className="h-4 w-4 text-blue-400" />
                  </button>

                  {showDropdown2 && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border">
                      <button
                        onClick={() => handleNavigation('/passenger/login')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogIn className="h-4 w-4 inline mr-2" />
                        Passenger Login
                      </button>
                      <hr className="my-1" />
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-gray-800 px-4 py-2">
        <nav className="flex justify-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-blue-400 transition-colors text-sm"
          >
            Home
          </button>
          <button className="text-white hover:text-blue-400 transition-colors text-sm">
            About
          </button>
          <button className="text-white hover:text-blue-400 transition-colors text-sm">
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;