'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initReceptionRoleData = (sequelize, Types) => {
  class ReceptionRoleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReceptionRoleData.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    gym_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "Gym",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ReceptionRoleData',
  });
  return ReceptionRoleData;
};

export default initReceptionRoleData(connection, DataTypes)
