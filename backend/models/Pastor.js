const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pastor = sequelize.define('Pastor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Pastor Titular'
  }
});

module.exports = Pastor;
