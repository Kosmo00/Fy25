'use strict';

const DB_NAME = 'Gyms'

const gyms = [
  {
    name: 'Fy25',
    location: 'Fy25',
    info: 'Somos un equipo que busca mejorar tu salud y tu apariencia física. Más que un gimnasio somos una familia.',
    image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DB_NAME, gyms, {});
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
