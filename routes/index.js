const router = require('express').Router();
const asistenciasRoutes = require('./asistencias');


router.use('/asistencias', asistenciasRoutes);



module.exports = router