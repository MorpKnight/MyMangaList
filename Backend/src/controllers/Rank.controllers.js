const rankServices = require('../services/Rank.services');

exports.getPaginatedRank = async (req, res) => {
    try {
        const response = await rankServices.getPaginatedRank(req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}