const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is valid but user not found.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated.'
      });
    }

    // Add user to request object
    req.user = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
      fullName: user.fullName
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired.'
      });
    }

    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

// Middleware to check admin permissions
const adminAuth = async (req, res, next) => {
  try {
    // First run the regular auth middleware
    await new Promise((resolve, reject) => {
      auth(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Check if user is admin or operator
    if (!['admin', 'operator'].includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
};

// Middleware to check specific user types
const requireUserType = (allowedTypes) => {
  return async (req, res, next) => {
    try {
      if (!allowedTypes.includes(req.user.userType)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required user type: ${allowedTypes.join(' or ')}`
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Authorization check failed.'
      });
    }
  };
};

module.exports = {
  auth,
  adminAuth,
  requireUserType
};