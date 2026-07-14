import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pen } from 'lucide-react';
import API from '../services/api';
import BottomNav from '../components/BottomNav';

const PATTERNS = {
  Calm: { inhale: 4, hold: 7, exhale: 8, label: '4-7-8 Method' },
  Box: { inhale: 4, hold: 4, exhale: 4, label: '4-4-4 Method' },
  Sleep: { inhale: 4, hold: 7, exhale: 8, label: '4-7-8 Method' },
  Energize: { inhale: 6, hold: 0, exhale: 2, label: '6-0-2 Method' },
};

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Ready');
  const [selectedPattern, setSelectedPattern] = useState('Calm');
  const [sessionMinutes, setSessionMinutes] = useState(3);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const pattern = PATTERNS[selectedPattern];

  useEffect(() => {
    if (!isActive) return;

    const phases = [
      { name: 'Inhale...', duration: pattern.inhale },
      ...(pattern.hold > 0 ? [{ name: 'Hold...', duration: pattern.hold }] : []),
      { name: 'Exhale...', duration: pattern.exhale },
    ];

    let phaseIndex = 0;

    const cycle = () => {
      phaseIndex = (phaseIndex + 1) % phases.length;
      setPhase(phases[phaseIndex].name);
    };

    let currentDuration = phases[0].duration * 1000;
    const scheduleNext = () => {
      timerRef.current = setTimeout(() => {
        cycle();
        currentDuration = phases[phaseIndex % phases.length].duration * 1000;
        scheduleNext();
      }, currentDuration);
    };
    scheduleNext();

    // Track elapsed
    const elapsedInterval = setInterval(() => setElapsed(e => e + 1), 1000);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(elapsedInterval);
    };
  }, [isActive, selectedPattern]);

  const handleEnd = async () => {
    setIsActive(false);
    setPhase('Ready');
    try {
      await API.post('/sessions', {
        type: 'breathing',
        duration: elapsed,
        status: 'completed'
      });
    } catch (e) { console.error(e); }
    setElapsed(0);
  };

  const breathClass = () => {
    if (!isActive) return 'scale-100';
    if (phase.startsWith('Inhale')) return 'breathe-inhale';
    if (phase.startsWith('Hold')) return 'breathe-hold';
    return 'breathe-exhale';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant">
            <ArrowLeft size={20} />
          </button>
          <span className="font-display text-sm text-on-surface/70">Solace</span>
        </div>
        <span className="label-caps text-secondary">Seeker</span>
      </header>

      <div className="flex-1 flex flex-col items-center px-6 z-10">
        {/* Phase Text */}
        <div className="mt-8 text-center mb-4">
          <h1 className="font-display text-3xl italic text-on-surface mb-1">
            {isActive ? phase : 'Ready?'}
          </h1>
          <p className="label-caps">
            {isActive ? 'Prepare your mind' : 'Choose your pattern'}
          </p>
        </div>

        {/* Breath Circle */}
        <div className="relative w-52 h-52 flex items-center justify-center my-6">
          {/* Outer glow */}
          <div className={`absolute inset-[-20px] rounded-full bg-secondary/8 blur-[30px] ${breathClass()}`} />
          {/* Ring */}
          <div className="absolute inset-0 rounded-full border border-secondary/30" />
          {/* Inner animated circle */}
          <div className={`w-36 h-36 rounded-full bg-surface-container-high/50 flex items-center justify-center backdrop-blur-sm shadow-[0_0_40px_rgba(113,215,205,0.2)] ${breathClass()}`}>
            <div className={`w-24 h-24 rounded-full bg-secondary/10 ${breathClass()}`} />
          </div>
        </div>

        {/* Session Info */}
        <div className="flex items-center space-x-8 mb-6">
          <div className="text-center">
            <p className="label-caps mb-1">Session</p>
            <div className="flex items-center space-x-2">
              <span className="font-display text-2xl text-on-surface">{sessionMinutes}</span>
              <button onClick={() => !isActive && setSessionMinutes(m => Math.max(1, m === 3 ? 5 : m === 5 ? 10 : 3))} className="text-on-surface-variant">
                <Pen size={12} />
              </button>
            </div>
            <p className="text-on-surface-variant text-[0.6rem]">Minutes</p>
          </div>
          <div className="text-center">
            <p className="label-caps mb-1">Pattern</p>
            <p className="font-display text-lg text-on-surface">{selectedPattern}</p>
            <p className="text-on-surface-variant text-[0.6rem]">{pattern.label}</p>
          </div>
        </div>

        {/* Pattern Selection */}
        <div className="flex space-x-2 mb-8">
          {Object.keys(PATTERNS).map((p) => (
            <button
              key={p}
              onClick={() => !isActive && setSelectedPattern(p)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedPattern === p
                  ? 'bg-surface-container-high text-secondary border border-secondary/30'
                  : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/10'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Action Button */}
        {!isActive ? (
          <button
            onClick={() => {
              setElapsed(0);
              setPhase('Inhale...');
              setIsActive(true);
            }}
            className="w-full btn-aurora flex items-center justify-center"
          >
            Start Session
          </button>
        ) : (
          <div className="w-full space-y-3">
            <button
              onClick={() => setIsActive(false)}
              className="w-full btn-aurora flex items-center justify-center"
            >
              Pause Session
            </button>
            <button
              onClick={handleEnd}
              className="w-full text-center text-on-surface-variant text-sm font-medium py-2"
            >
              End Early
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default BreathingExercise;
