const { body, validationResult } = require('express-validator');

const validarAutor = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    // Solo letras mayúsculas, minúsculas, acentos, ñ y espacios
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras'),
    
  body('nacionalidad')
    .notEmpty().withMessage('La nacionalidad es obligatoria')
    // Solo letras mayúsculas, minúsculas, acentos, ñ y espacios
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('La nacionalidad solo puede contener letras'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = { validarAutor };