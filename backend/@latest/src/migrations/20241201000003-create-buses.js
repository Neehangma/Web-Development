'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      busNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      busName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      busType: {
        type: Sequelize.ENUM('AC', 'Non-AC', 'Deluxe', 'Semi-Deluxe', 'Sleeper'),
        allowNull: false
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      availableSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      operatorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      routeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'routes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pricePerSeat: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'maintenance'),
        defaultValue: 'active'
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      specifications: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      schedule: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      ratings: {
        type: Sequelize.JSONB,
        defaultValue: {
          average: 0,
          count: 0
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.addIndex('buses', ['routeId', 'status']);
    await queryInterface.addIndex('buses', ['operatorId']);
    await queryInterface.addIndex('buses', ['busNumber'], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buses');
  }
};