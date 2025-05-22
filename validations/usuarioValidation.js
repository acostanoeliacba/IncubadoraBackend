const { param } = require('express-validator');
const { body } = require('express-validator');

exports.validateDeleteUsuario = [
  param('id')
    .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero positivo'),
];

exports.userLoginValidations = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio.')
    .isEmail().withMessage('El email no es válido.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
];