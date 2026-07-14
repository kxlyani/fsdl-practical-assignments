import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../services/api';
import AppointmentCard from '../components/AppointmentCard';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getMyAppointments();
      setAppointments(response.data.appointments);
    } catch (err) {
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container py-10 text-center">Loading...</div>;

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {error && <div className="alert-error">{error}</div>}

      {appointments.length === 0 ? (
        <div className="card text-center">
          <p className="text-gray-600">You have no appointments yet.</p>
        </div>
      ) : (
        <div>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onUpdate={fetchAppointments}
            />
          ))}
        </div>
      )}
    </div>
  );
}