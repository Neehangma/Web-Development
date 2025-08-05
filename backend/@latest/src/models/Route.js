module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    routeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 100]
      }
    },
    origin: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    destination: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    distance: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      validate: {
        min: 1
      }
    },
    estimatedDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 30
      }
    },
    stops: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    coordinates: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    operatingDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    seasonalPricing: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    popularityScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    tableName: 'routes',
    timestamps: true,
    indexes: [
      {
        fields: ['origin', 'destination']
      },
      {
        fields: ['status']
      },
      {
        fields: ['popularityScore']
      }
    ]
  });

  // Instance methods
  Route.prototype.getFormattedName = function() {
    return `${this.origin} → ${this.destination}`;
  };

  Route.prototype.getFormattedDuration = function() {
    const hours = Math.floor(this.estimatedDuration / 60);
    const minutes = this.estimatedDuration % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return Route;
};