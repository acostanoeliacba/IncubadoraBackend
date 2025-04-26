const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../db/database.js');
//tabla usuarios reemplasara a  tabla alumno y tabla docente
const users = sequelizeUsers.define('users', {
    id_docente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    docenteName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docenteLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docenteEspeciality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docentePassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docenteEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    docenteTelefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    docenteDni: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    tableName: 'Docentes',  // Nombre de la tabla
    timestamps: false,      
});
module.exports = users;
