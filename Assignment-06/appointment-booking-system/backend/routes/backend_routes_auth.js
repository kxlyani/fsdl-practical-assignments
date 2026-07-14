const express = require('express');
const authController = require('../controllers/backend_controllers_authController');
const auth = require('../middleware/backend_middleware_auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, authController.getProfile);

module.exports = router;