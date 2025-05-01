const express =require('express');
const router = express.Router();
const pagos = require('../controllers/pagoscontrollers')


router.get('/', pagos.getAllpagos  )
router.get('/:id_usuario', pagos.getSinglePago)

module.exports = router;
