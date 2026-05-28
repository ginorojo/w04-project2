// Middleware de seguridad: solo deja pasar si Passport autentica la sesión.
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json("No autorizado");
};

module.exports = { isAuthenticated };
