const mongoose = require('mongoose');

// Collection 2: Expense with the required rubric fields.
const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    provider: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    notes: { type: String, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);
