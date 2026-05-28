const mongoose = require('mongoose');

// Colección 1: User para OAuth vía GitHub.
const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true },
    username: { type: String, required: true },
    displayName: { type: String }
});

module.exports = mongoose.model('User', userSchema);
