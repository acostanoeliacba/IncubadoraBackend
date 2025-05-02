
const express = require('express');
const router = express.Router();
const asistenciasControllers = require('../controllers/asistenciascontrollers');

router.post('/asist', asistenciasControllers.chargeAsist);  
router.get('/asist', asistenciasControllers.getAllAsist);  
router.get('/asist/:id', asistenciasControllers.getAsistById);  
router.put('/asist/:id', asistenciasControllers.updateAsistById);  

module.exports = router;
