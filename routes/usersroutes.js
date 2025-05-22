
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/userscontrollers');
const perfildocenteRoutes = require('../routes/perfildocente')
const perfilalumnoRoutes = require('../routes/perfilalumno')

const passport = require('passport');
const { validateDeleteUsuario } = require('../validations/usuarioValidation');
const { userLoginValidations } = require('../validations/usuarioValidation');
const ManejarErroresValidacion = require('../middleware/ManejarErroresValidacion');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const dni = req.body.dni || 'sin_dni';
    const ext = path.extname(file.originalname);
    cb(null, `${dni}_${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten JPG y PNG.'));
    }
  }
});

router.post('/easy/login', userLoginValidations, ManejarErroresValidacion, usersController.userLogin);
router.post('/easy/create', upload.single('foto'), usersController.createUser);  
router.get('/find', usersController.getAllUsers); 
router.get('/findById/:id', usersController.getUserById);  
router.put('/update/:id', usersController.updateUserById);  
router.delete('/delete/:id', validateDeleteUsuario, usersController.deleteUsuario);
router.use('/perfildocente', perfildocenteRoutes);
router.use('/perfilalumno', perfilalumnoRoutes);


// router.get('/loginGithub', usersController.LoginconGithub);
router.get('/login', passport.authenticate('github'),(req,res)=>{});

router.get('/logout' , function(req , res,next)
{
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/user')
    });
});
//router.use('/pagos', pagosRoutes);

module.exports = router;
