const { body, param, query } = require('express-validator');

// User registration validation
const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),

  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('Password must be between 6 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 16 || age > 100) {
        throw new Error('Age must be between 16 and 100 years');
      }
      return true;
    }),

  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  body('agreeToTerms')
    .isBoolean()
    .custom((value) => {
      if (!value) {
        throw new Error('You must agree to the terms and conditions');
      }
      return true;
    })
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile update validation
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),

  body('gender')
    .optional()
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other')
];

// Bus validation
const validateBus = [
  body('busNumber')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Bus number must be between 3 and 20 characters')
    .matches(/^[A-Z0-9\-]+$/)
    .withMessage('Bus number can only contain uppercase letters, numbers, and hyphens'),

  body('busName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Bus name must be between 2 and 100 characters'),

  body('busType')
    .isIn(['AC', 'Non-AC', 'Deluxe', 'Semi-Deluxe', 'Sleeper'])
    .withMessage('Invalid bus type'),

  body('totalSeats')
    .isInt({ min: 10, max: 60 })
    .withMessage('Total seats must be between 10 and 60'),

  body('amenities')
    .optional()
    .isArray()
    .withMessage('Amenities must be an array'),

  body('pricePerSeat')
    .isFloat({ min: 0 })
    .withMessage('Price per seat must be a positive number')
];

// Route validation
const validateRoute = [
  body('routeName')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Route name must be between 5 and 100 characters'),

  body('origin')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Origin must be between 2 and 50 characters'),

  body('destination')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Destination must be between 2 and 50 characters'),

  body('distance')
    .isFloat({ min: 1 })
    .withMessage('Distance must be a positive number'),

  body('estimatedDuration')
    .isInt({ min: 30 })
    .withMessage('Estimated duration must be at least 30 minutes'),

  body('stops')
    .optional()
    .isArray()
    .withMessage('Stops must be an array')
];

// Booking validation
const validateBooking = [
  body('busId')
    .isMongoId()
    .withMessage('Invalid bus ID'),

  body('routeId')
    .isMongoId()
    .withMessage('Invalid route ID'),

  body('travelDate')
    .isISO8601()
    .withMessage('Please provide a valid travel date')
    .custom((value) => {
      const travelDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (travelDate < today) {
        throw new Error('Travel date cannot be in the past');
      }
      
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90); // Allow booking up to 90 days in advance
      
      if (travelDate > maxDate) {
        throw new Error('Cannot book more than 90 days in advance');
      }
      
      return true;
    }),

  body('seatNumbers')
    .isArray({ min: 1, max: 6 })
    .withMessage('You can book between 1 and 6 seats at a time'),

  body('passengerDetails')
    .isArray()
    .withMessage('Passenger details must be an array')
    .custom((value, { req }) => {
      if (value.length !== req.body.seatNumbers.length) {
        throw new Error('Number of passenger details must match number of seats');
      }
      return true;
    }),

  body('passengerDetails.*.name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Passenger name must be between 2 and 100 characters'),

  body('passengerDetails.*.age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Passenger age must be between 1 and 120'),

  body('passengerDetails.*.gender')
    .isIn(['Male', 'Female'])
    .withMessage('Passenger gender must be Male or Female')
];

// Search validation
const validateSearch = [
  query('origin')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Origin must be between 2 and 50 characters'),

  query('destination')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Destination must be between 2 and 50 characters'),

  query('date')
    .isISO8601()
    .withMessage('Please provide a valid date')
    .custom((value) => {
      const searchDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (searchDate < today) {
        throw new Error('Search date cannot be in the past');
      }
      
      return true;
    }),

  query('passengers')
    .optional()
    .isInt({ min: 1, max: 6 })
    .withMessage('Number of passengers must be between 1 and 6')
];

// Parameter validation
const validateMongoId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName}`)
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateBus,
  validateRoute,
  validateBooking,
  validateSearch,
  validateMongoId
};