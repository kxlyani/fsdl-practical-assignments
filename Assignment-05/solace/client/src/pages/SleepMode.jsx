import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import API from '../services/api';
import { useAudio } from '../audio/useAudio';

const SleepMode = () => {
  const navigate = useNavigate();
  const audio = useAudio();
  const [selectedTimer, setSelectedTimer] = useState(20);
  const [fadeOut, setFadeOut] = useState(true);
  const [volume, setVolume] = useState(75);
  const [elapsed, setElapsed] = useState(0);

  const sleepScape = useMemo(() => 'rain', []);
  const isPlaying = audio.isPlaying && audio.kind === `soundscape:${sleepScape}`;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      // Ending session — save it
      try {
        await API.post('/sessions', {
          type: 'sleep',
          duration: elapsed,
          status: elapsed >= selectedTimer * 60 ? 'completed' : 'interrupted'
        });
      } catch (e) { console.error(e); }
      setElapsed(0);
    }
    await audio.playSoundscape(sleepScape);
  };

  // Equalizer bars
  const bars = [0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 0.5, 0.7, 0.3, 0.6, 0.8];

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col pb-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full blur-[100px] pointer-events-none transition-all duration-[3000ms] ${isPlaying ? 'bg-primary/12 scale-105' : 'bg-primary/5 scale-95'}`} />

      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6 z-10">
        <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-display text-xs tracking-[0.15em] text-on-surface/60 uppercase">Solace</h2>
        <button className="text-on-surface-variant">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center px-6 z-10">
        {/* Large Circular Player */}
        <div className="relative w-52 h-52 rounded-full mt-8 mb-6 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-b from-surface-container-high/60 to-surface-container-lowest/20" />
          {/* Inner circle */}
          <div className="absolute inset-0 rounded-full bg-surface-container-lowest flex items-center justify-center overflow-hidden">
            {/* Equalizer bars */}
            <div className="flex items-end space-x-[3px] h-16">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`w-[3px] rounded-full bg-secondary/70 transition-all duration-500 ${isPlaying ? '' : 'opacity-40'}`}
                  style={{
                    height: isPlaying ? `${h * 100}%` : '20%',
                    animation: isPlaying ? `eq-bar ${0.6 + i * 0.1}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Track info */}
        <p className="label-caps mb-1">Deep Forest Rain</p>
        <h2 className="font-display text-xl italic text-on-surface mb-8">Midnight Sanctuary</h2>

        {/* Sleep Timer */}
        <p className="label-caps mb-3">Sleep Timer</p>
        <div className="flex items-center space-x-2 mb-8">
          {[10, 20, 30].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTimer(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedTimer === t
                  ? 'bg-surface-container-high text-on-surface border border-outline-variant/30'
                  : 'text-on-surface-variant'
              }`}
            >
              {t}m
            </button>
          ))}
        </div>

        {/* Fade-out toggle */}
        <div className="w-full glass-card p-4 flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center">
              <span className="text-secondary text-xs">≋</span>
            </div>
            <div>
              <p className="text-on-surface text-sm font-medium">Fade-out audio</p>
              <p className="text-on-surface-variant text-xs">Smooth transition to silence</p>
            </div>
          </div>
          <button
            onClick={() => setFadeOut(!fadeOut)}
            className={`w-11 h-6 rounded-full relative transition-colors ${fadeOut ? 'bg-secondary' : 'bg-surface-container-highest'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${fadeOut ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Volume */}
        <div className="w-full px-2 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="label-caps">Volume</span>
            <span className="text-on-surface-variant text-xs">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none bg-surface-container-highest cursor-pointer accent-secondary"
          />
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-8">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <SkipBack size={24} />
          </button>
          <button
            onClick={handleTogglePlay}
            className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_30px_rgba(113,215,205,0.3)] transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={28} className="text-on-secondary" /> : <Play size={28} className="text-on-secondary ml-1" />}
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SleepMode;
