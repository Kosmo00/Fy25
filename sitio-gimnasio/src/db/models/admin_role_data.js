'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initAdminRoleData = (sequelize, Types) => {  class AdminRoleData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminRoleData.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AdminRoleData',
  });
  return AdminRoleData;
};

export default initAdminRoleData(connection, DataTypes)
