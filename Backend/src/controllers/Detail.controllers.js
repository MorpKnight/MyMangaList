const detailServicees = require('../services/Detail.services');

exports.getMediaDetail = async (req, res) => {
    try {
        const response = await detailServicees.getMediaDetail(req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.addToUserList = async (req, res) => {
    try {
        const response = await detailServicees.addToUserList(req._id, req.params, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.removeFromUserList = async (req, res) => {
    try {
        const response = await detailServicees.removeFromUserList(req._id, req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.addReview = async (req, res) => {
    try {
        const response = await detailServicees.addReview(req._id, req.params, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const response = await detailServicees.updateReview(req._id, req.params, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const response = await detailServicees.deleteReview(req._id, req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getMediaReview = async (req, res) => {
    try {
        const response = await detailServicees.getMediaReview(req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateMediaDetail = async (req, res) => {
    try {
        const response = await detailServicees.updateMediaDetail(req.params, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteMedia = async (req, res) => {
    try {
        const response = await detailServicees.deleteMedia(req.params);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}