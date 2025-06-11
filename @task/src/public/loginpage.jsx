// import React from 'react';

// const LoginPage = () => {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h2>Login Page</h2>
//       <p>This is where your login form will go.</p>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Email and password are required!");
      return;
    }
    console.log("Login successful!", formData);
    navigate("/homepage");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="input-field"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="input-field"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="extra-links">
        <a href="#">Forgot Password?</a> | <a href="/signup">Create Account</a>
      </div>
    </div>
  );
};

export default LoginPage;
