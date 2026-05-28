require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const defaultBaseUrl = `http://localhost:${process.env.PORT || 3000}`;
const configuredBaseUrl = process.env.RENDER_EXTERNAL_URL || process.env.HOST || defaultBaseUrl;
const normalizedBaseUrl = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(configuredBaseUrl)
    ? configuredBaseUrl
    : `http://${configuredBaseUrl}`;
const parsedBaseUrl = new URL(normalizedBaseUrl);

const doc = {
    info: {
        title: 'Expense API',
        description: 'REST API with expense CRUD, validation, Swagger, and GitHub OAuth.'
    },
    host: parsedBaseUrl.host,
    schemes: [parsedBaseUrl.protocol.replace(':', '')],
    consumes: ['application/json'],
    produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './routes/expenseRoutes.js', './routes/authRoutes.js'];

// Generates swagger.json from the project endpoints.
swaggerAutogen(outputFile, endpointsFiles, doc);
