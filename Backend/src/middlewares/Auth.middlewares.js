const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split('=')[1];
        if (!token) throw new Error('Authentication failed');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req._id = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.role !== 'Admin') throw new Error('Unauthorized');
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}