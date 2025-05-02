
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userscontrollers');
const { userLoginValidations } = require('../controllers/userscontrollers');  
const { verifyToken } = require('../controllers/userscontrollers');  
const perfildocenteRoutes = require('../routes/perfildocente')
const pagosRoutes = require('../routes/pagosroutes')
const passport = require('passport');

router.post('/users/login', userLoginValidations,usersController.userLogin);  
router.post('/users', usersController.createUser);  
router.get('/users', usersController.getAllUsers);  
router.get('/users/:id', usersController.getUserById);  
router.put('/users/:id', usersController.updateUserById);  
// router.get('/users/:id', verifyToken,usersController.getUserById);  
// router.put('/users/:id', verifyToken,  usersController.updateUserById);  


router.use('/perfildocente', perfildocenteRoutes);
router.use('/pagos', pagosRoutes);

router.get('/users/login', passport.authenticate('github'),(req,res)=>{});
router.get('/logout' , function(req , res,next)
{
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/')
    });
});

module.exports = router;
