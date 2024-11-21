//Back-end/config/db.js
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Carga el archivo .env antes de configurar Sequelize

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

// Aqui pa probar Sequelize para para el .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false, 
  }
);

// Esto es conexion a la DB
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos MySQL con Sequelize');
  })
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
  });

export default sequelize;