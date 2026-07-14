import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import API from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-surface-container/80 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6 z-10">
        <Link to="/onboarding" className="text-on-surface-variant">
          <ArrowLeft size={20} />
        </Link>
        <h2 className="font-display text-sm tracking-[0.15em] text-on-surface/70 uppercase">Solace</h2>
        <div className="w-5" />
      </header>

      <div className="flex-1 flex flex-col px-6 pt-10 z-10">
        {/* Headline */}
        <h1 className="font-display text-4xl text-on-surface mb-3">
          Welcome back
        </h1>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-10 max-w-[280px]">
          Return to your sanctuary of quiet reflection and celestial peace.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-error-container/20 text-error text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleLogin} className="glass-card p-6 space-y-5">
          <div>
            <label className="label-caps block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="seeker@celestial.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label-caps">Password</label>
              <button type="button" className="text-secondary text-xs font-medium">Forgot?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-outline-variant/30 pb-3 text-on-surface outline-none focus:border-secondary/50 transition-colors placeholder:text-on-surface-variant/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-aurora mt-4 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Entering...' : 'Come back in'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-on-surface-variant text-sm">
          First time here? Begin{' '}
          <Link to="/register" className="text-secondary font-medium underline underline-offset-4">your journey</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
