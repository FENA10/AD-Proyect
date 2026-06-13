const bcrypt = require('bcrypt');
const { sequelize, User } = require('./models');

async function seedAdmin() {
  try {
    await sequelize.sync();
    
    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        password: hashedPassword,
        role: 'superadmin'
      });
      console.log('Usuario admin creado con éxito (admin / admin123)');
    } else {
      console.log('El usuario admin ya existe');
    }
  } catch (error) {
    console.error('Error al poblar usuario admin:', error);
  } finally {
    process.exit();
  }
}

seedAdmin();
