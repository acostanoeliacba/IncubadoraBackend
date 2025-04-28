const express =require('express');
const router = express.Router();
const perfildocente = require('../controllers/perfildocente')


//router.get('/' , (req, res)=>{res.send('Perfil Docente')})
router.get('/', perfildocente.getAllteachers);
router.get('/:id_docente', perfildocente.getSingleTeacher);
router.post('/', perfildocente.createTeacher);
router.put('/:id_docente', perfildocente.updateTeacher);
router.delete('/:id_docente',perfildocente.deleteTeacher);

module.exports = router;