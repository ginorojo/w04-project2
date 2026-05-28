require('dotenv').config();
const fs = require('fs');
const path = require('path');
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
    produces: ['application/json'],
    definitions: {
        Expense: {
            type: 'object',
            required: ['title', 'amount', 'category', 'date', 'provider', 'paymentMethod', 'status', 'notes'],
            properties: {
                title: { type: 'string' },
                amount: { type: 'number' },
                category: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                provider: { type: 'string' },
                paymentMethod: { type: 'string' },
                status: { type: 'string' },
                notes: { type: 'string' }
            }
        },
        MessageResponse: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

const swaggerFilePath = path.join(__dirname, 'swagger.json');

const cleanupSwaggerDocument = () => {
    try {
        const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

        if (swaggerDocument.paths && swaggerDocument.paths['/expenses/{id}'] && swaggerDocument.paths['/{id}']) {
            delete swaggerDocument.paths['/{id}'];
            fs.writeFileSync(swaggerFilePath, `${JSON.stringify(swaggerDocument, null, 2)}\n`);
        }
    } catch (error) {
        // Keep the generated file as-is if cleanup fails.
    }
};

const generateSwagger = async () => {
    await swaggerAutogen(outputFile, endpointsFiles, doc);
    cleanupSwaggerDocument();
};

module.exports = generateSwagger;

if (require.main === module) {
    generateSwagger();
}
