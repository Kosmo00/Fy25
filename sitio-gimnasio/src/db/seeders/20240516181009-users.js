'use strict';
const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')

const DB_NAME = 'Users'

const users = [
  {
    id: v4(),
    name: 'Kosmo',
    lastname: 'Mode Admin',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000000',
    email: 'kosmo@kosmo.com',
    phone: '00000000',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 3,
    verified_email: true,
    info: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: v4(),
    name: 'Athlete 1',
    lastname: 'Example',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000001',
    email: 'athlete1@kosmo.com',
    phone: '00000001',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 1,
    verified_email: true,
    info: JSON.stringify({
      deposited_money: 500 * 100,
      payed_money: 0,
      discount_percent: 0
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, 
  {
    id: v4(),
    name: 'Athlete 2',
    lastname: 'Example',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000002',
    email: 'athlete2@kosmo.com',
    phone: '00000002',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 1,
    verified_email: true,
    info: JSON.stringify({
      deposited_money: 500 * 100,
      payed_money: 0,
      discount_percent: 0
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, 
  {
    id: v4(),
    name: 'Trainer 1',
    lastname: 'Example',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000003',
    email: 'trainer1@kosmo.com',
    phone: '00000003',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 5,
    verified_email: true,
    info: JSON.stringify({
      gym_id: 1,
      amount_charged: 500 * 100,
      amount_earned: 2000 * 100,
      earn_per_session: 200 * 100
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, 
  {
    id: v4(),
    name: ' Reception 1',
    lastname: 'Example',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000004',
    email: 'reception1@kosmo.com',
    phone: '00000004',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 4,
    verified_email: true,
    info: JSON.stringify({
      gym_id: 1,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, 
  {
    id: v4(),
    name: ' QR 1',
    lastname: 'Example',
    password: bcrypt.hashSync('12345678'),
    profile_image: '/user_images/3c86f0e7-b588-49e9-a95a-0c998c20b4a4.png',
    CI: '00000000005',
    email: 'qr1@kosmo.com',
    phone: '00000005',
    notify_whatsapp: false,
    notify_email: false,
    role_id: 2,
    verified_email: true,
    info: JSON.stringify({
      gym_id: 1,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, 
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(DB_NAME, users, {});
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
