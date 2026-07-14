import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import API from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-surface-container/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 flex flex-col px-6 pt-14 z-10">
        {/* Headline */}
        <h1 className="font-display text-4xl text-on-surface mb-2">
          Create your sanctuary
        </h1>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-10">
          Enter the celestial observatory of Solace
        </p>

        {/* Error */}
        {error && (
          <div className="bg-error-container/20 text-error text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="label-caps block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="Elias Thorne"
            />
          </div>

          <div>
            <label className="label-caps block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="elias@celestial.com"
            />
          </div>

          <div>
            <label className="label-caps block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="label-caps block mb-2">Confirm Sanctuary Key</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-aurora mt-6 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating...' : 'Begin'}</span>
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 pb-8 text-on-surface-variant text-sm">
          Already a seeker?{' '}
          <Link to="/login" className="text-secondary font-medium underline underline-offset-4">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
