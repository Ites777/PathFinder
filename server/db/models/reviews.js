'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
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
  Reviews.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'actions_unique'
    },
    routes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'actions_unique'
    },
    text: {
     type: DataTypes.TEXT,
     allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
