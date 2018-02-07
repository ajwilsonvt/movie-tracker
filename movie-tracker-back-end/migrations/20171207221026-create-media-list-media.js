'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('media_list_media', {
      media_list_id: {
        type: Sequelize.INTEGER
      },
      media_id: {
        type: Sequelize.INTEGER
      },
      media_status: {
        type: Sequelize.STRING
      },
      media_notes: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('media_list_media');
  }
};