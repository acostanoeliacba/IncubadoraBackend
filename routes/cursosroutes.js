const express = require('express');
const router = express.Router();
const cursoscontrollers = require('../controllers/cursoscontrollers');

router.get('/', cursoscontrollers.obtenerTodosCursos);
router.get('/info/:id', cursoscontrollers.obtenerCursoporId);
router.post('/', cursoscontrollers.cargaCursos);
router.put('/:id', cursoscontrollers.actualizaCursos);
router.delete('/:id', cursoscontrollers.eliminaCursos);

module.exports = router;
