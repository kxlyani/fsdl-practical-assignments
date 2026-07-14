import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Manage your appointments easily</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/book-appointment" className="card hover:shadow-lg transition">
          <div className="text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
            <p className="text-gray-600">Schedule a new appointment with a doctor</p>
          </div>
        </Link>

        <Link to="/my-appointments" className="card hover:shadow-lg transition">
          <div className="text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">My Appointments</h3>
            <p className="text-gray-600">View and manage your appointments</p>
          </div>
        </Link>
      </div>

      {user?.role === 'admin' && (
        <div className="mt-6">
          <Link to="/admin" className="card hover:shadow-lg transition">
            <div className="text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
              <p className="text-gray-600">Manage doctors and appointments</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}