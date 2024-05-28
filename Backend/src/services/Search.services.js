const { Media } = require('../models/Media.models');

exports.search = async (query) => {
    try {
        const { search } = query;
        if (!search) return { message: 'Please provide a search query' }
        const result = await Media.find({ $text: { $search: search } }).exec();
        if (result.length === 0) return { message: 'No results found' }

        return { message: 'Search results', data: result }
    } catch (error) {
        return { message: error.message }
    }
}

exports.filter = async (query) => {
    try {
        const { genre, rating, year } = query;
        const filter = {};
        if (genre) filter.genre = genre;
        if (rating) filter.rating = rating;
        if (year) filter.year = year;

        const result = await Media.find(filter).exec();
        if (result.length === 0) return { message: 'No results found' }

        return { message: 'Filter results', data: result }
    } catch (error) {
        return { message: error.message }
    }
}