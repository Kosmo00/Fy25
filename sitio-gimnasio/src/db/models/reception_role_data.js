'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reception_role_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reception_role_data.init({
    user_id: DataTypes.INTEGER,
    gym_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reception_role_data',
  });
  return reception_role_data;
};