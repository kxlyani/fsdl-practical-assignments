const express = require('express');
const router = express.Router();
const { createJournal, getMyJournals, getJournalStats } = require('../controllers/journalController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createJournal).get(protect, getMyJournals);
router.get('/stats', protect, getJournalStats);

module.exports = router;
