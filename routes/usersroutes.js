
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontrollers');
const inscripcionesController = require('../controllers/inscripcionescontrollers');

const { userLoginValidations } = require('../controllers/userscontrollers');  
const { verifyToken } = require('../controllers/userscontrollers');  
const perfildocenteRoutes = require('../routes/perfildocente')
const perfilalumnoRoutes = require('../routes/perfilalumno')


router.post('/users/login', userLoginValidations,usersController.userLogin);  
router.post('/users', usersController.createUser);  
router.get('/users', usersController.getAllUsers);  
router.get('/users/:id', usersController.getUserById);  
router.put('/users/:id', usersController.updateUserById);  
router.post('/users/inscripcion', inscripcionesController.cargaInscripcion);  
// router.get('/users/:id', verifyToken,usersController.getUserById);  
// router.put('/users/:id', verifyToken,  usersController.updateUserById);  


router.use('/perfildocente', perfildocenteRoutes);

router.use('/perfilalumno', perfilalumnoRoutes);

module.exports = router;
