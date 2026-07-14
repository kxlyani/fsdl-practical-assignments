const express = require('express');
const appointmentController = require('../controllers/backend_controllers_appointmentController');
const auth = require('../middleware/backend_middleware_auth');
const roleCheck = require('../middleware/backend_middleware_roleCheck');

const router = express.Router();

router.post('/', auth, appointmentController.bookAppointment);
router.get('/my-appointments', auth, appointmentController.getMyAppointments);
router.get('/available-slots', appointmentController.getAvailableSlots);
router.get('/', auth, roleCheck(['admin']), appointmentController.getAllAppointments);
router.put('/:id/status', auth, roleCheck(['admin']), appointmentController.updateAppointmentStatus);
router.put('/:id/cancel', auth, appointmentController.cancelAppointment);

module.exports = router;