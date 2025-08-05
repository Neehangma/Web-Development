'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      bookingId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      busId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'buses',
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
      travelDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      seatNumbers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      passengerDetails: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      contactDetails: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      pricing: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          basePrice: 0,
          taxes: 0,
          discount: 0,
          totalAmount: 0
        }
      },
      payment: {
        type: Sequelize.JSONB,
        defaultValue: {
          method: 'cash',
          status: 'pending',
          transactionId: null,
          paidAt: null,
          refundedAt: null,
          refundAmount: null
        }
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no-show'),
        defaultValue: 'pending'
      },
      bookingSource: {
        type: Sequelize.ENUM('web', 'mobile', 'agent', 'phone'),
        defaultValue: 'web'
      },
      specialRequests: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      cancellation: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      boardingPoint: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      droppingPoint: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      notifications: {
        type: Sequelize.JSONB,
        defaultValue: {
          sms: true,
          email: true,
          whatsapp: false
        }
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
    await queryInterface.addIndex('bookings', ['userId', 'createdAt']);
    await queryInterface.addIndex('bookings', ['busId', 'travelDate']);
    await queryInterface.addIndex('bookings', ['bookingId'], { unique: true });
    await queryInterface.addIndex('bookings', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};