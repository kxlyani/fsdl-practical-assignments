const Doctor = require('../models/backend_models_Doctor');
const User = require('../models/backend_models_User');

exports.createDoctor = async (req, res) => {
  try {
    const { specialization, bio, experience, consultationFee } = req.body;

    if (!specialization || !experience || !consultationFee) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const doctor = new Doctor({
      userId: req.userId,
      specialization,
      bio,
      experience,
      consultationFee,
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: 'Doctor profile created',
      doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;

    let query = { status: 'active' };
    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query).populate('userId', 'name email phone');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone');

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    if (doctor.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    Object.assign(doctor, req.body);
    await doctor.save();

    res.json({ success: true, message: 'Doctor updated', doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};