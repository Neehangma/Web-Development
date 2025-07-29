const Bus = require('../models/Bus');
const Route = require('../models/Route');
const { validationResult } = require('express-validator');

// Create new bus
const createBus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const busData = {
      ...req.body,
      operator: req.user.userId
    };

    const bus = new Bus(busData);
    await bus.save();

    await bus.populate('route operator');

    res.status(201).json({
      success: true,
      message: 'Bus created successfully',
      data: { bus }
    });

  } catch (error) {
    console.error('Create bus error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Bus number already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create bus',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, busType, route } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (busType) query.busType = busType;
    if (route) query.route = route;

    const buses = await Bus.find(query)
      .populate('route', 'origin destination formattedName')
      .populate('operator', 'firstName lastName email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Bus.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Buses retrieved successfully',
      data: {
        buses,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get buses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve buses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get bus by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
      .populate('route')
      .populate('operator', 'firstName lastName email phone');

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bus retrieved successfully',
      data: { bus }
    });

  } catch (error) {
    console.error('Get bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bus',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update bus
const updateBus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('route operator');

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bus updated successfully',
      data: { bus }
    });

  } catch (error) {
    console.error('Update bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update bus',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Delete bus
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bus deleted successfully'
    });

  } catch (error) {
    console.error('Delete bus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete bus',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Search buses
const searchBuses = async (req, res) => {
  try {
    const { origin, destination, date, passengers = 1 } = req.query;

    if (!origin || !destination || !date) {
      return res.status(400).json({
        success: false,
        message: 'Origin, destination, and date are required'
      });
    }

    // Find routes matching origin and destination
    const routes = await Route.find({
      origin: new RegExp(origin, 'i'),
      destination: new RegExp(destination, 'i'),
      status: 'active'
    });

    if (routes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No routes found for the specified origin and destination'
      });
    }

    const routeIds = routes.map(route => route._id);

    // Find buses for these routes
    const buses = await Bus.find({
      route: { $in: routeIds },
      status: 'active',
      availableSeats: { $gte: passengers }
    })
    .populate('route')
    .populate('operator', 'firstName lastName')
    .sort({ pricePerSeat: 1 });

    res.status(200).json({
      success: true,
      message: 'Buses found successfully',
      data: {
        buses,
        searchParams: { origin, destination, date, passengers }
      }
    });

  } catch (error) {
    console.error('Search buses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search buses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get buses by route
const getBusesByRoute = async (req, res) => {
  try {
    const buses = await Bus.find({ 
      route: req.params.routeId,
      status: 'active'
    })
    .populate('route')
    .populate('operator', 'firstName lastName')
    .sort({ pricePerSeat: 1 });

    res.status(200).json({
      success: true,
      message: 'Buses retrieved successfully',
      data: { buses }
    });

  } catch (error) {
    console.error('Get buses by route error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve buses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  searchBuses,
  getBusesByRoute
};