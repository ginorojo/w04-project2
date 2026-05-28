const express = require('express');
const expenseController = require('../controllers/expenseController');
const { expenseValidationRules, validateExpense } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

// Public GET routes and protected POST/PUT/DELETE routes for Expense only.
router.get('/', /* #swagger.tags = ['Expense'] */ expenseController.getAllExpenses);
router.get('/:id', /* #swagger.tags = ['Expense'] */ expenseController.getExpenseById);
router.post(
    '/',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Expense data',
        required: true,
        schema: { $ref: '#/definitions/Expense' }
    } */
    isAuthenticated,
    expenseValidationRules,
    validateExpense,
    expenseController.createExpense
);
router.put(
    '/:id',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Expense ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated expense data',
        required: true,
        schema: { $ref: '#/definitions/Expense' }
    } */
    isAuthenticated,
    expenseValidationRules,
    validateExpense,
    expenseController.updateExpense
);
router.delete(
    '/:id',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Expense ID',
        required: true,
        type: 'string'
    } */
    isAuthenticated,
    expenseController.deleteExpense
);

module.exports = router;
