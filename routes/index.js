const router = require('express').Router();
const asistenciasRoutes = require('./asistencias');
const perfildocenteRoutes = require('./perfildocente')


router.use('/asistencias', asistenciasRoutes);
router.use('/perfildocente', perfildocenteRoutes);


module.exports = router