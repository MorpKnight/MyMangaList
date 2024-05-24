const { Media } = require('../models/Media.models');

exports.getPaginatedRank = async (params) => {
    try {
        const { page } = params;
        const limit = 25;
        const offset = (page - 1) * limit;
        const media = await Media.find().sort({ score: -1 }).skip(offset).limit(limit).exec();

        return { message: 'Rank found', data: media };
    } catch (error) {
        return { message: error.message }
    }
}