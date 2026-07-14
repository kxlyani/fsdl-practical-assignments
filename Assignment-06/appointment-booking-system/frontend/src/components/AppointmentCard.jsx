import React from 'react';
import { appointmentAPI } from '../services/api';

export default function AppointmentCard({ appointment, onUpdate }) {
  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancelAppointment(appointment._id);
        onUpdate();
      } catch (error) {
        console.error('Error canceling appointment:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Dr. {appointment.doctorId?.name}</h3>
          <p className="text-gray-600">{appointment.doctorId?.specialization}</p>
          <p className="mt-2">
            <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {appointment.timeSlot}
          </p>
          <p>
            <strong>Reason:</strong> {appointment.reason}
          </p>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
          {appointment.status === 'scheduled' && (
            <button
              onClick={handleCancel}
              className="btn-danger mt-2 block"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}