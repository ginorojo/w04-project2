const express = require('express');
const providerController = require('../controllers/providerController');
const { providerValidationRules, validateProvider } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

router.get(
    '/',
    /* #swagger.tags = ['Provider'] */
    /* #swagger.summary = 'Get all providers' */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: [ { $ref: '#/definitions/Provider' } ]
    } */
    providerController.getAllProviders
);

router.get(
    '/:id',
    /* #swagger.tags = ['Provider'] */
    /* #swagger.summary = 'Get a provider by ID' */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Provider ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/Provider' }
    } */
    providerController.getProviderById
);

router.post(
    '/',
    /* #swagger.tags = ['Provider'] */
    /* #swagger.summary = 'Create a provider' */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Provider data',
        required: true,
        schema: { $ref: '#/definitions/Provider' }
    } */
    /* #swagger.responses[201] = {
        description: 'Created',
        schema: { $ref: '#/definitions/Provider' }
    } */
    isAuthenticated,
    providerValidationRules,
    validateProvider,
    providerController.createProvider
);

router.put(
    '/:id',
    /* #swagger.tags = ['Provider'] */
    /* #swagger.summary = 'Update a provider' */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Provider ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated provider data',
        required: true,
        schema: { $ref: '#/definitions/Provider' }
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/Provider' }
    } */
    isAuthenticated,
    providerValidationRules,
    validateProvider,
    providerController.updateProvider
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Provider'] */
    /* #swagger.summary = 'Delete a provider' */
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Provider ID',
        required: true,
        type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'OK',
        schema: { $ref: '#/definitions/ProviderMessageResponse' }
    } */
    isAuthenticated,
    providerController.deleteProvider
);

module.exports = router;
