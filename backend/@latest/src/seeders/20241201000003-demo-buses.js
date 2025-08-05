'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buses', [
      {
        id: '550e8400-e29b-41d4-a716-446655440201',
        busNumber: 'NP-01-001',
        busName: 'Himalayan Express',
        busType: 'AC',
        totalSeats: 40,
        availableSeats: 40,
        amenities: ['Wi-Fi', 'AC', 'Charging Point', 'Entertainment System', 'Water Bottle'],
        operatorId: '550e8400-e29b-41d4-a716-446655440002',
        routeId: '550e8400-e29b-41d4-a716-446655440101',
        pricePerSeat: 1200.00,
        status: 'active',
        images: [],
        specifications: JSON.stringify({
          model: 'Volvo B11R',
          year: 2022,
          fuelType: 'Diesel',
          engineCapacity: '10.8L',
          mileage: 8.5
        }),
        schedule: JSON.stringify([
          {
            departureTime: '07:00',
            arrivalTime: '13:00',
            days: ['Monday', 'Wednesday', 'Friday']
          },
          {
            departureTime: '14:00',
            arrivalTime: '20:00',
            days: ['Tuesday', 'Thursday', 'Saturday', 'Sunday']
          }
        ]),
        ratings: JSON.stringify({
          average: 4.5,
          count: 150
        }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440202',
        busNumber: 'NP-02-002',
        busName: 'Safari Cruiser',
        busType: 'Deluxe',
        totalSeats: 35,
        availableSeats: 35,
        amenities: ['AC', 'Charging Point', 'Blanket', 'Water Bottle', 'GPS Tracking'],
        operatorId: '550e8400-e29b-41d4-a716-446655440002',
        routeId: '550e8400-e29b-41d4-a716-446655440102',
        pricePerSeat: 900.00,
        status: 'active',
        images: [],
        specifications: JSON.stringify({
          model: 'Tata Ultra',
          year: 2021,
          fuelType: 'Diesel',
          engineCapacity: '5.9L',
          mileage: 10.2
        }),
        schedule: JSON.stringify([
          {
            departureTime: '08:00',
            arrivalTime: '13:00',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
        ]),
        ratings: JSON.stringify({
          average: 4.2,
          count: 89
        }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440203',
        busNumber: 'NP-03-003',
        busName: 'Valley Connect',
        busType: 'Semi-Deluxe',
        totalSeats: 45,
        availableSeats: 45,
        amenities: ['Charging Point', 'Water Bottle', 'First Aid Kit'],
        operatorId: '550e8400-e29b-41d4-a716-446655440002',
        routeId: '550e8400-e29b-41d4-a716-446655440103',
        pricePerSeat: 700.00,
        status: 'active',
        images: [],
        specifications: JSON.stringify({
          model: 'Mahindra Tourister',
          year: 2020,
          fuelType: 'Diesel',
          engineCapacity: '3.8L',
          mileage: 12.5
        }),
        schedule: JSON.stringify([
          {
            departureTime: '09:00',
            arrivalTime: '13:00',
            days: ['Monday', 'Wednesday', 'Friday', 'Sunday']
          }
        ]),
        ratings: JSON.stringify({
          average: 3.8,
          count: 45
        }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buses', null, {});
  }
};