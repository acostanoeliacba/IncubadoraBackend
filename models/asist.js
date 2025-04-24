const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../db/database.js');

const asist = sequelizeUsers.define('asist', {
    id_asistencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_inscripcion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    estado: {
        type: DataTypes.ENUM('presente', 'ausente', 'justificado'), 
        allowNull: false,
    }
},
{
    tableName: 'Asistencias',  // Nombre de la tabla
    timestamps: false,      
});

module.exports = asist;
