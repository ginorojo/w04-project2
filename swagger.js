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
            title: 'Lunch with client',
            amount: 24.5,
            category: 'Food',
            date: '2026-05-28T12:30:00.000Z',
            provider: 'Uber Eats',
            paymentMethod: 'Credit Card',
            status: 'Paid',
            notes: 'Sample expense used in Swagger UI'
        },
        Provider: {
            name: 'Fast Delivery Express',
            contactEmail: 'logistics@fastdelivery.com',
            serviceType: 'Shipping',
            isActive: true
        },
        MessageResponse: {
            message: 'Expense deleted successfully.'
        },
        ProviderMessageResponse: {
            message: 'Provider deleted successfully.'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

const swaggerFilePath = path.join(__dirname, 'swagger.json');

const cleanupSwaggerDocument = () => {
    try {
        const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

        if (swaggerDocument.paths && swaggerDocument.paths['/{id}']) {
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
