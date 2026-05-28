// Security middleware: only allow the request if Passport authenticates the session.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json('Unauthorized');
};

module.exports = { isAuthenticated };
