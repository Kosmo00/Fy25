'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initGym = (sequelize, Types) => {
  class Gym extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //
    }
  }
  Gym.init({
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Sin descripción'
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

export default initGym(connection, DataTypes)
