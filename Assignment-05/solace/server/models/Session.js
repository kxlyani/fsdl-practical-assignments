const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        enum: ['focus', 'sleep', 'breathing']
    },
    duration: {
        type: Number, // in seconds
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'interrupted'],
        default: 'completed'
    }
}, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
