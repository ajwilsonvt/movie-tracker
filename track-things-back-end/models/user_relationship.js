'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_relationship = sequelize.define('user_relationship', {
    user_a_id: DataTypes.INTEGER,
    user_b_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_relationship;
};