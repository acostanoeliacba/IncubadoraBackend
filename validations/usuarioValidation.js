const { param } = require('express-validator');
const { body } = require('express-validator');

exports.validateDeleteUsuario = [
  param('id')
    .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero positivo'),
];

exports.userLoginValidations = [
  body('email')
    .isEmail().withMessage('El email no es válido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];