module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    busNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 20],
        is: /^[A-Z0-9\-]+$/
      }
    },
    busName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    busType: {
      type: DataTypes.ENUM('AC', 'Non-AC', 'Deluxe', 'Semi-Deluxe', 'Sleeper'),
      allowNull: false
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
        max: 60
      }
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    operatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
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
    pricePerSeat: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
      defaultValue: 'active'
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    specifications: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    schedule: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    ratings: {
      type: DataTypes.JSONB,
      defaultValue: {
        average: 0,
        count: 0
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'buses',
    timestamps: true,
    hooks: {
      beforeCreate: (bus) => {
        if (!bus.availableSeats) {
          bus.availableSeats = bus.totalSeats;
        }
      }
    },
    indexes: [
      {
        fields: ['routeId', 'status']
      },
      {
        fields: ['operatorId']
      },
      {
        fields: ['busNumber'],
        unique: true
      }
    ]
  });

  // Instance methods
  Bus.prototype.getOccupancyRate = function() {
    return ((this.totalSeats - this.availableSeats) / this.totalSeats * 100).toFixed(2);
  };

  return Bus;
};