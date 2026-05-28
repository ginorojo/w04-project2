const Expense = require('../models/Expense');

// CRUD completo para Expense con try/catch y errores claros.
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error de base de datos al obtener los gastos.' });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Gasto no encontrado.' });
        }

        res.json(expense);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de gasto inválido.' });
        }

        res.status(500).json({ message: 'Error de base de datos al obtener el gasto.' });
    }
};

const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error de base de datos al crear el gasto.' });
    }
};

const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!expense) {
            return res.status(404).json({ message: 'Gasto no encontrado.' });
        }

        res.json(expense);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de gasto inválido.' });
        }

        res.status(500).json({ message: 'Error de base de datos al actualizar el gasto.' });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Gasto no encontrado.' });
        }

        res.json({ message: 'Gasto eliminado correctamente.' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'ID de gasto inválido.' });
        }

        res.status(500).json({ message: 'Error de base de datos al eliminar el gasto.' });
    }
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
