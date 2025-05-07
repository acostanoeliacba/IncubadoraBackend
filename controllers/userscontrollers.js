const { Op } = require('sequelize');
const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//tabla usuarios es destino
const createUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

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

const updateUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return   res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.update(req.body);
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

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


//**************************
const userLoginValidations = [
  body('email')
    .isEmail().withMessage('El email no es válido.')
    .notEmpty().withMessage('El email es obligatorio.'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
];

const userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Datos recibidos:', req.body);

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas: email no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas: password incorrecto' });
    }

    res.json({ message: 'Login exitoso', 
             user: { id: user.id_usuario, nombre:user.nombre, apellido:user.apellido,email: user.email,
                     fecha_nacimiento:user.fecha_nacimiento,direccion:user.direccion,
                     telefono:user.telefono ,dni:user.dni, especialidad:user.especialidad,tipo_usuario:user.tipo_usuario} });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};



module.exports = {
    userLogin,
    userLoginValidations,
    createUser,
    getAllUsers,
//    buscarUsersFiltrados,
    getUserById,
    updateUserById,
    deleteUsuario

};
