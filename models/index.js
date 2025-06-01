
const usuarios = require('./user');
const cursos = require('./cursos');
const inscripcion = require('./inscripciones');
const docentecurso = require('./docentecurso');
const pagos = require('./pagos');

// Relaciones inscripcion - cursos
inscripcion.belongsTo(cursos, {
  foreignKey: 'id_curso',
  as: 'curso'
});

cursos.hasMany(inscripcion, {
  foreignKey: 'id_curso',
  as: 'inscripciones'
});

// Usuarios - cursos (muchos a muchos)
usuarios.belongsToMany(cursos, {
  through: docentecurso,
  foreignKey: 'id_usuario',
  otherKey: 'id_curso',
  as: 'cursosAsignados'
});

cursos.belongsToMany(usuarios, {
  through: docentecurso,
  foreignKey: 'id_curso',
  otherKey: 'id_usuario',
  as: 'docentes'
});

// Relaciones pagos - usuarios y cursos
pagos.belongsTo(usuarios, {
  foreignKey: 'id_usuario',
  as: 'usuario'
});

pagos.belongsTo(cursos, {
  foreignKey: 'id_curso',
  as: 'curso'
});

module.exports = {
  usuarios,
  cursos,
  inscripcion,
  docentecurso,
  pagos
};
