
const { Op } = require('sequelize');
const Cursos = require('../models/cursos');


const cargaCursos = async (req, res) => {
  try {
    const curso = await Cursos.create(req.body);
    res.status(201).json(curso);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const obtenerTodosCursos = async (req, res) => {
  //obtiene ,por nombre similar ; por omicion todos los cursos
  const { nombre } = req.query;
  try {
    const cursos = await Cursos.findAll({
      where: nombre ? {
        nombre_curso: { [Op.like]: `%${nombre}%` }
      } : undefined
    });
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const obtenerCursoporId = async (req, res, next) => {
    
    try {
        const idCurso = req.params.id; 
        if (!Number.isInteger(Number(idCurso))) {
            return res.status(400).json({ error: "Ingresa id de curso numerico" });
        }
        const curso = await Cursos.findOne({ where: { id_curso: idCurso} });

        if (!curso) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error tratando de encontrar informacion del curso", error });
    }
};

const actualizaCursos = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Cursos.update(req.body, {
      where: { id_curso: id }
    });

    if (updated) {
      const curso = await Cursos.findByPk(id);
      res.json(curso);
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const eliminaCursos = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cursos.destroy({
      where: { id_curso: id }
    });

    if (deleted) {
      res.json({ mensaje: 'Curso eliminado' });
    } else {
      res.status(404).json({ error: 'Curso no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    cargaCursos,
    obtenerTodosCursos,
    actualizaCursos,
    eliminaCursos,
    obtenerCursoporId
};
