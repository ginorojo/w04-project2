const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Conexión a MongoDB para las colecciones User y Expense.
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
