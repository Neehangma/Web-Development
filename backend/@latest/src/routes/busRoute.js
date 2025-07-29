const express = require('express');
const router = express.Router();
const {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  searchBuses,
  getBusesByRoute
} = require('../controllers/busController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateBus, validateMongoId } = require('../middleware/validation');

// @route   GET /api/buses
// @desc    Get all buses
// @access  Public
router.get('/', getAllBuses);

// @route   GET /api/buses/search
// @desc    Search buses
// @access  Public
router.get('/search', searchBuses);

// @route   GET /api/buses/route/:routeId
// @desc    Get buses by route
// @access  Public
router.get('/route/:routeId', validateMongoId('routeId'), getBusesByRoute);

// @route   GET /api/buses/:id
// @desc    Get bus by ID
// @access  Public
router.get('/:id', validateMongoId('id'), getBusById);

// @route   POST /api/buses
// @desc    Create new bus
// @access  Private (Admin/Operator)
router.post('/', adminAuth, validateBus, createBus);

// @route   PUT /api/buses/:id
// @desc    Update bus
// @access  Private (Admin/Operator)
router.put('/:id', adminAuth, validateMongoId('id'), validateBus, updateBus);

// @route   DELETE /api/buses/:id
// @desc    Delete bus
// @access  Private (Admin)
router.delete('/:id', adminAuth, validateMongoId('id'), deleteBus);

module.exports = router;