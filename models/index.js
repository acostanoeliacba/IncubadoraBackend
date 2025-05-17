  

const cursos = require('./cursos');

const inscripcion = require('./inscripciones');

  inscripcion.belongsTo(cursos, {
    foreignKey: 'id_curso',
    as: 'curso'
  });

  cursos.hasMany(inscripcion, {
     foreignKey: 'id_curso',
     as: 'inscripciones'
  });

module.exports = {
  cursos,
  inscripcion
};