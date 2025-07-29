const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateBooking, validateMongoId } = require('../middleware/validation');

// @route   GET /api/bookings
// @desc    Get all bookings (Admin only)
// @access  Private (Admin)
router.get('/', adminAuth, getAllBookings);

// @route   GET /api/bookings/user
// @desc    Get current user's bookings
// @access  Private
router.get('/user', auth, getUserBookings);

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', auth, validateMongoId('id'), getBookingById);

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', auth, validateBooking, createBooking);

// @route   PUT /api/bookings/:id
// @desc    Update booking
// @access  Private
router.put('/:id', auth, validateMongoId('id'), updateBooking);

// @route   DELETE /api/bookings/:id/cancel
// @desc    Cancel booking
// @access  Private
router.delete('/:id/cancel', auth, validateMongoId('id'), cancelBooking);

module.exports = router;