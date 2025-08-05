'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      routeName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      distance: {
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false
      },
      estimatedDuration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stops: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      coordinates: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      basePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active'
      },
      operatingDays: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      seasonalPricing: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      popularityScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes
    await queryInterface.addIndex('routes', ['origin', 'destination']);
    await queryInterface.addIndex('routes', ['status']);
    await queryInterface.addIndex('routes', ['popularityScore']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  }
};