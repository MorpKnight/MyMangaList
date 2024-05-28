const { Media } = require('../models/Media.models');

exports.getHome = async () => {
    try {
        const topRatedManga = await Media.find({ type: 'Manga' }).sort({ score: -1 }).limit(5).exec();
        const topRatedManhwa = await Media.find({ type: 'Manhwa' }).sort({ score: -1 }).limit(5).exec();
        const topRatedNovel = await Media.find({ type: 'Novel' }).sort({ score: -1 }).limit(5).exec();
        const topRatedLightNovel = await Media.find({ type: 'Light Novel' }).sort({ score: -1 }).limit(5).exec();
        const topRatedVisualNovel = await Media.find({ type: 'Visual Novel' }).sort({ score: -1 }).limit(5).exec();
        const newest = await Media.find().sort({ release_date: -1 }).limit(5).exec();
        if (!topRatedManga || !topRatedManhwa || !topRatedNovel || !topRatedLightNovel || !topRatedVisualNovel || !newest) throw new Error('No data found');

        return { message: 'Home data found', data: { topRatedManga, topRatedManhwa, topRatedNovel, topRatedLightNovel, topRatedVisualNovel, newest } };
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