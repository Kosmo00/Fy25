'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gym extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.QrRoleData, {
        foreignKey: gym_id,
      })

      this.hasMany(models.TrainerRoleData, {
        foreignKey: gym_id
      })

      this.hasMany(models.ReceptionRoleData, {
        foreignKey: gym_id
      })
    }
  }
  Gym.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Gym',
  });
  return Gym;
};