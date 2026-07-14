const express = require('express');
const router = express.Router();
const { recordSession, getMySessions, getSessionStats } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, recordSession).get(protect, getMySessions);
router.get('/stats', protect, getSessionStats);

module.exports = router;
