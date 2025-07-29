const express = require('express');
const router = express.Router();
const {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  getPopularRoutes
} = require('../controllers/routeController');
const { auth, adminAuth } = require('../middleware/auth');
const { validateRoute, validateMongoId } = require('../middleware/validation');

// @route   GET /api/routes
// @desc    Get all routes
// @access  Public
router.get('/', getAllRoutes);

// @route   GET /api/routes/popular
// @desc    Get popular routes
// @access  Public
router.get('/popular', getPopularRoutes);

// @route   GET /api/routes/:id
// @desc    Get route by ID
// @access  Public
router.get('/:id', validateMongoId('id'), getRouteById);

// @route   POST /api/routes
// @desc    Create new route
// @access  Private (Admin)
router.post('/', adminAuth, validateRoute, createRoute);

// @route   PUT /api/routes/:id
// @desc    Update route
// @access  Private (Admin)
router.put('/:id', adminAuth, validateMongoId('id'), validateRoute, updateRoute);

// @route   DELETE /api/routes/:id
// @desc    Delete route
// @access  Private (Admin)
router.delete('/:id', adminAuth, validateMongoId('id'), deleteRoute);

module.exports = router;