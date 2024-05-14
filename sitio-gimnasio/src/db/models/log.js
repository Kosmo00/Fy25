'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'
import LogType from './log_type'

const initLogs = (sequelize, Types) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      this.belongsTo(LogType, {
        foreignKey: 'log_type_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'logType'
      })
    }
  }
  Log.init({
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
  Log.associate()
  return Log;
};

export default initLogs(connection, DataTypes)
