const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const connectDB = require('./config/db');
const configurePassport = require('./config/passport');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();
configurePassport(passport);

const app = express();

// Base middleware required by the rubric.
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

const swaggerFilePath = path.join(__dirname, 'swagger.json');

const loadSwaggerDocument = () => {
    try {
        const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8');
        return JSON.parse(swaggerFile);
    } catch (error) {
        return {
            swagger: '2.0',
            info: {
                title: 'Expense API',
                description: 'Ejecuta npm run swagger para generar swagger.json.'
            },
            paths: {}
        };
    }
};

const swaggerDocument = loadSwaggerDocument();

// Documentation served at /api-docs with swagger-ui-express.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.json({ message: 'Expense REST API is running.' });
});

app.use('/', authRoutes);
app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
