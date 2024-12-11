// authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateUser  = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'whoisthishuh', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; // Attach user info to request
        next();
    });
};

module.exports = authenticateUser ;