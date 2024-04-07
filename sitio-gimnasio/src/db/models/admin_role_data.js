'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin_role_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admin_role_data.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin_role_data',
  });
  return admin_role_data;
};