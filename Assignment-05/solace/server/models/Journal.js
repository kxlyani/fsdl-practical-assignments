const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: 'Mind Dump'
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ['calm', 'anxious', 'tired', 'focused', 'neutral'],
        default: 'neutral'
    }
}, {
    timestamps: true
});

const Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;
