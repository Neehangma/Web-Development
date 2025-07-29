const express = require('express');
const router = express.Router();
const {
  registerController,
  checkEmailExists,
  checkPhoneExists
} = require('../controllers/registerController');
const { validateRegistration } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Rate limiting for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registration attempts per hour
  message: {
    success: false,
    message: 'Too many registration attempts, please try again after 1 hour'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// @route   POST /api/register
// @desc    Register a new user
// @access  Public
router.post('/', registerLimiter, validateRegistration, registerController);

// @route   GET /api/register/check-email/:email
// @desc    Check if email already exists
// @access  Public
router.get('/check-email/:email', checkEmailExists);

// @route   GET /api/register/check-phone/:phone
// @desc    Check if phone number already exists
// @access  Public
router.get('/check-phone/:phone', checkPhoneExists);

// @route   POST /api/register/verify-email
// @desc    Verify email address with token
// @access  Public
router.post('/verify-email', (req, res) => {
  // TODO: Implement email verification
  res.status(501).json({
    success: false,
    message: 'Email verification functionality not implemented yet'
  });
});

// @route   POST /api/register/resend-verification
// @desc    Resend email verification
// @access  Public
router.post('/resend-verification', (req, res) => {
  // TODO: Implement resend verification
  res.status(501).json({
    success: false,
    message: 'Resend verification functionality not implemented yet'
  });
});

module.exports = router;