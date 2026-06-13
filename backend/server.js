require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const apiRoutes = require('./routes/api');
const { router: authRoutes } = require('./routes/auth');
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// Rutas Básicas de Prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Asambleas de Dios G.E. funcionando correctamente.' });
});

// Sincronizar Base de Datos y Levantar Servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos SQLite sincronizada correctamente.');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});
