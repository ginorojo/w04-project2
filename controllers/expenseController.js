const Expense = require('../models/Expense');

// Full CRUD for Expense with try/catch and clear error messages.
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Database error while fetching expenses.' });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }

        res.json(expense);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid expense ID.' });
        }

        res.status(500).json({ message: 'Database error while fetching the expense.' });
    }
};

const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Database error while creating the expense.' });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }

        res.json(expense);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid expense ID.' });
        }

        res.status(500).json({ message: 'Database error while updating the expense.' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }

        res.json({ message: 'Expense deleted successfully.' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid expense ID.' });
        }

        res.status(500).json({ message: 'Database error while deleting the expense.' });
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
