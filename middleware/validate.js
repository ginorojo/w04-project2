const { body, validationResult } = require('express-validator');

// Validation rules exclusively for POST and PUT Expense routes.
const expenseValidationRules = [
    body('title').trim().notEmpty().withMessage('Title is required.').isString().withMessage('Title must be text.'),
    body('amount').notEmpty().withMessage('Amount is required.').isNumeric().withMessage('Amount must be a number.'),
    body('category').trim().notEmpty().withMessage('Category is required.').isString().withMessage('Category must be text.'),
    body('date').notEmpty().withMessage('Date is required.').isISO8601().withMessage('Date must be valid.'),
    body('provider').trim().notEmpty().withMessage('Provider is required.').isString().withMessage('Provider must be text.'),
    body('paymentMethod').trim().notEmpty().withMessage('Payment method is required.').isString().withMessage('Payment method must be text.'),
    body('status').trim().notEmpty().withMessage('Status is required.').isString().withMessage('Status must be text.'),
    body('notes').trim().notEmpty().withMessage('Notes are required.').isString().withMessage('Notes must be text.')
];

const validateExpense = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    // Returns 400 when Expense validation fails.
    return res.status(400).json({ errors: errors.array() });
};

module.exports = { expenseValidationRules, validateExpense };
