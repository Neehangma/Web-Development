const Route = require('../models/Route');
const { validationResult } = require('express-validator');

// Create new route
const createRoute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Generate route name if not provided
    if (!req.body.routeName) {
      req.body.routeName = `${req.body.origin} to ${req.body.destination}`;
    }

    const route = new Route(req.body);
    await route.save();

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      data: { route }
    });

  } catch (error) {
    console.error('Create route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create route',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, origin, destination } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (origin) query.origin = new RegExp(origin, 'i');
    if (destination) query.destination = new RegExp(destination, 'i');

    const routes = await Route.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ popularityScore: -1, createdAt: -1 });

    const total = await Route.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Routes retrieved successfully',
      data: {
        routes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get routes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve routes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get route by ID
const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Route retrieved successfully',
      data: { route }
    });

  } catch (error) {
    console.error('Get route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve route',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update route
const updateRoute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Route updated successfully',
      data: { route }
    });

  } catch (error) {
    console.error('Update route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update route',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Delete route
const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Route deleted successfully'
    });

  } catch (error) {
    console.error('Delete route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete route',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get popular routes
const getPopularRoutes = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const routes = await Route.find({ status: 'active' })
      .sort({ popularityScore: -1 })
      .limit(limit * 1);

    res.status(200).json({
      success: true,
      message: 'Popular routes retrieved successfully',
      data: { routes }
    });

  } catch (error) {
    console.error('Get popular routes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular routes',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  getPopularRoutes
};