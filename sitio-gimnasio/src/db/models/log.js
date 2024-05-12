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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    log_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};

export default initLogs(connection, DataTypes)
