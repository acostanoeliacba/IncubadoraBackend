
const express = require('express');
const router = express.Router();
const asistController = require('../controllers/asistcontrollers');

router.post('/asist', asistController.chargeAsist);  
router.get('/asist', asistController.getAllAsist);  
router.get('/asist/:id', asistController.getAsistById);  
router.put('/asist/:id', asistController.updateAsistById);  

module.exports = router;
