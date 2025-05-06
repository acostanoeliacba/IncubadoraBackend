
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userscontrollers');
const perfildocenteRoutes = require('../routes/perfildocente')
const perfilalumnoRoutes = require('../routes/perfilalumno')

const { validateDeleteUsuario } = require('../validations/usuarioValidation');
const { userLoginValidations } = require('../validations/usuarioValidation');


router.post('/easy/login', userLoginValidations, usersController.userLogin);
router.post('/easy/create', usersController.createUser);  
router.get('/find', usersController.getAllUsers); 
router.get('/findById/:id', usersController.getUserById);  
router.put('/update/:id', usersController.updateUserById);  
router.delete('/delete/:id', validateDeleteUsuario, usersController.deleteUsuario);
router.use('/perfildocente', perfildocenteRoutes);
router.use('/perfilalumno', perfilalumnoRoutes);

module.exports = router;
