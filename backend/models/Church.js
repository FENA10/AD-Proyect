const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Church = sequelize.define('Church', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  schedule: {
    type: DataTypes.TEXT
  },
  departments: {
    type: DataTypes.TEXT
  }
});

module.exports = Church;
