import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorAPI, appointmentAPI } from '../services/api';

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getDoctors();
      setDoctors(response.data.doctors);
    } catch (err) {
      setError('Failed to fetch doctors');
    }
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot('');
    setSlots([]);

    if (selectedDoctor && date) {
      try {
        const response = await appointmentAPI.getAvailableSlots(selectedDoctor, date);
        setSlots(response.data.slots);
      } catch (err) {
        setError('Failed to fetch available slots');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await appointmentAPI.bookAppointment({
        doctorId: selectedDoctor,
        date: selectedDate,
        timeSlot: selectedSlot,
        reason,
      });
      navigate('/my-appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => {
                setSelectedDoctor(e.target.value);
                setSlots([]);
                setSelectedSlot('');
              }}
              className="input-field"
              required
            >
              <option value="">Choose a doctor...</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.userId.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
              required
              disabled={!selectedDoctor}
            />
          </div>

          {slots.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlot(slot.time)}
                    disabled={!slot.available}
                    className={`p-2 rounded border ${
                      slot.available
                        ? selectedSlot === slot.time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-100'
                        : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Reason for Appointment</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input-field"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedSlot}
            className="btn-primary w-full"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}