const searchServices = require('../services/Search.services');

exports.search = async (req, res) => {
    try {
        const response = await searchServices.search(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.filter = async (req, res) => {
    try {
        const response = await searchServices.filter(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}