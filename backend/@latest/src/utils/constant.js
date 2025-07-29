// Application Constants

// User Types
const USER_TYPES = {
  PASSENGER: 'passenger',
  ADMIN: 'admin',
  OPERATOR: 'operator'
};

// Bus Types
const BUS_TYPES = {
  AC: 'AC',
  NON_AC: 'Non-AC',
  DELUXE: 'Deluxe',
  SEMI_DELUXE: 'Semi-Deluxe',
  SLEEPER: 'Sleeper'
};

// Booking Status
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  REFUNDED: 'refunded'
};

// Payment Status
const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Payment Methods
const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  DIGITAL_WALLET: 'digital_wallet',
  BANK_TRANSFER: 'bank_transfer'
};

// Gender Options
const GENDER_OPTIONS = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other'
};

// Seat Status
const SEAT_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  RESERVED: 'reserved',
  BLOCKED: 'blocked'
};

// Bus Amenities
const BUS_AMENITIES = [
  'Wi-Fi',
  'AC',
  'Charging Point',
  'Entertainment System',
  'Blanket',
  'Pillow',
  'Water Bottle',
  'Snacks',
  'GPS Tracking',
  'CCTV',
  'First Aid Kit',
  'Fire Extinguisher',
  'Reading Light',
  'Reclining Seats',
  'Leg Rest'
];

// Cities in Nepal (Popular bus routes)
const NEPAL_CITIES = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Lumbini',
  'Dharan',
  'Biratnagar',
  'Janakpur',
  'Birgunj',
  'Butwal',
  'Nepalgunj',
  'Surkhet',
  'Dhangadhi',
  'Mahendranagar',
  'Ilam',
  'Tansen',
  'Gorkha',
  'Bandipur',
  'Nagarkot',
  'Dhulikhel',
  'Bhaktapur'
];

// API Response Messages
const RESPONSE_MESSAGES = {
  SUCCESS: {
    USER_REGISTERED: 'User registered successfully',
    USER_LOGGED_IN: 'Login successful',
    USER_LOGGED_OUT: 'Logged out successfully',
    PROFILE_UPDATED: 'Profile updated successfully',
    BUS_CREATED: 'Bus created successfully',
    BUS_UPDATED: 'Bus updated successfully',
    BUS_DELETED: 'Bus deleted successfully',
    ROUTE_CREATED: 'Route created successfully',
    ROUTE_UPDATED: 'Route updated successfully',
    ROUTE_DELETED: 'Route deleted successfully',
    BOOKING_CREATED: 'Booking created successfully',
    BOOKING_UPDATED: 'Booking updated successfully',
    BOOKING_CANCELLED: 'Booking cancelled successfully',
    DATA_FETCHED: 'Data fetched successfully'
  },
  ERROR: {
    VALIDATION_FAILED: 'Validation failed',
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    ACCESS_DENIED: 'Access denied',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    EMAIL_EXISTS: 'Email already registered',
    PHONE_EXISTS: 'Phone number already registered',
    BUS_NOT_FOUND: 'Bus not found',
    ROUTE_NOT_FOUND: 'Route not found',
    BOOKING_NOT_FOUND: 'Booking not found',
    SEAT_NOT_AVAILABLE: 'Selected seat(s) not available',
    BOOKING_EXPIRED: 'Booking session expired',
    PAYMENT_FAILED: 'Payment failed',
    INTERNAL_ERROR: 'Internal server error',
    DATABASE_ERROR: 'Database operation failed'
  }
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Time Constants
const TIME_CONSTANTS = {
  JWT_EXPIRE: '7d',
  JWT_ADMIN_EXPIRE: '12h',
  BOOKING_HOLD_TIME: 15, // minutes
  PASSWORD_RESET_EXPIRE: 10, // minutes
  EMAIL_VERIFICATION_EXPIRE: 24 // hours
};

// File Upload Constants
const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  PROFILE_PICTURE_PATH: 'uploads/profiles/',
  BUS_IMAGE_PATH: 'uploads/buses/',
  DOCUMENT_PATH: 'uploads/documents/'
};

// Validation Constants
const VALIDATION_CONSTANTS = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MIN_AGE: 16,
  MAX_AGE: 100,
  MAX_SEATS_PER_BOOKING: 6,
  MAX_ADVANCE_BOOKING_DAYS: 90,
  BUS_NUMBER_MIN_LENGTH: 3,
  BUS_NUMBER_MAX_LENGTH: 20,
  MIN_BUS_SEATS: 10,
  MAX_BUS_SEATS: 60
};

// Email Templates
const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
  BOOKING_CONFIRMATION: 'booking_confirmation',
  BOOKING_CANCELLATION: 'booking_cancellation',
  BOOKING_REMINDER: 'booking_reminder'
};

// Notification Types
const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  BUS_DELAYED: 'bus_delayed',
  BUS_CANCELLED: 'bus_cancelled',
  PROFILE_UPDATED: 'profile_updated'
};

module.exports = {
  USER_TYPES,
  BUS_TYPES,
  BOOKING_STATUS,
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  GENDER_OPTIONS,
  SEAT_STATUS,
  BUS_AMENITIES,
  NEPAL_CITIES,
  RESPONSE_MESSAGES,
  HTTP_STATUS,
  TIME_CONSTANTS,
  UPLOAD_CONSTANTS,
  VALIDATION_CONSTANTS,
  EMAIL_TEMPLATES,
  NOTIFICATION_TYPES
};