const express = require('express');
const router = express.Router();
const pagosAdminController = require('../controllers/pagosAdmin.controller');

const { isAuthenticated, verificarAdmin } = require('../middleware/autenticacion');

router.get('/', pagosAdminController.obtenerPagosAdmin);

router.get('/total', pagosAdminController.obtenerTotalPagos);

router.get('/totales-por-mes', pagosAdminController.obtenerTotalesPorMes);

module.exports = router;
