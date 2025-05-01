const { Op } = require('sequelize');
const User = require('../models/user');
const Inscripcion = require('../models/inscripciones');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const cargaInscripcion = async (req, res) => {
  console.log('datos:', req.body);
  const { id_usuario, id_curso, fecha_inscripcion } = req.body;

  if (!id_usuario || !id_curso || !fecha_inscripcion) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }

  try {
    const nuevaInscripcion = await Inscripcion.create({
      id_usuario,
      id_curso,
      fecha_inscripcion
    });

    res.status(201).json({
      message: 'Inscripción registrada exitosamente.',
      id_inscripcion: nuevaInscripcion.id_inscripcion
    });
  } catch (error) {
    console.error('Error al registrar inscripción:', error);
    res.status(500).json({ error: 'Error al registrar la inscripción.' });
  }
};

module.exports = {

    cargaInscripcion,
};
