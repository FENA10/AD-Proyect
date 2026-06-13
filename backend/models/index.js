const sequelize = require('../config/database');
const Church = require('./Church');
const Pastor = require('./Pastor');
const News = require('./News');
const HelpRequest = require('./HelpRequest');
const ContactMessage = require('./ContactMessage');
const Contribution = require('./Contribution');
const User = require('./User');

// Relaciones
// Una iglesia tiene muchos pastores (Titular, Asociado, Jóvenes)
Church.hasMany(Pastor, { foreignKey: 'churchId' });
Pastor.belongsTo(Church, { foreignKey: 'churchId' });

module.exports = {
  sequelize,
  Church,
  Pastor,
  News,
  HelpRequest,
  ContactMessage,
  Contribution,
  User
};
