const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    serviceType: { type: String, required: true },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Provider', providerSchema);
