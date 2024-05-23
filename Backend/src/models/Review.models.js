const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    review_text: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {
    reviewSchema,
    Review
}