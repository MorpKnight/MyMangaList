const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    status: { type: String, required: true, enum: ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'] },
    score: { type: Number, required: false, min: 1, max: 10 },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const List = mongoose.model('List', listSchema);

module.exports = {
    listSchema,
    List
}