const Contenido = require('../models/contenido');
const { Op } = require('sequelize');


const obtenerAllContenidos = async (req, res) => {
  try {
    const data = await Contenido.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const obtenerContenidosById = async (req, res) => {
  try {
    const data = await Contenido.findByPk(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Contenido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Obtener todos los contenido de un curso por id_curso
const contenidosByCursoById = async (req, res) => {
   try {
      
      const idCurso = parseInt(req.params.id, 10);

      const data = await Contenido.findAll({
        where: {id_curso: idCurso } 
      });
        if (data.length > 0){
          res.json(data);
        } else {
          res.status(404).json({ error: 'Contenido no encontrado' });
        }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


const crearContenido = async (req, res) => {
  try {
    const nuevo = await Contenido.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const actualizarContenido = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    if (!contenido) return res.status(404).json({ error: 'Contenido no encontrado' });

    await contenido.update(req.body);
    res.json(contenido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    obtenerAllContenidos,
    obtenerContenidosById,
    crearContenido,
    actualizarContenido,
    contenidosByCursoById
};
