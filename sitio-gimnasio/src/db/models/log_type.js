'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initLogType = (sequelize, Types) => {
  class LogType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'LogType',
  });
  return LogType;
};

export default initLogType(connection, DataTypes)
