'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initLogType = (sequelize, Types) => {
  class log_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  log_type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'log_type',
  });
  return log_type;
};

export default initLogType(connection, DataTypes)
