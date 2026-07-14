const Appointment = require('../models/backend_models_Appointment');
const TimeSlot = require('../models/backend_models_TimeSlot');
const Doctor = require('../models/backend_models_Doctor');

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, reason } = req.body;

    if (!doctorId || !date || !timeSlot || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check for double booking
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      timeSlot,
      status: { $ne: 'cancelled' },
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'Time slot already booked' });
    }

    // Create appointment
    const appointment = new Appointment({
      userId: req.userId,
      doctorId,
      date: new Date(date),
      timeSlot,
      reason,
    });

    await appointment.save();
    await appointment.populate('doctorId');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId })
      .populate('doctorId')
      .sort({ date: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const { doctorId, status } = req.query;

    let query = {};
    if (doctorId) query.doctorId = doctorId;
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate('userId', 'name email phone')
      .populate('doctorId')
      .sort({ date: -1 });

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['scheduled', 'completed', 'cancelled', 'no-show'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Only admin or doctor can update appointment status
    if (req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ success: true, message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ success: true, message: 'Appointment cancelled', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ success: false, message: 'Please provide doctorId and date' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const appointmentDate = new Date(date);
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
      appointmentDate.getDay()
    ];

    const daySchedule = doctor.availability[dayOfWeek];

    if (!daySchedule.available) {
      return res.json({ success: true, slots: [] });
    }

    // Generate time slots (30-minute intervals)
    const slots = [];
    const [startHour, startMin] = daySchedule.start.split(':').map(Number);
    const [endHour, endMin] = daySchedule.end.split(':').map(Number);

    let currentTime = new Date(appointmentDate);
    currentTime.setHours(startHour, startMin, 0);

    const endTime = new Date(appointmentDate);
    endTime.setHours(endHour, endMin, 0);

    while (currentTime < endTime) {
      const nextTime = new Date(currentTime);
      nextTime.setMinutes(nextTime.getMinutes() + 30);

      const timeSlotStr = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}-${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`;

      // Check if slot is already booked
      const bookedAppointment = await Appointment.findOne({
        doctorId,
        date: appointmentDate,
        timeSlot: timeSlotStr,
        status: { $ne: 'cancelled' },
      });

      slots.push({
        time: timeSlotStr,
        available: !bookedAppointment,
      });

      currentTime = nextTime;
    }

    res.json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};