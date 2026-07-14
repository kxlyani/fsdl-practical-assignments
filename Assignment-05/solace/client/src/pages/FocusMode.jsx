import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import API from '../services/api';
import BottomNav from '../components/BottomNav';

const FocusMode = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [totalTime] = useState(25 * 60);
  const [sessionSaved, setSessionSaved] = useState(false);

  const handleComplete = useCallback(async () => {
    setIsActive(false);
    setSessionSaved(true);
    try {
      await API.post('/sessions', {
        type: 'focus',
        duration: totalTime - time,
        status: time === 0 ? 'completed' : 'interrupted'
      });
    } catch (e) {
      console.error(e);
    }
  }, [time, totalTime]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            // Let the interval callback “own” completion instead of triggering state updates from the effect body.
            queueMicrotask(() => {
              if (!sessionSaved) handleComplete();
            });
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [handleComplete, isActive, sessionSaved, time]);

  const handleToggle = () => setIsActive(!isActive);

  const handleReset = () => {
    setIsActive(false);
    setTime(25 * 60);
    setSessionSaved(false);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = ((totalTime - time) / totalTime) * 100;
  const circumference = 2 * Math.PI * 110;
  const dashOffset = circumference - (circumference * progress) / 100;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20 relative overflow-hidden">
      {/* Ambient teal glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[100px] pointer-events-none transition-all duration-[2000ms] ${isActive ? 'bg-secondary/12 scale-110' : 'bg-secondary/4 scale-100'}`} />

      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6 z-10">
        <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant">
          <ArrowLeft size={20} />
        </button>
        <p className="label-caps text-secondary">Deep Work</p>
        <div className="w-5" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center z-10 px-6">
        {/* Timer Ring */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-6">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="110" fill="none" stroke="var(--color-surface-container-high)" strokeWidth="3" />
            <circle
              cx="120" cy="120" r="110" fill="none"
              stroke="var(--color-secondary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          {/* Central glow */}
          <div className={`absolute w-32 h-32 rounded-full blur-[40px] transition-all duration-[2000ms] ${isActive ? 'bg-secondary/15' : 'bg-secondary/5'}`} />
          <div className="text-center z-10">
            <h1 className="text-5xl font-display font-medium text-on-surface tracking-tight">
              {formatTime(time)}
            </h1>
            <p className="label-caps mt-2 text-secondary">Flow State</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mt-4">
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform active:scale-90"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleToggle}
            className="w-18 h-18 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_30px_rgba(113,215,205,0.3)] transition-transform active:scale-95 p-5"
          >
            {isActive ? <Pause size={28} className="text-on-secondary" /> : <Play size={28} className="text-on-secondary ml-1" />}
          </button>
          <button
            onClick={handleComplete}
            className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-transform active:scale-90"
          >
            <span className="text-xs font-bold">END</span>
          </button>
        </div>

        {sessionSaved && (
          <p className="text-secondary text-sm mt-6 animate-pulse">Session saved ✓</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default FocusMode;
