import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import forgotBg from '../../assets/images/forgotpassword.jpg'; // Ensure this path is correct
import Layout from '../layout/Layout';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (!email.trim()) {
      setMessage("Please enter your email.");
      setLoading(false);
      return;
    }
    if (newPassword.length < 4) {
      setMessage("Password must be at least 4 characters.");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      setMessage("No user found with that email.");
      setLoading(false);
      return;
    }

    // Update password and save
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    setLoading(false);

    // Redirect to login with success message flag
    navigate('/passenger/login', { state: { passwordResetSuccess: true } });
  };

  return (
    <Layout>
      <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <img
          src={forgotBg}
          alt="Forgot Password Background"
          className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-100 -z-20 transition-all duration-700"
          draggable="false"
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative z-10 ring-1 ring-white/40">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Forgot Password</h2>
            <p className="text-blue-100 mt-2 drop-shadow">
              Enter your email and set a new password
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="email"
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
              />
              <label htmlFor="email" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                required
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                autoComplete="new-password"
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
              />
              <label htmlFor="newPassword" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                New Password
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
              />
              <label htmlFor="confirmPassword" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                bg-transparent px-1">
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 flex items-center justify-center disabled:opacity-50 ring-2 ring-blue-300/40"
            >
              {loading ? "Saving..." : "Save New Password"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-blue-100 font-medium">
              {message}
            </p>
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-blue-200 hover:text-blue-400 text-sm underline"
              onClick={() => navigate('/passenger/login')}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
