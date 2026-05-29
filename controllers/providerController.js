const Provider = require('../models/Provider');

const getAllProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: 'Database error while fetching providers.' });
    }
};

const getProviderById = async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found.' });
        }

        res.json(provider);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid provider ID.' });
        }

        res.status(500).json({ message: 'Database error while fetching the provider.' });
    }
};

const createProvider = async (req, res) => {
    try {
        const provider = await Provider.create(req.body);
        res.status(201).json(provider);
    } catch (error) {
        res.status(500).json({ message: 'Database error while creating the provider.' });
    }
};

const updateProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found.' });
        }

        res.json(provider);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid provider ID.' });
        }

        res.status(500).json({ message: 'Database error while updating the provider.' });
    }
};

const deleteProvider = async (req, res) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found.' });
        }

        res.json({ message: 'Provider deleted successfully.' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid provider ID.' });
        }

        res.status(500).json({ message: 'Database error while deleting the provider.' });
    }
};

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProvider,
    deleteProvider
};
