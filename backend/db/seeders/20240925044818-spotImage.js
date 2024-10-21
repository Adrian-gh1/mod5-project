'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { SpotImage } = require('../models')
const { Op } = require('sequelize'); 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await SpotImage.bulkCreate([
      {spotId: 1,
        url:'https://i.pinimg.com/enabled/564x/8c/9b/8d/8c9b8daace80380575e358e3bf047e56.jpg',
        preview:true
      },
      {spotId: 1,
        url:'https://i.pinimg.com/enabled/564x/16/8c/cf/168ccf6548ab7cc6c03bf2a8baa4f6e6.jpg',
        preview:true
      },
      {spotId: 1,
        url:'https://i.pinimg.com/enabled/564x/16/8c/cf/168ccf6548ab7cc6c03bf2a8baa4f6e6.jpg',
        preview:true
      },
      {spotId: 1,
        url:'https://i.pinimg.com/enabled/564x/16/8c/cf/168ccf6548ab7cc6c03bf2a8baa4f6e6.jpg',
        preview:true
      },
      {spotId: 1,
        url:'https://i.pinimg.com/enabled/564x/16/8c/cf/168ccf6548ab7cc6c03bf2a8baa4f6e6.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://i.pinimg.com/736x/01/3e/02/013e02619fe7ab8157442d2764223c92.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://i.pinimg.com/736x/da/be/ec/dabeec7bbaee082cb94e40fd8d9432f7.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://i.pinimg.com/736x/da/be/ec/dabeec7bbaee082cb94e40fd8d9432f7.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://i.pinimg.com/736x/da/be/ec/dabeec7bbaee082cb94e40fd8d9432f7.jpg',
        preview:true
      },
      {spotId: 2,
        url:'https://i.pinimg.com/736x/da/be/ec/dabeec7bbaee082cb94e40fd8d9432f7.jpg',
        preview:true
      },
      {spotId: 3,
        url:'https://i.pinimg.com/736x/3b/5e/c9/3b5ec95c09d9cc982a3258c410273eaa.jpg',
        preview:true
      },
      {spotId: 3,
        url:'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        preview:true
      },
      {spotId: 3,
        url:'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        preview:true
      },
      {spotId: 3,
        url:'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        preview:true
      },
      {spotId: 3,
        url:'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        preview:true
      }
    ],{ validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        'https://i.pinimg.com/enabled/564x/8c/9b/8d/8c9b8daace80380575e358e3bf047e56.jpg',
        'https://i.pinimg.com/736x/01/3e/02/013e02619fe7ab8157442d2764223c92.jpg',
        'https://i.pinimg.com/736x/3b/5e/c9/3b5ec95c09d9cc982a3258c410273eaa.jpg',
        'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg',
        'https://i.pinimg.com/enabled/564x/6a/d0/c4/6ad0c4694bbd7200a009e87a2e488388.jpg'
      ]}
    }, {})
  }
};
