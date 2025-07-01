import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './public/homepage';
import LoginPage from './public/loginpage';
import Signup from './public/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;