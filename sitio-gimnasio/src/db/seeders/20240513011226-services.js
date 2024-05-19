'use strict';

const DB_NAME = 'Services'

const services = [
  {
    name: 'Spinning',
    gym_id: 1,
    price: 200 * 100,
    description: 'Cardio con bicicleta',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Muscle',
    gym_id: 1,
    price: 250 * 100,
    description: 'Pa hacer hierro',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DB_NAME, services, {});
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
