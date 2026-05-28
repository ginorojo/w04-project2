require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Expense API',
        description: 'API REST con CRUD de gastos, validación, Swagger y OAuth GitHub.'
    },
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './routes/expenseRoutes.js', './routes/authRoutes.js'];

// Genera swagger.json a partir de los endpoints del proyecto.
swaggerAutogen(outputFile, endpointsFiles, doc);
