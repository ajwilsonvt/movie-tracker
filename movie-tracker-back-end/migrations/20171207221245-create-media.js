'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tmdb_id: {
        type: Sequelize.INTEGER
      },
      media_type: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      tmdb_backdrop: {
        type: Sequelize.STRING
      },
      tmdb_poster: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('media');
  }
};