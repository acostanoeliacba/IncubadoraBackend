const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../db/database.js');

const Pagos = sequelizeUsers.define('pagos', {
    id_pago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monto:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
    },


},
{
    tableName: 'pagos',  // Nombre de la tabla
    timestamps: false,      
});

module.exports = Pagos;
