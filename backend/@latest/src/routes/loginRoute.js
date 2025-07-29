const express = require('express');
const router = express.Router();
const { loginController, adminLogin } = require('../controllers/loginController');
const { validateLogin } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// @route   POST /api/login
// @desc    User login
// @access  Public
router.post('/', loginLimiter, validateLogin, loginController);

// @route   POST /api/login/admin
// @desc    Admin/Operator login
// @access  Public
router.post('/admin', loginLimiter, validateLogin, adminLogin);

// @route   POST /api/login/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', (req, res) => {
  // TODO: Implement password reset functionality
  res.status(501).json({
    success: false,
    message: 'Password reset functionality not implemented yet'
  });
});

// @route   POST /api/login/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', (req, res) => {
  // TODO: Implement password reset functionality
  res.status(501).json({
    success: false,
    message: 'Password reset functionality not implemented yet'
  });
});

module.exports = router;