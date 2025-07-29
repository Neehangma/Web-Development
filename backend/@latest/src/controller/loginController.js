const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const loginController = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid email and password',
        errors: errors.array()
      });
    }

    const { email, password, rememberMe } = req.body;

    // Find user with password field included
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        userType: user.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Update last login time
    user.lastLoginAt = new Date();
    await user.save();

    // Prepare user data for response (exclude password)
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      isVerified: user.isVerified,
      profilePicture: user.profilePicture,
      preferences: user.preferences,
      createdAt: user.createdAt
    };

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token,
        expiresIn: tokenExpiry
      }
    });

    // Log successful login
    console.log(`✅ User login successful: ${user.email} at ${new Date().toISOString()}`);

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin login with different validation
const adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid credentials',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find admin user
    const user = await User.findOne({ 
      email, 
      userType: { $in: ['admin', 'operator'] } 
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin credentials required.'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Admin account has been deactivated.'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Generate admin token with extended permissions
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        userType: user.userType,
        isAdmin: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } // Shorter expiry for admin sessions
    );

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      userType: user.userType,
      isVerified: user.isVerified
    };

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: userData,
        token,
        expiresIn: '12h'
      }
    });

    console.log(`🔐 Admin login successful: ${user.email} at ${new Date().toISOString()}`);

  } catch (error) {
    console.error('❌ Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Admin login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  loginController,
  adminLogin
};