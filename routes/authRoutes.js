const express = require('express');
const passport = require('passport');

const router = express.Router();

// Rutas OAuth pedidas: /login, /github/callback y /logout.
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
            res.json({ message: 'Sesión cerrada correctamente.' });
        });
    });
});

module.exports = router;
