const { Media } = require('../models/Media.models');

exports.getHome = async () => {
    try {
        const topRated = await Media.find().sort({ score: -1 }).limit(5).exec();
        const newest = await Media.find().sort({ release_date: -1 }).limit(5).exec();
        if (!topRated || !newest) throw new Error('Error getting home data');

        return { message: 'Home data found', data: { topRated, newest } };
    } catch (error) {
        return { message: error.message }
    }
}

exports.addMedia = async (body) => {
    try {
        const { ...media } = body;
        if (!media.title || !media.type || !media.author || !media.description || !media.status || !media.genre) throw new Error('Please fill all fields');

        const newMedia = new Media({ ...media });
        await newMedia.save();

        return { message: 'Media created successfully', media: newMedia };
    } catch (error) {
        return { message: error.message }
    }
}