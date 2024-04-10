'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrainerRoleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TrainerRoleData.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    earn_per_session: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30
    },
    amount_earned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    amount_charged: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    info: DataTypes.STRING(500),
    gym_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Gym',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'TrainerRoleData',
  });
  return TrainerRoleData;
};