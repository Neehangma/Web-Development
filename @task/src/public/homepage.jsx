// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h1>Welcome to the Homepage</h1>
//       <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>
//         Login
//       </button>
//       <button onClick={() => navigate('/signup')}>
//         Signup
//       </button>
//     </div>
//   );
// };

// export default Homepage;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css"; 



const Homepage = () => {
  const navigate = useNavigate();

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <div className="text-center bg-white p-8 rounded-lg shadow-lg w-96">
    //     <h1 className="text-3xl font-semibold mb-6">Welcome to Our Website</h1>
    //     <p className="text-gray-600 mb-6">Explore our features and get started!</p>
    //     <div className="flex flex-col gap-4">
    //       <button
    //         onClick={() => navigate("/login")}
    //         className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    //       >
    //         Login
    //       </button>
    //       <button
    //         onClick={() => navigate("/signup")}
    //         className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    //       >
    //         Signup
    //       </button>
          
    //     </div>
    //   </div>
    // </div>
    <div className="home-container">
  <h1>BUSBUDDY</h1>

  <p>Explore our features and get started!</p>
  <div className="button-container">
    <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
    <button className="signup-btn" onClick={() => navigate("/signup")}>Signup</button>
  </div>
</div>

  );
};

export default Homepage;