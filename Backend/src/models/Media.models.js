const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['Manga', 'Manhwa', 'Novel', 'Light Novel', 'Visual Novel'] },
    author: { type: String, required: true },
    artist: { type: String, required: false },
    genre: [{ type: String, required: true, enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Supernatural'] }],
    description: { type: String, required: true },
    release_date: { type: Date, required: false },
    status: { type: String, required: true, enum: ['Ongoing', 'Completed', 'Hiatus', 'Cancelled', 'Upcoming'] },
    score: { type: Number, required: false, default: 0 },
    reviewed_by: { type: Number, required: false, default: 0},
    image_covere: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = {
    mediaSchema,
    Media
}