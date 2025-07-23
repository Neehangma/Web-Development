import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Bus } from 'lucide-react';
import Layout from '../layout/Layout';
import loginBg from '../../assets/images/login.jpg';

const PassengerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password, 'passenger');
    
    if (success) {
      navigate('/passenger/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        {/* Background image with dark overlay */}
        <img
          src={loginBg}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-100 -z-20 transition-all duration-700"
          draggable="false"
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative z-10 ring-1 ring-white/40">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Bus className="h-12 w-12 text-green-400 drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Passenger Login</h2>
            <p className="text-blue-100 mt-2 drop-shadow">Access your booking dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative mb-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {error && (
              <div className="bg-red-600/90 border border-red-300 text-white px-4 py-3 rounded shadow">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 flex items-center justify-center disabled:opacity-50 ring-2 ring-blue-300/40"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </>
              )}
            </button>
            <div className="mt-2 text-right">
              <Link
                to="/passenger/forgot-password"
                className="text-blue-200 hover:text-blue-400 text-sm underline"
              >
                Forgot Password ?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-100">
              Don't have an account?{' '}
              <Link to="/passenger/register" className="text-green-300 hover:text-green-400 font-semibold underline">
                Create one
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

export default PassengerLogin;