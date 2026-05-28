require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Expense API',
        description: 'REST API with expense CRUD, validation, Swagger, and GitHub OAuth.'
    },
    host: `localhost:${process.env.PORT || 3000}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './routes/expenseRoutes.js', './routes/authRoutes.js'];

// Generates swagger.json from the project endpoints.
swaggerAutogen(outputFile, endpointsFiles, doc);
