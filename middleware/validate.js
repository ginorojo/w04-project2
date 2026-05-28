const { body, validationResult } = require('express-validator');

// Reglas exclusivas para POST y PUT de Expense.
const expenseValidationRules = [
    body('title').trim().notEmpty().withMessage('El título es requerido.').isString().withMessage('El título debe ser texto.'),
    body('amount').notEmpty().withMessage('El monto es requerido.').isNumeric().withMessage('El monto debe ser un número.'),
    body('category').trim().notEmpty().withMessage('La categoría es requerida.').isString().withMessage('La categoría debe ser texto.'),
    body('date').notEmpty().withMessage('La fecha es requerida.').isISO8601().withMessage('Debe ser una fecha válida.'),
    body('provider').trim().notEmpty().withMessage('El proveedor es requerido.').isString().withMessage('El proveedor debe ser texto.'),
    body('paymentMethod').trim().notEmpty().withMessage('El método de pago es requerido.').isString().withMessage('El método de pago debe ser texto.'),
    body('status').trim().notEmpty().withMessage('El estado es requerido.').isString().withMessage('El estado debe ser texto.'),
    body('notes').trim().notEmpty().withMessage('Las notas son requeridas.').isString().withMessage('Las notas deben ser texto.')
];

const validateExpense = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    // Devuelve 400 si hay errores de validación en Expense.
    return res.status(400).json({ errors: errors.array() });
};

module.exports = { expenseValidationRules, validateExpense };
