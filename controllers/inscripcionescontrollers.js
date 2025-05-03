const { Op } = require('sequelize');
const Inscripcion = require('../models/inscripciones');

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

const getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll();
    res.status(200).json(inscripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener inscripciones.' });
  }
};

const getInscripcionById = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id);

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada.' });
    }

    res.status(200).json(inscripcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar inscripción.' });
  }
};

const updateInscripcion = async (req, res) => {
  const { id_usuario, id_curso, fecha_inscripcion } = req.body;

  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id);

    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada.' });
    }

    await inscripcion.update({ id_usuario, id_curso, fecha_inscripcion });

    res.status(200).json({ message: 'Inscripción actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar inscripción.' });
  }
};

const deleteInscripcion = async (req, res) => {
  try {
    const deleted = await Inscripcion.destroy({ where: { id_inscripcion: req.params.id } });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada.' });
    }

    res.status(204).send(); // Eliminado sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar inscripción.' });
  }
};

module.exports = {
    cargaInscripcion,
    getAllInscripciones,
    getInscripcionById,
    updateInscripcion,
    deleteInscripcion
};
