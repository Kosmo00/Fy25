'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class athlete_role_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  athlete_role_data.init({
    user_id: DataTypes.INTEGER,
    payment_spinning: DataTypes.INTEGER,
    payment_muscle: DataTypes.INTEGER,
    deposited_money: DataTypes.INTEGER,
    discount_percent: DataTypes.INTEGER,
    user_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'athlete_role_data',
  });
  return athlete_role_data;
};