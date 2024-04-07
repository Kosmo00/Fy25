'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class qr_role_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  qr_role_data.init({
    user_id: DataTypes.INTEGER,
    gym_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'qr_role_data',
  });
  return qr_role_data;
};