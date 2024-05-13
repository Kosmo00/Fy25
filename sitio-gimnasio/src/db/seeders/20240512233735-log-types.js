'use strict';

const DB_NAME = 'LogTypes'

const log_types = [
  {
    name: 'AthletheRechargeLog',
    createdAt: new Date(),
    updatedAt: new Date(),

  },
  {
    name: 'TrainerPaymentLog',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'AthletheAssistanceLog',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'RollbackLog',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    name: 'CraeteUserLog',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DB_NAME, log_types, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
