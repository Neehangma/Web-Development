module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    busId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'buses',
        key: 'id'
      }
    },
    routeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'routes',
        key: 'id'
      }
    },
    travelDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfter: new Date().toISOString().split('T')[0]
      }
    },
    seatNumbers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    passengerDetails: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    contactDetails: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    pricing: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        basePrice: 0,
        taxes: 0,
        discount: 0,
        totalAmount: 0
      }
    },
    payment: {
      type: DataTypes.JSONB,
      defaultValue: {
        method: 'cash',
        status: 'pending',
        transactionId: null,
        paidAt: null,
        refundedAt: null,
        refundAmount: null
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no-show'),
      defaultValue: 'pending'
    },
    bookingSource: {
      type: DataTypes.ENUM('web', 'mobile', 'agent', 'phone'),
      defaultValue: 'web'
    },
    specialRequests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    cancellation: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    boardingPoint: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    droppingPoint: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    notifications: {
      type: DataTypes.JSONB,
      defaultValue: {
        sms: true,
        email: true,
        whatsapp: false
      }
    }
  }, {
    tableName: 'bookings',
    timestamps: true,
    hooks: {
      beforeCreate: (booking) => {
        if (!booking.bookingId) {
          booking.bookingId = 'BB' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
        }
        
        // Calculate total amount
        if (booking.pricing) {
          booking.pricing.totalAmount = booking.pricing.basePrice + booking.pricing.taxes - booking.pricing.discount;
        }
      },
      beforeUpdate: (booking) => {
        // Recalculate total amount if pricing changes
        if (booking.changed('pricing') && booking.pricing) {
          booking.pricing.totalAmount = booking.pricing.basePrice + booking.pricing.taxes - booking.pricing.discount;
        }
      }
    },
    indexes: [
      {
        fields: ['userId', 'createdAt']
      },
      {
        fields: ['busId', 'travelDate']
      },
      {
        fields: ['bookingId'],
        unique: true
      },
      {
        fields: ['status']
      }
    ]
  });

  // Instance methods
  Booking.prototype.getBookingAge = function() {
    return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
  };

  Booking.prototype.getTotalPassengers = function() {
    return this.seatNumbers.length;
  };

  return Booking;
};