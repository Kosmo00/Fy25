'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trainer_role_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      earn_per_session: {
        type: Sequelize.INTEGER
      },
      amount_earned: {
        type: Sequelize.INTEGER
      },
      amount_charged: {
        type: Sequelize.INTEGER
      },
      info: {
        type: Sequelize.STRING
      },
      gym_id: {
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
    await queryInterface.dropTable('trainer_role_data');
  }
};