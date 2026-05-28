const express = require('express');
const passport = require('passport');

const router = express.Router();

// Required OAuth routes: /login, /github/callback, and /logout.
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }

        req.session.destroy(() => {
            res.json({ message: 'Session closed successfully.' });
        });
    });
});

module.exports = router;
