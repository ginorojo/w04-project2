const { Strategy: GitHubStrategy } = require('passport-github2');
const User = require('../models/User');

// GitHub OAuth 2.0 configuration to store the user in MongoDB.
const configurePassport = (passport) => {
    passport.use(new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.HOST || 'http://localhost:3000'}/github/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ githubId: profile.id });

                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        username: profile.username || profile.id,
                        displayName: profile.displayName || ''
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

module.exports = configurePassport;
