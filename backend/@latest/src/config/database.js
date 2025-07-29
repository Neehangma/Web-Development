const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/busbuddy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🗄️  MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // In development, continue without database
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Continuing without database connection in development mode');
      return;
    }
    
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // User model indexes
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.collection('users').createIndex({ phone: 1 }, { unique: true });
    
    // Bus model indexes
    await mongoose.connection.collection('buses').createIndex({ busNumber: 1 }, { unique: true });
    await mongoose.connection.collection('buses').createIndex({ route: 1 });
    
    // Booking model indexes
    await mongoose.connection.collection('bookings').createIndex({ user: 1 });
    await mongoose.connection.collection('bookings').createIndex({ bus: 1 });
    await mongoose.connection.collection('bookings').createIndex({ bookingDate: 1 });
    
    console.log('📊 Database indexes created successfully');
  } catch (error) {
    console.log('⚠️  Index creation warning:', error.message);
  }
};

module.exports = connectDB;