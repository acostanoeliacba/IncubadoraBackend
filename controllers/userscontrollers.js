const { Op } = require('sequelize');
const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');

const multer = require('multer');
const path = require('path');

// const createUser = async (req, res) => {
//     try{
//         const newUser = await User.create(req.body);
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error al crear el usuario' });
//     }
// };

const createUser = async (req, res) => {
  try {
    const {
      nombre, apellido, fecha_nacimiento, direccion,
      telefono, email, password, dni, tipo_usuario, especialidad
    } = req.body;

    const fotoPath = req.file ? `/uploads/${req.file.filename}` : null;
    console.log('Archivo recibido en backend:', req.file);
    const newUser = await User.create({
      nombre,
      apellido,
      fecha_nacimiento,
      direccion,
      telefono,
      email,
      password,
      dni,
      tipo_usuario,
      especialidad,
      foto: fotoPath // nuevo campo
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

//***************************************************************
const getAllUsers = async (req, res) => {
 
    const { nombre, dni ,apellido} = req.query;

    const whereConditions = {};

  //Las uso solo si se envian como parametros
    if (nombre) {
        whereConditions.nombre = { [Op.like]: `%${nombre}%` }; // coincidencia o semejante
    }

    if (dni) {
        whereConditions.dni = dni;
    }

    if (apellido) {
        whereConditions.apellido = { [Op.like]: `%${apellido}%` }; // coincidencia o semejante
    }

    try {
        const users = await User.findAll({ where: whereConditions });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios', details: error.message });
    }

};
//***************************************************************
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);  

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el Usuario' });
    }
};
//***************************************************************
const updateUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return   res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

//***************************************************************
const deleteUsuario = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   const usuarioId = req.params.id;

   try {
    const deleted = await User.destroy({ where: { id_usuario: usuarioId } });

    if (deleted === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(204).send();
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar Usuario ', details: error.message });
}
};

//***************************************************************
const userLogin = async (req, res) => {

  const { email, password } = req.body;
  console.log('Datos recibidos:', req.body);

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas: email no encontrado' });
    }

    // Comparo como si fuera una contraseña encriptada
    const PasswordValido = bcrypt.compareSync(password, user.password);

    // Si no es encriptada, comparo directamente 
    const PasswordTextoValido = user.password === password;

    if (!(PasswordValido || PasswordTextoValido)) {
      return res.status(401).json({ message: 'Credenciales incorrectas: password incorrecto' });
    }

    res.json({ message: 'Login exitoso', 
             user: { id_usuario: user.id_usuario, nombre:user.nombre, apellido:user.apellido,email: user.email,
                     fecha_nacimiento:user.fecha_nacimiento,direccion:user.direccion,
                     telefono:user.telefono ,dni:user.dni, especialidad:user.especialidad,tipo_usuario:user.tipo_usuario,foto:user.foto} });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

//***************************************************************
const LoginconGithub = async (req, res) => {
   if (req.session && req.session.user) {
    const usuario = {
      nombre: req.session.user.displayName,//nota github devuenlve nombre completo no nombre y apellido deveria modificar tabla
      email: req.session.user.emails?.[0]?.value || 'Email no disponible',
      foto: req.session.user.photos?.[0]?.value || null
    };

    return res.status(200).json({ usuario });
  } else {
    return res.status(401).json({ message: 'No hay sesión activa' });
  }
};

//***************************************************************
module.exports = {
    userLogin,
    createUser,
    getAllUsers,
//    buscarUsersFiltrados,
    getUserById,
    updateUserById,
    deleteUsuario,
    LoginconGithub
};
