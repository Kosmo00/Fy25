'use strict';
import { Model, DataTypes } from 'sequelize';
import connection from '../connection';
const initUsers = (sequelize, Types) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING, //
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING, //
      allowNull: false
    },
    password: {
      type: DataTypes.STRING, //
      allowNull: false
    },
    CI: {
      type: DataTypes.STRING, //
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING, //
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING, //
      allowNull: false,
      unique: true
    },
    profile_image: {
      type: DataTypes.STRING, //
      allowNull: false
    },
    notify_whatsapp: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    notify_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    verified_email: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'role',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

export default initUsers(connection, DataTypes)