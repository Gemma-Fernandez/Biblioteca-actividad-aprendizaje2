const { body, validationResult } = require('express-validator');

const validarLibro = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isString().withMessage('El título debe ser un texto'),
  body('anio')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage('El año debe ser un número válido (ej. 1998)'),
  body('autor_id')
    .isInt().withMessage('El ID del autor debe ser un número entero'),
  
  // Middleware para comprobar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = { validarLibro };