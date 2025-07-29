import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Bus } from 'lucide-react';
import Layout from '../layout/Layout';
import registerBusBg from '../../assets/images/Register.jpg';

const PassengerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const success = await register(formData.name, formData.email, formData.password);
    
      if (success) {
        navigate('/passenger/login');
      } else {
        setError('Email already exists. Please use a different email address.');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background image with dark overlays */}
        <img
          src={registerBusBg}
          alt="Register Background"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-100 -z-20 transition-all duration-700"
          draggable="false"
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative z-10 ring-1 ring-white/40">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Bus className="h-12 w-12 text-green-400 drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Create Account</h2>
            <p className="text-blue-100 mt-2 drop-shadow">Join us to book your bus tickets</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative mb-2">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
                required
                placeholder="Full Name"
                autoComplete="off"
              />
              <label htmlFor="name" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Full Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative mb-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
                required
                placeholder="Email Address"
                autoComplete="off"
              />
              <label htmlFor="email" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Email Address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative mb-2">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
                required
                placeholder="Password"
                autoComplete="off"
              />
              <label htmlFor="password" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Password
              </label>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-2">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
                required
                placeholder="Confirm Password"
                autoComplete="off"
              />
              <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Confirm Password
              </label>
            </div>

            {error && (
              <div className="bg-red-600/90 border border-red-300 text-white px-4 py-3 rounded shadow">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-100">
              Already have an account?{' '}
              <Link to="/passenger/login" className="text-green-300 hover:text-green-400 font-semibold underline">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-200 hover:text-blue-400 text-sm underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PassengerRegister;