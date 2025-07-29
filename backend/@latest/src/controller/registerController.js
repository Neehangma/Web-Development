const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(error => ({
          field: error.path,
          message: error.msg
        }))
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      address,
      agreeToTerms
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user agreed to terms
    if (!agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the terms and conditions'
      });
    }

    // Check if user already exists with email or phone
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone: phone }
      ]
    });

    if (existingUser) {
      const conflictField = existingUser.email === email.toLowerCase() ? 'email' : 'phone';
      return res.status(409).json({
        success: false,
        message: `An account with this ${conflictField} already exists`,
        field: conflictField
      });
    }

    // Validate age (must be at least 16 years old)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 16) {
      return res.status(400).json({
        success: false,
        message: 'You must be at least 16 years old to register'
      });
    }

    // Create new user
    const newUser = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      dateOfBirth: birthDate,
      gender,
      address: {
        street: address?.street?.trim() || '',
        city: address?.city?.trim() || '',
        state: address?.state?.trim() || '',
        zipCode: address?.zipCode?.trim() || '',
        country: address?.country?.trim() || 'Nepal'
      },
      userType: 'passenger', // Default user type
      isVerified: false, // Email verification required
      isActive: true
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser._id, 
        email: savedUser.email,
        userType: savedUser.userType 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    // Prepare user data for response (exclude password)
    const userData = {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      fullName: savedUser.fullName,
      email: savedUser.email,
      phone: savedUser.phone,
      dateOfBirth: savedUser.dateOfBirth,
      gender: savedUser.gender,
      address: savedUser.address,
      userType: savedUser.userType,
      isVerified: savedUser.isVerified,
      age: savedUser.age,
      createdAt: savedUser.createdAt
    };

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Registration successful! Welcome to BusBuddy!',
      data: {
        user: userData,
        token
      }
    });

    // Log successful registration
    console.log(`✅ New user registered: ${savedUser.email} at ${new Date().toISOString()}`);

    // TODO: Send welcome email and email verification
    // await sendWelcomeEmail(savedUser.email, savedUser.firstName);
    // await sendVerificationEmail(savedUser.email, verificationToken);

  } catch (error) {
    console.error('❌ Registration error:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `An account with this ${duplicateField} already exists`,
        field: duplicateField
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Check if email exists
const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.params;
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? 'Email already registered' : 'Email available'
    });

  } catch (error) {
    console.error('Check email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check email availability'
    });
  }
};

// Check if phone exists
const checkPhoneExists = async (req, res) => {
  try {
    const { phone } = req.params;
    
    const user = await User.findOne({ phone });
    
    res.status(200).json({
      success: true,
      exists: !!user,
      message: user ? 'Phone number already registered' : 'Phone number available'
    });

  } catch (error) {
    console.error('Check phone error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check phone availability'
    });
  }
};

module.exports = {
  registerController,
  checkEmailExists,
  checkPhoneExists
};