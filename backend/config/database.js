const { Sequelize } = require('sequelize');
const path = require('path');

// Configuración de la base de datos
// Actualmente usando SQLite para desarrollo local sin requerir instalación de servidor MySQL.
// Para cambiar a MySQL, simplemente cambiar el dialecto a 'mysql' y proporcionar host, username y password.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false // Desactivar logs de SQL en la consola para mayor limpieza
});

module.exports = sequelize;
