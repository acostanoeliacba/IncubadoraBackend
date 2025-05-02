const express =require('express');
const router = express.Router();
const pagos = require('../controllers/pagoscontrollers')
const {isAuthenticated} = require('../middleware/autenticacion')


router.get('/', isAuthenticated , pagos.getAllpagos  )
router.get('/:id_usuario',isAuthenticated, pagos.getSinglePago)

module.exports = router;
