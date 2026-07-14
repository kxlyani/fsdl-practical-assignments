import React, { useState, useEffect } from 'react';
import { appointmentAPI, doctorAPI } from '../services/api';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchDoctors();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await appointmentAPI.getAllAppointments({});
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await doctorAPI.getDoctors();
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await appointmentAPI.updateAppointmentStatus(appointmentId, newStatus);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded ${
            activeTab === 'appointments'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`px-4 py-2 rounded ${
            activeTab === 'doctors'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          Doctors
        </button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : activeTab === 'appointments' ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3 text-left">Patient</th>
                <th className="border border-gray-300 p-3 text-left">Doctor</th>
                <th className="border border-gray-300 p-3 text-left">Date</th>
                <th className="border border-gray-300 p-3 text-left">Time</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td className="border border-gray-300 p-3">{appt.userId.name}</td>
                  <td className="border border-gray-300 p-3">Dr. {appt.doctorId.userId.name}</td>
                  <td className="border border-gray-300 p-3">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-3">{appt.timeSlot}</td>
                  <td className="border border-gray-300 p-3">
                    <select
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No-show</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="card">
              <h3 className="text-lg font-semibold">Dr. {doctor.userId.name}</h3>
              <p className="text-gray-600">{doctor.specialization}</p>
              <p className="mt-2">Experience: {doctor.experience} years</p>
              <p>Fee: ${doctor.consultationFee}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {doctor.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}