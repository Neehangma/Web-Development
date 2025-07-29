const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const { validationResult } = require('express-validator');

// Create new booking
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { busId, routeId, seatNumbers, travelDate } = req.body;

    // Check if bus exists and has available seats
    const bus = await Bus.findById(busId).populate('route');
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    if (bus.availableSeats < seatNumbers.length) {
      return res.status(400).json({
        success: false,
        message: 'Not enough available seats'
      });
    }

    // Check if seats are already booked for the travel date
    const existingBooking = await Booking.findOne({
      bus: busId,
      travelDate: new Date(travelDate),
      seatNumbers: { $in: seatNumbers },
      status: { $in: ['confirmed', 'pending'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'One or more selected seats are already booked'
      });
    }

    // Calculate pricing
    const basePrice = bus.pricePerSeat * seatNumbers.length;
    const taxes = Math.round(basePrice * 0.05); // 5% tax
    const totalAmount = basePrice + taxes;

    const bookingData = {
      ...req.body,
      user: req.user.userId,
      pricing: {
        basePrice,
        taxes,
        discount: 0,
        totalAmount
      }
    };

    const booking = new Booking(bookingData);
    await booking.save();

    // Update bus available seats
    bus.availableSeats -= seatNumbers.length;
    await bus.save();

    await booking.populate('user bus route');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { user: req.user.userId };
    if (status) query.status = status;

    const bookings = await Booking.find(query)
      .populate('bus', 'busNumber busName busType')
      .populate('route', 'origin destination formattedName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        bookings,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('bus')
      .populate('route');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.userId && req.user.userType !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking retrieved successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow updates to certain fields
    const allowedUpdates = ['contactDetails', 'specialRequests', 'boardingPoint', 'droppingPoint'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({
        success: false,
        message: 'Invalid updates'
      });
    }

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        booking[key] = req.body[key];
      }
    });

    await booking.save();
    await booking.populate('user bus route');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: { booking }
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bus');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Check if booking can be cancelled (e.g., not within 2 hours of travel)
    const travelTime = new Date(booking.travelDate).getTime();
    const currentTime = Date.now();
    const timeDifference = travelTime - currentTime;
    const twoHours = 2 * 60 * 60 * 1000;

    if (timeDifference < twoHours) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel booking within 2 hours of travel time'
      });
    }

    // Calculate refund amount (e.g., 90% of total amount)
    const refundAmount = Math.round(booking.pricing.totalAmount * 0.9);

    // Update booking status
    booking.status = 'cancelled';
    booking.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: req.user.userId,
      reason: req.body.reason || 'Cancelled by user',
      refundAmount,
      refundStatus: 'pending'
    };

    await booking.save();

    // Update bus available seats
    const bus = booking.bus;
    bus.availableSeats += booking.seatNumbers.length;
    await bus.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: { 
        booking,
        refundAmount
      }
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, busId, userId } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (busId) query.bus = busId;
    if (userId) query.user = userId;

    const bookings = await Booking.find(query)
      .populate('user', 'firstName lastName email phone')
      .populate('bus', 'busNumber busName busType')
      .populate('route', 'origin destination formattedName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'All bookings retrieved successfully',
      data: {
        bookings,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getAllBookings
};