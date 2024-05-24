const { List } = require('../models/List.models');
const { Media } = require('../models/Media.models');

exports.getMediaDetail = async (params) => {
    try {
        const { id } = params;
        const media = await Media.findById(id).exec();
        if (!media) throw new Error('Media not found');

        return { message: 'Media found', data: media };
    } catch (error) {
        return { message: error.message }
    }
};

exports.addToUserList = async (user_id, params, body) => {
    try {
        const { id } = params;
        const { status, score, start_date, end_date } = body;
        if (!status) throw new Error('Please provide status');
        if (!['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'].includes(status)) throw new Error('Invalid status');
        if (score && (score < 1 || score > 10)) throw new Error('Invalid score');
        const media = await Media.findById(id).exec();
        if (!media) throw new Error('Media not found');
        const list = await List.findOne({ user_id, media_id:id }).exec();
        if (list) throw new Error('Media already in list');

        const newList = new List({ user_id, media_id: id, status });
        // TODO: MASIH SALAH BJIR GABISA NARUH SCORE
        if (score) {
            newList.score = score;
            media.score = (media.score * media.reviewed_by + score) / (media.reviewed_by + 1);
            media.reviewed_by += 1;
            await media.save();
        }
        if (start_date) newList.start_date = start_date;
        if (end_date) newList.end_date = end_date;
        await newList.save();

        return { message: 'Media added to list successfully', data: newList };
    } catch (error) {
        return { message: error.message }
    }
};

exports.removeFromUserList = async (user_id, params) => {
    try {
        const { id } = params;
        const list = await List.findOneAndDelete({ user_id, media_id: id }).exec();
        if (!list) throw new Error('Media not in list');

        return { message: 'Media removed from list successfully' };
    } catch (error) {
        return { message: error.message }
    }
}

exports.addReview = async (user_id, params, body) => {
    try {
        const { id } = params;
        const { review_text } = body;
        if (!review_text) throw new Error('Please provide review text');
        const media = await Media.findById(id).exec();
        if (!media) throw new Error('Media not found');
        const list = await List.findOne({ user_id, media_id: id }).exec();
        if (!list) throw new Error('Media not in list');

        list.review_text = review_text;
        await list.save();

        return { message: 'Review added successfully', data: list };
    } catch (error) {
        return { message: error.message }
    }
};

exports.updateReview = async (user_id, params, body) => {
    try {
        const { id } = params;
        const { review_text } = body;
        if (!review_text) throw new Error('Please provide review text');
        const list = await List.findOne({ user_id, media_id: id }).exec();
        if (!list) throw new Error('Media not in list');

        list.review_text = review_text;
        await list.save();

        return { message: 'Review updated successfully', data: list };
    } catch (error) {
        return { message: error.message }
    }
}

exports.deleteReview = async (user_id, params) => {
    try {
        const { id } = params;
        const list = await List.findOne({ user_id, media_id: id }).exec();
        if (!list) throw new Error('Media not in list');

        list.review_text = undefined;
        await list.save();

        return { message: 'Review deleted successfully' };
    } catch (error) {
        return { message: error.message }
    }
}

exports.getMediaReview = async (params) => {
    try {
        const { id } = params;
        const reviews = await List.find({ media_id: id }).exec();
        if (!reviews) throw new Error('No reviews found');

        return { message: 'Reviews found', data: reviews };
    } catch (error) {
        return { message: error.message }
    }
}

exports.updateMediaDetail = async (params, body) => {
    try {
        const { id } = params;
        const { ...media } = body;
        const updatedMedia = await Media.findByIdAndUpdate(id, { ...media, updated_at: Date.now() }, { new: true }).exec();
        
        if (!updatedMedia) throw new Error('Media not found');

        return { message: 'Media updated successfully', data: updatedMedia };
    } catch (error) {
        return { message: error.message }
    }
};

exports.deleteMedia = async (params) => {
    try {
        const { id } = params;
        const media = await Media.findByIdAndDelete(id).exec();
        if (!media) throw new Error('Media not found');

        return { message: 'Media deleted successfully' };
    } catch (error) {
        return { message: error.message }
    }
};