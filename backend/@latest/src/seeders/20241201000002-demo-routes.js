'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('routes', [
      {
        id: '550e8400-e29b-41d4-a716-446655440101',
        routeName: 'Kathmandu to Pokhara Express',
        origin: 'Kathmandu',
        destination: 'Pokhara',
        distance: 200.5,
        estimatedDuration: 360, // 6 hours
        stops: JSON.stringify([
          {
            name: 'Mugling',
            arrivalTime: '10:30',
            departureTime: '10:45',
            coordinates: { latitude: 27.8167, longitude: 84.5667 }
          },
          {
            name: 'Dumre',
            arrivalTime: '11:30',
            departureTime: '11:40',
            coordinates: { latitude: 27.9833, longitude: 84.4167 }
          }
        ]),
        coordinates: JSON.stringify({
          origin: { latitude: 27.7172, longitude: 85.3240 },
          destination: { latitude: 28.2096, longitude: 83.9856 }
        }),
        basePrice: 800.00,
        status: 'active',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        seasonalPricing: JSON.stringify([]),
        popularityScore: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440102',
        routeName: 'Kathmandu to Chitwan Safari',
        origin: 'Kathmandu',
        destination: 'Chitwan',
        distance: 150.0,
        estimatedDuration: 300, // 5 hours
        stops: JSON.stringify([
          {
            name: 'Hetauda',
            arrivalTime: '09:30',
            departureTime: '09:45',
            coordinates: { latitude: 27.4167, longitude: 85.0333 }
          }
        ]),
        coordinates: JSON.stringify({
          origin: { latitude: 27.7172, longitude: 85.3240 },
          destination: { latitude: 27.5291, longitude: 84.3542 }
        }),
        basePrice: 600.00,
        status: 'active',
        operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        seasonalPricing: JSON.stringify([]),
        popularityScore: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440103',
        routeName: 'Pokhara to Chitwan Connect',
        origin: 'Pokhara',
        destination: 'Chitwan',
        distance: 120.0,
        estimatedDuration: 240, // 4 hours
        stops: JSON.stringify([]),
        coordinates: JSON.stringify({
          origin: { latitude: 28.2096, longitude: 83.9856 },
          destination: { latitude: 27.5291, longitude: 84.3542 }
        }),
        basePrice: 500.00,
        status: 'active',
        operatingDays: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
        seasonalPricing: JSON.stringify([]),
        popularityScore: 70,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('routes', null, {});
  }
};