'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    await queryInterface.bulkInsert('users', [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@busbuddy.com',
        phone: '+1234567890',
        password: hashedPassword,
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        address: JSON.stringify({
          street: '123 Admin Street',
          city: 'Kathmandu',
          state: 'Bagmati',
          zipCode: '44600',
          country: 'Nepal'
        }),
        userType: 'admin',
        isVerified: true,
        isActive: true,
        preferences: JSON.stringify({
          seatPreference: 'any',
          notifications: {
            email: true,
            sms: true,
            push: true
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        firstName: 'Bus',
        lastName: 'Operator',
        email: 'operator@busbuddy.com',
        phone: '+1234567891',
        password: hashedPassword,
        dateOfBirth: '1985-05-15',
        gender: 'Male',
        address: JSON.stringify({
          street: '456 Operator Avenue',
          city: 'Pokhara',
          state: 'Gandaki',
          zipCode: '33700',
          country: 'Nepal'
        }),
        userType: 'operator',
        isVerified: true,
        isActive: true,
        preferences: JSON.stringify({
          seatPreference: 'any',
          notifications: {
            email: true,
            sms: true,
            push: true
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567892',
        password: hashedPassword,
        dateOfBirth: '1992-03-20',
        gender: 'Male',
        address: JSON.stringify({
          street: '789 Passenger Lane',
          city: 'Chitwan',
          state: 'Bagmati',
          zipCode: '44200',
          country: 'Nepal'
        }),
        userType: 'passenger',
        isVerified: true,
        isActive: true,
        preferences: JSON.stringify({
          seatPreference: 'window',
          notifications: {
            email: true,
            sms: true,
            push: false
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};