'use strict';

const DB_NAME = 'Roles'

const roles = [
  {
    name: 'athlete',
    createdAt: new Date(),
    updatedAt: new Date(),

  },
  {
    name: 'qr-scanner',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'reception',
    createdAt: new Date(),
    updatedAt: new Date(),
  },{
    name: 'trainer',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DB_NAME,  roles, {});
    
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
