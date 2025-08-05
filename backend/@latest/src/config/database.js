const { Sequelize } = require('sequelize');
require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'busbuddy',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME + '_test' || 'busbuddy_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

// Create Sequelize instance
const sequelize = new Sequelize(
  config[process.env.NODE_ENV || 'development'].database,
  config[process.env.NODE_ENV || 'development'].username,
  config[process.env.NODE_ENV || 'development'].password,
  {
    host: config[process.env.NODE_ENV || 'development'].host,
    port: config[process.env.NODE_ENV || 'development'].port,
    dialect: config[process.env.NODE_ENV || 'development'].dialect,
    logging: config[process.env.NODE_ENV || 'development'].logging,
    pool: config[process.env.NODE_ENV || 'development'].pool
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🗄️  PostgreSQL Connected successfully');
    
    // Sync database in development
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📊 Database synchronized');
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Continuing without database connection in development mode');
      return;
    }
    
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB, config };