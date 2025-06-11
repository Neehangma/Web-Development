
import React, { useState } from "react";
import "../css/signup.css";


const signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    acceptedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="signup-container">
  <h2>Create Account</h2>
  <p>Enter your details below</p>
  <form onSubmit={handleSubmit}>
    <input type="text" name="username" className="input-field" placeholder="Enter Username" />
    <input type="email" name="email" className="input-field" placeholder="Enter Email" />
    <input type="tel" name="phone" className="input-field" placeholder="Enter Phone Number" />
    <input type="password" name="password" className="input-field" placeholder="Enter Password" />
    <div className="checkbox-container">
      <input type="checkbox" name="acceptedTerms" />
      <label>Accept Terms and Conditions</label>
    </div>
    <button type="submit" className="signup-btn">Sign Up</button>
  </form>
  <div className="extra-links">
    <a href="/login">Already have an account? Sign In</a>
  </div>
</div>

  );
};

export default signup;