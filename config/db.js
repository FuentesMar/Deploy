import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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
