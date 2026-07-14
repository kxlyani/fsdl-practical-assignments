const express = require('express');
const doctorController = require('../controllers/backend_controllers_doctorController');
const auth = require('../middleware/backend_middleware_auth');
const roleCheck = require('../middleware/backend_middleware_roleCheck');

const router = express.Router();

router.post('/', auth, roleCheck(['admin']), doctorController.createDoctor);
router.get('/', doctorController.getDoctors);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', auth, roleCheck(['admin']), doctorController.updateDoctor);
router.delete('/:id', auth, roleCheck(['admin']), doctorController.deleteDoctor);

module.exports = router;