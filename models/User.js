const mongoose = require('mongoose');

// Collection 1: User for GitHub OAuth.
const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true },
    username: { type: String, required: true },
    displayName: { type: String }
});

module.exports = mongoose.model('User', userSchema);
