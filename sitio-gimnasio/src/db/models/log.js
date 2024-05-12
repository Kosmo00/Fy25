'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initLogs = (sequelize, Types) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Log.init({
    log_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    log_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    info: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};

export default initLogs(connection, DataTypes)
