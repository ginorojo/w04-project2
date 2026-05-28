const express = require('express');
const expenseController = require('../controllers/expenseController');
const { expenseValidationRules, validateExpense } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

// Public GET routes and protected POST/PUT/DELETE routes for Expense only.
router.get(
    '/',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.summary = 'Get all expenses' */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: [ { $ref: '#/definitions/Expense' } ]
    } */
    expenseController.getAllExpenses
);
router.get(
    '/:id',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.summary = 'Get an expense by ID' */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Expense ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/Expense' }
    } */
    expenseController.getExpenseById
);
router.post(
    '/',
    /* #swagger.tags = ['Expense'] */
    /* #swagger.summary = 'Create an expense' */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Expense data',
        required: true,
        schema: { $ref: '#/definitions/Expense' }
    } */
    /* #swagger.responses[201] = {
        description: 'Created',
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
    /* #swagger.summary = 'Update an expense' */
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
    /* #swagger.responses[200] = {
        description: 'OK',
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
    /* #swagger.summary = 'Delete an expense' */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Expense ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/MessageResponse' }
    } */
    isAuthenticated,
    expenseController.deleteExpense
);

module.exports = router;
