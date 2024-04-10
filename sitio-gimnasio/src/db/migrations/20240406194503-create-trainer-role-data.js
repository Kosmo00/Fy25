'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TrainerRoleData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      earn_per_session: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30
      },
      amount_earned: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      amount_charged: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      info: {
        type: Sequelize.STRING(500)
      },
      gym_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: {
            tableName: 'Gyms'
          },
          key: 'id'
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TrainerRoleData');
  }
};