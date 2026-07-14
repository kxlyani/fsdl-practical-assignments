import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Zap, Wind, Brain, Calendar } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import API from '../services/api';

const Statistics = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [journalStats, setJournalStats] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      const [sessRes, jrnRes] = await Promise.all([
        API.get('/sessions/stats'),
        API.get('/journals/stats'),
      ]);
      setStats(sessRes.data);
      setJournalStats(jrnRes.data);
    } catch (e) {
      console.error(e);
      setStats({ sleepHours: 0, sleepMins: 0, focusHours: 0, streak: 0, breathingSessions: 0 });
      setJournalStats({ totalDumps: 0 });
    }
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) { navigate('/login'); return; }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, [fetchStats, navigate]);

  // Mood orbit dots (decorative)
  const moodDots = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6">
        <div className="flex items-center space-x-3">
          <Moon size={16} className="text-secondary" />
          <h1 className="font-display text-lg text-on-surface">Your Week</h1>
        </div>
        <button className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
          <Calendar size={16} className="text-on-surface-variant" />
        </button>
      </header>

      <div className="px-6 pt-6">
        {/* Mood Orbit */}
        <div className="mb-8">
          <p className="label-caps mb-4">Mood Orbit</p>
          <div className="flex justify-between items-end px-2 h-16">
            {moodDots.map((day, i) => {
              const heights = [30, 50, 65, 40, 55, 45, 60];
              return (
                <div key={day} className="flex flex-col items-center space-y-2">
                  <div
                    className="w-3 h-3 rounded-full bg-secondary/70"
                    style={{ marginBottom: `${heights[i]}%` }}
                  />
                  <span className="text-on-surface-variant text-[0.5rem] uppercase">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleep Sessions Card */}
        <div className="glass-card p-5 mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Moon size={16} className="text-primary" />
            <p className="label-caps">Sleep Sessions</p>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="font-display text-3xl text-on-surface">
              {stats?.sleepHours || 0}h {stats?.sleepMins || 0}m
            </span>
            <span className="text-on-surface-variant text-xs ml-2">avg</span>
          </div>
        </div>

        {/* Focus + Streak Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Focus */}
          <div className="glass-card p-5">
            <p className="label-caps mb-3">Focus</p>
            <div className="relative w-16 h-16 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-surface-container-highest)" strokeWidth="3" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-secondary)" strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - Math.min(1, (stats?.focusHours || 0) / 12))}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-on-surface text-xs font-medium">
                {stats?.focusHours || 0}h
              </span>
            </div>
            <p className="text-on-surface-variant text-[0.6rem] text-center">Deep Work Cycle</p>
          </div>

          {/* Streak */}
          <div className="glass-card p-5">
            <p className="label-caps mb-3">Streak</p>
            <div className="flex items-center justify-center">
              <Zap size={20} className="text-secondary mr-2" />
              <span className="font-display text-3xl text-on-surface">{stats?.streak || 0}</span>
            </div>
            <p className="text-on-surface-variant text-[0.6rem] text-center mt-2">Day Flow</p>
          </div>
        </div>

        {/* Private Reflection */}
        <div className="glass-card p-5 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <Brain size={18} className="text-primary" />
            </div>
            <div>
              <p className="label-caps mb-0.5">Private Reflection</p>
              <p className="font-display text-lg text-on-surface">{journalStats?.totalDumps || 0} Mind Dumps</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center px-4 mb-6">
          <p className="font-display italic text-on-surface/70 text-sm leading-relaxed">
            "The quiet mind is an ocean of infinite potential."
          </p>
          <p className="label-caps mt-3" style={{ fontSize: '0.5rem' }}>Evening Meditation</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Statistics;
