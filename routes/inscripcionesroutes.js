const express = require('express');
const router = express.Router();

const inscripcionesController = require('../controllers/inscripcionescontrollers');

router.post('/', inscripcionesController.cargaInscripcion);  
router.get('/', inscripcionesController.getAllInscripciones);
router.get('/:id', inscripcionesController.getInscripcionById);
router.put('/:id', inscripcionesController.updateInscripcion);
router.delete('/:id', inscripcionesController.deleteInscripcion);

module.exports = router;