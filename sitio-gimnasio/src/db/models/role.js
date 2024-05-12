'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initRole = (sequelize, Types) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'role_id',
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};

export default initRole(connection, DataTypes)
