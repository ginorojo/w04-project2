const express = require('express');
const expenseController = require('../controllers/expenseController');
const { expenseValidationRules, validateExpense } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

// GET públicos y POST/PUT/DELETE protegidos solo para Expense.
router.get('/', /* #swagger.tags = ['Expense'] */ expenseController.getAllExpenses);
router.get('/:id', /* #swagger.tags = ['Expense'] */ expenseController.getExpenseById);
router.post(
    '/',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos del gasto',
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
        description: 'ID del gasto',
        required: true,
        type: 'string'
    } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos actualizados del gasto',
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
        description: 'ID del gasto',
        required: true,
        type: 'string'
    } */
    isAuthenticated,
    expenseController.deleteExpense
);

module.exports = router;
