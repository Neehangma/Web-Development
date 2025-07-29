const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate
} = require('../middleware/validation');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, validateProfileUpdate, updateProfile);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, logout);

// @route   GET /api/auth/verify-token
// @desc    Verify if token is valid
// @access  Private
router.get('/verify-token', auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      user: req.user
    }
  });
});

module.exports = router;