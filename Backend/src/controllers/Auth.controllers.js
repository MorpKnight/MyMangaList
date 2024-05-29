const authServices = require('../services/Auth.services');

exports.register = async (req, res) => {
    try {
        const response = await authServices.register(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const response = await authServices.login(req.body);
        res.cookie('token', response.token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}