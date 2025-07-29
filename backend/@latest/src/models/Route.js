const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
    maxLength: [100, 'Route name cannot exceed 100 characters']
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
    trim: true,
    maxLength: [50, 'Origin name cannot exceed 50 characters']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true,
    maxLength: [50, 'Destination name cannot exceed 50 characters']
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required'],
    min: [1, 'Distance must be at least 1 km']
  },
  estimatedDuration: {
    type: Number,
    required: [true, 'Estimated duration is required'],
    min: [30, 'Duration must be at least 30 minutes']
  },
  stops: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    arrivalTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format']
    },
    departureTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format']
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  }],
  coordinates: {
    origin: {
      latitude: Number,
      longitude: Number
    },
    destination: {
      latitude: Number,
      longitude: Number
    }
  },
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  operatingDays: [{
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  seasonalPricing: [{
    season: {
      type: String,
      enum: ['peak', 'off-peak', 'festival', 'holiday']
    },
    multiplier: {
      type: Number,
      min: [0.5, 'Multiplier cannot be less than 0.5'],
      max: [3, 'Multiplier cannot be more than 3']
    },
    startDate: Date,
    endDate: Date
  }],
  popularityScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted route name
routeSchema.virtual('formattedName').get(function() {
  return `${this.origin} → ${this.destination}`;
});

// Virtual for duration in hours and minutes
routeSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.estimatedDuration / 60);
  const minutes = this.estimatedDuration % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
});

// Index for efficient queries
routeSchema.index({ origin: 1, destination: 1 });
routeSchema.index({ status: 1 });
routeSchema.index({ popularityScore: -1 });

module.exports = mongoose.model('Route', routeSchema);