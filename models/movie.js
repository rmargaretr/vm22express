'use strict';
const { 
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    snippet(){
      return this.description.substring(0,200);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  Movie.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};