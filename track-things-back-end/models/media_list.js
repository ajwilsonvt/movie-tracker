'use strict';
module.exports = (sequelize, DataTypes) => {
  var media_list = sequelize.define('media_list', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        //
      }
    }
  });
  return media_list;
};