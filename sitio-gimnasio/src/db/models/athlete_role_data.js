'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AthleteRoleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AthleteRoleData.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    payment_spinning: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    payment_muscle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deposited_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    discount_percent: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      defaultValue: 0
    },
    user_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AthleteRoleData',
  });
  return AthleteRoleData;
};