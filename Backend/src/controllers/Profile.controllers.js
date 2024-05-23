const profileServices = require('../services/Profile.services');

exports.getUserProfile = async (req, res) => {
    try {
        const response = await profileServices.getUserProfile(req._id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const response = await profileServices.updateUserProfile(req._id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteUserProfile = async (req, res) => {
    try {
        const response = await profileServices.deleteUserProfile(req._id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.viewUserList = async (req, res) => {
    try {
        const response = await profileServices.viewUserList(req._id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.viewReview = async (req, res) => {
    try {
        const response = await profileServices.viewReview(req._id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}