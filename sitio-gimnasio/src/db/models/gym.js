'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gym extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.qr_role_data, {
        foreignKey: gym_id,
      })

      this.hasMany(models.trainer_role_data, {
        foreignKey: gym_id
      })

      this.hasMany(models.reception_role_data, {
        foreignKey: gym_id
      })
    }
  }
  gym.init({
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
    modelName: 'gym',
  });
  return gym;
};