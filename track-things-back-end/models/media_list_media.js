'use strict';
module.exports = (sequelize, DataTypes) => {
  var media_list_media = sequelize.define('media_list_media', {
    media_list_id: DataTypes.INTEGER,
    media_id: DataTypes.INTEGER,
    media_status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  media_list_media.removeAttribute('id');
  return media_list_media;
};