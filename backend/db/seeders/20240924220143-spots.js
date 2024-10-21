'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { Op } = require('sequelize');
const { Spot } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Rd',
        city: 'San Diego',
        state: 'CA',
        country: 'United States',
        lat: 32.7,
        lng: -117.2,
        name: 'Beach House',
        description: 'Experience the ultimate coastal getaway in this exquisite beach house, boasting breathtaking ocean views. Designed for relaxation, this serene retreat offers the perfect setting for unforgettable vacations, where you can unwind to the sound of waves and enjoy the stunning sunsets from your private balcony.',
        price: 300.00,
      },
      {
        ownerId: 2,
        address: '456 Ocean Ave',
        city: 'Miami',
        state: 'FL',
        country: 'United States',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Ocean Breeze Villa',
        description: 'Discover an exquisite European villa that redefines luxury living, featuring direct beach access and unparalleled modern amenities. This stunning mansion is a sanctuary of sophistication, offering spacious, elegantly designed interiors and breathtaking sea views. Enjoy a lavish stay with seamless indoor-outdoor living, where you can relax by the pristine shoreline or indulge in upscale comforts, creating unforgettable memories in a truly idyllic setting.',
        price: 450.00,
      },
      {
        ownerId: 1,
        address: '123 Malibu Dr',
        city: 'Malibu',
        state: 'CA',
        country: 'United States',
        lat: 34.0259,
        lng: -118.7798,
        name: 'Stone and Marbel',
        description: 'Nestled in a serene landscape, this stunning property showcases a harmonious blend of modern design and natural beauty, characterized by its striking black and white stone facade. The exterior features a sleek, contemporary aesthetic, with large windows framed by smooth black stone, allowing for abundant natural light to flood the interior.',
        price: 750.00,
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Rd', '456 Ocean Ave', '123 Malibu Dr'] }
    }, {});
  }
};