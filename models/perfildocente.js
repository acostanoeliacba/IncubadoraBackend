const { DataTypes } = require('sequelize');
const { sequelizeUsers } = require('../db/database.js');

const Teacher =  sequelizeUsers.define( 'docentes',{
    id_docente: {type: DataTypes.INTEGER , allowNull: false , primaryKey: true,autoIncrement: true },
    nombre: {type: DataTypes.STRING,  allowNull: false},
    apellido: {type: DataTypes.STRING,  allowNull: false},
    especialidad: {type: DataTypes.STRING,  allowNull: false},
    email: {type: DataTypes.STRING,  allowNull: false},
    telefono: {type: DataTypes.STRING,  allowNull: false},

},

{
    tableName: 'docentes',  
    timestamps: false,      
});


module.exports = Teacher;