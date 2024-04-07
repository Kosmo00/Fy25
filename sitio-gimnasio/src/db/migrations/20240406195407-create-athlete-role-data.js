'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('athlete_role_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      payment_spinning: {
        type: Sequelize.INTEGER
      },
      payment_muscle: {
        type: Sequelize.INTEGER
      },
      deposited_money: {
        type: Sequelize.INTEGER
      },
      discount_percent: {
        type: Sequelize.INTEGER
      },
      user_number: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('athlete_role_data');
  }
};