const mongoose = require('mongoose');
const { mediaGenreSchema } = require('./MediaGenre.models');

const mediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true, enum: ['Manga', 'Manhwa', 'Novel', 'Light Novel', 'Visual Novel'] },
    author: { type: String, required: true },
    artist: { type: String, required: true },
    genre: [{ type: mediaGenreSchema }],
    description: { type: String, required: true },
    release_date: { type: Date, required: false },
    status: { type: String, required: true, enum: ['Ongoing', 'Completed', 'Hiatus', 'Cancelled'] },
    image_covere: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = {
    mediaSchema,
    Media
}