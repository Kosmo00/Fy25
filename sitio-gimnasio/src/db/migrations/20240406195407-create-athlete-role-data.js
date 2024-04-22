'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AthleteRoleData', {
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
      payment_spinning: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      payment_muscle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deposited_money: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      discount_percent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      user_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('AthleteRoleData');
  }
};