const Session = require('../models/Session');

const recordSession = async (req, res) => {
    try {
        const { type, duration, status } = req.body;
        const session = new Session({
            user: req.user._id,
            type,
            duration,
            status
        });
        const createdSession = await session.save();
        res.status(201).json(createdSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get weekly stats
// @route   GET /api/sessions/stats
// @access  Private
const getSessionStats = async (req, res) => {
    try {
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const sessions = await Session.find({
            user: req.user._id,
            createdAt: { $gte: oneWeekAgo }
        });

        const sleepSessions = sessions.filter(s => s.type === 'sleep');
        const focusSessions = sessions.filter(s => s.type === 'focus');
        const breathingSessions = sessions.filter(s => s.type === 'breathing');

        const totalSleepMins = sleepSessions.reduce((acc, s) => acc + s.duration, 0) / 60;
        const totalFocusMins = focusSessions.reduce((acc, s) => acc + s.duration, 0) / 60;

        // Calculate streak (consecutive days with sessions)
        const uniqueDays = new Set(sessions.map(s =>
            new Date(s.createdAt).toISOString().split('T')[0]
        ));

        res.json({
            sleepHours: Math.floor(totalSleepMins / 60),
            sleepMins: Math.round(totalSleepMins % 60),
            focusHours: Math.round(totalFocusMins / 60),
            breathingSessions: breathingSessions.length,
            streak: uniqueDays.size,
            totalSessions: sessions.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { recordSession, getMySessions, getSessionStats };
