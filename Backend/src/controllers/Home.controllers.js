const homeServices = require('../services/Home.services');

exports.getHome = async (req, res) => {
    try {
        const response = await homeServices.getHome();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.addMedia = async (req, res) => {
    try {
        const response = await homeServices.addMedia(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}