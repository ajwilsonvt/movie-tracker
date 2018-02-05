'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'person 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'person 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'person 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
