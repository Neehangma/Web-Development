const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Route = require('./Route')(sequelize, Sequelize.DataTypes);
const Bus = require('./Bus')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);

// Define associations
const models = { User, Route, Bus, Booking };

// User associations
User.hasMany(Bus, { foreignKey: 'operatorId', as: 'buses' });
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });

// Route associations
Route.hasMany(Bus, { foreignKey: 'routeId', as: 'buses' });

// Bus associations
Bus.belongsTo(User, { foreignKey: 'operatorId', as: 'operator' });
Bus.belongsTo(Route, { foreignKey: 'routeId', as: 'route' });
Bus.hasMany(Booking, { foreignKey: 'busId', as: 'bookings' });

// Booking associations
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Booking.belongsTo(Bus, { foreignKey: 'busId', as: 'bus' });
Booking.belongsTo(Route, { foreignKey: 'routeId', as: 'route' });

module.exports = {
  sequelize,
  User,
  Route,
  Bus,
  Booking,
  ...models
};