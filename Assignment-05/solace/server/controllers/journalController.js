const Journal = require('../models/Journal');

// @desc    Create a journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
    try {
        const { title, content, mood } = req.body;
        const journal = new Journal({
            user: req.user._id,
            title: title || 'Mind Dump',
            content,
            mood: mood || 'neutral'
        });
        const created = await journal.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all journals for a user
// @route   GET /api/journals
// @access  Private
const getMyJournals = async (req, res) => {
    try {
        const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get stats for dashboard
// @route   GET /api/journals/stats
// @access  Private
const getJournalStats = async (req, res) => {
    try {
        const count = await Journal.countDocuments({ user: req.user._id });
        res.json({ totalDumps: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createJournal, getMyJournals, getJournalStats };
