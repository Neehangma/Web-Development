const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: function() {
      return 'BB' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: [true, 'Bus is required']
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: [true, 'Route is required']
  },
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required'],
    validate: {
      validator: function(v) {
        return v >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Travel date cannot be in the past'
    }
  },
  seatNumbers: [{
    type: String,
    required: true
  }],
  passengerDetails: [{
    name: {
      type: String,
      required: [true, 'Passenger name is required'],
      trim: true,
      maxLength: [100, 'Name cannot exceed 100 characters']
    },
    age: {
      type: Number,
      required: [true, 'Passenger age is required'],
      min: [1, 'Age must be at least 1'],
      max: [120, 'Age cannot exceed 120']
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required']
    },
    idType: {
      type: String,
      enum: ['Aadhar', 'PAN', 'Passport', 'Driving License', 'Voter ID'],
      required: false
    },
    idNumber: {
      type: String,
      required: false
    }
  }],
  contactDetails: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    emergencyContact: {
      name: String,
      phone: String,
      relation: String
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    taxes: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['cash', 'card', 'digital_wallet', 'bank_transfer', 'upi'],
      required: [true, 'Payment method is required']
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  bookingSource: {
    type: String,
    enum: ['web', 'mobile', 'agent', 'phone'],
    default: 'web'
  },
  specialRequests: [{
    type: String,
    maxLength: [200, 'Special request cannot exceed 200 characters']
  }],
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'rejected']
    }
  },
  boardingPoint: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  droppingPoint: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  notifications: {
    sms: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for booking age
bookingSchema.virtual('bookingAge').get(function() {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for total passengers
bookingSchema.virtual('totalPassengers').get(function() {
  return this.seatNumbers.length;
});

// Pre-save middleware to calculate total amount
bookingSchema.pre('save', function(next) {
  if (this.pricing) {
    this.pricing.totalAmount = this.pricing.basePrice + this.pricing.taxes - this.pricing.discount;
  }
  next();
});

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ bus: 1, travelDate: 1 });
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ 'payment.status': 1 });

module.exports = mongoose.model('Booking', bookingSchema);