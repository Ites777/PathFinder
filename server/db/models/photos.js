'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Reviews}) {
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Reviews, {foreignKey: 'routes_id'})
    }
  };
  Photos.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    original: {
     type: DataTypes.TEXT,
     allowNull: false,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
     },
  }, {
    sequelize,
    modelName: 'Photos',
  });
  return Photos;
};
