const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide appointment date'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Please select a time slot'],
      // Format: "HH:MM-HH:MM"
    },
    reason: {
      type: String,
      required: [true, 'Please provide reason for appointment'],
      maxlength: [300, 'Reason cannot exceed 300 characters'],
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index to prevent double booking
appointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1, status: { $ne: 'cancelled' } });

module.exports = mongoose.model('Appointment', appointmentSchema);