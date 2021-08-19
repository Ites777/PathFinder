'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Reference, Photos, Reviews}) {
      this.hasMany(Reference, {foreignKey: "routes_id"})
      this.hasMany(Photos, {foreignKey: "routes_id"})
      this.hasMany(Reviews, {foreignKey: "routes_id"})
    }
  };
  Routes.init({
    url: {
      type: DataTypes.STRING,
    },// +Roma аналогичное поле в миграции и в сидере!
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lat: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    lng: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Routes',
  });
  return Routes;
};
