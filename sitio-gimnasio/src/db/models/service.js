'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'
import Role from './role'

const initServices = (sequelize, Types) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    name:{ 
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gym_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'Gym',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Service',
  });
  Service.associate()
  return Service;
};

export default initServices(connection, DataTypes)
