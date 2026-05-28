const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const configurePassport = require('./config/passport');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();
configurePassport(passport);

const app = express();

// Middlewares base pedidos por la rúbrica.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'session_secret',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

let swaggerDocument = {};

try {
    swaggerDocument = require('./swagger.json');
} catch (error) {
    swaggerDocument = {
        swagger: '2.0',
        info: {
            title: 'Expense API',
            description: 'Ejecuta npm run swagger para generar swagger.json.'
        },
        paths: {}
    };
}

// Documentación servida en /api-docs con swagger-ui-express.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: 'API REST de gastos activa.' });
});

app.use('/', authRoutes);
app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
