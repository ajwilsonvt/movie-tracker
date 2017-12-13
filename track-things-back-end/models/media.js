'use strict';
module.exports = (sequelize, DataTypes) => {
  var media = sequelize.define('media', {
    tmdb_id: DataTypes.INTEGER,
    media_type: DataTypes.STRING,
    title: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    tmdb_backdrop: DataTypes.STRING,
    tmdb_poster: DataTypes.STRING,
    release_date: DataTypes.STRING,
    overview: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //
      }
    }
  });
  return media;
};