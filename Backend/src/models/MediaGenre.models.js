const mongoose = require('mongoose');

const mediaGenreSchema = new mongoose.Schema({
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
});

const MediaGenre = mongoose.model('MediaGenre', mediaGenreSchema);

module.exports = {
    mediaGenreSchema,
    MediaGenre
}