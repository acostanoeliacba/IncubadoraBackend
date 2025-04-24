const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar las variables de entorno del archivo .env


// Conexión con la base de datos de usuarios (db_users)
const sequelizeUsers = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Desactiva el log si no lo necesitas
});

module.exports = { sequelizeUsers };
