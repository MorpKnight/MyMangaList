const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header.cookie.split('=')[1];
        if (!token) throw new Error('Authentication failed');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req._id = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}