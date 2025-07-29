const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: [true, 'Bus number is required'],
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z0-9\-]+$/, 'Bus number can only contain uppercase letters, numbers, and hyphens']
  },
  busName: {
    type: String,
    required: [true, 'Bus name is required'],
    trim: true,
    maxLength: [100, 'Bus name cannot exceed 100 characters']
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Deluxe', 'Semi-Deluxe', 'Sleeper'],
    required: [true, 'Bus type is required']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: [10, 'Bus must have at least 10 seats'],
    max: [60, 'Bus cannot have more than 60 seats']
  },
  availableSeats: {
    type: Number,
    default: function() { return this.totalSeats; }
  },
  amenities: [{
    type: String,
    enum: [
      'Wi-Fi', 'AC', 'Charging Point', 'Entertainment System', 
      'Blanket', 'Pillow', 'Water Bottle', 'Snacks', 
      'GPS Tracking', 'CCTV', 'First Aid Kit', 'Fire Extinguisher',
      'Reading Light', 'Reclining Seats', 'Leg Rest'
    ]
  }],
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  pricePerSeat: {
    type: Number,
    required: [true, 'Price per seat is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  }],
  specifications: {
    model: String,
    year: {
      type: Number,
      min: [2000, 'Bus year cannot be before 2000'],
      max: [new Date().getFullYear() + 1, 'Bus year cannot be in the future']
    },
    fuelType: {
      type: String,
      enum: ['Diesel', 'CNG', 'Electric', 'Hybrid'],
      default: 'Diesel'
    },
    engineCapacity: String,
    mileage: Number
  },
  schedule: [{
    departureTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format']
    },
    arrivalTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:MM format']
    },
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  }],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for occupancy rate
busSchema.virtual('occupancyRate').get(function() {
  return ((this.totalSeats - this.availableSeats) / this.totalSeats * 100).toFixed(2);
});

// Index for efficient queries
busSchema.index({ route: 1, status: 1 });
busSchema.index({ operator: 1 });
busSchema.index({ busNumber: 1 });

module.exports = mongoose.model('Bus', busSchema);