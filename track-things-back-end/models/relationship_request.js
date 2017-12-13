'use strict';
module.exports = (sequelize, DataTypes) => {
  var relationship_request = sequelize.define('relationship_request', {
    requester_id: DataTypes.INTEGER,
    requestee_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return relationship_request;
};