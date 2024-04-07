'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trainer_role_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trainer_role_data.init({
    user_id: DataTypes.INTEGER,
    earn_per_session: DataTypes.INTEGER,
    amount_earned: DataTypes.INTEGER,
    amount_charged: DataTypes.INTEGER,
    info: DataTypes.STRING,
    gym_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trainer_role_data',
  });
  return trainer_role_data;
};