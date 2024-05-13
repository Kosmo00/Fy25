'use strict';
import { Model, DataTypes } from 'sequelize'
import connection from '../connection'

const initImage = (sequelize, Types) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Image.init({
    in_carousel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upload_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};

export default initImage(connection, DataTypes)
