import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Star, Zap, Wind, Brain, CloudRain, Trees, Waves, Leaf, Play, SkipForward, SkipBack } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useAudio } from '../audio/useAudio';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });
  const [selectedSound, setSelectedSound] = useState('Rain');
  const audio = useAudio();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const sounds = [
    { name: 'Rain', kind: 'rain', icon: CloudRain },
    { name: 'Ocean', kind: 'ocean', icon: Waves },
    { name: 'Woods', kind: 'woods', icon: Trees },
    { name: 'Breeze', kind: 'breeze', icon: Leaf },
  ];

  const selected = sounds.find((s) => s.name === selectedSound) || sounds[0];
  const isSelectedPlaying = audio.isPlaying && audio.kind === `soundscape:${selected.kind}`;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-5%] right-[-15%] w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none ambient-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] w-60 h-60 bg-secondary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="px-6 pt-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Moon size={16} className="text-secondary" />
            <span className="font-display text-xs tracking-[0.15em] text-on-surface/60 uppercase">Solace</span>
          </div>
        </header>

        {/* Greeting */}
        <div className="mb-6">
          <h1 className="font-display text-2xl text-on-surface mb-1">
            {greeting()}, <span className="italic">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-on-surface-variant text-sm">How does your soul feel tonight?</p>
        </div>

        {/* Mood Selectors */}
        <div className="flex items-center space-x-4 mb-8">
          {[
            { icon: Moon, color: 'text-primary' },
            { icon: Star, color: 'text-secondary' },
            { icon: Zap, color: 'text-tertiary' },
          ].map((mood, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center transition-transform active:scale-90"
            >
              <mood.icon size={20} className={mood.color} />
            </button>
          ))}
        </div>

        {/* Sleep Mode Card */}
        <div className="glass-card p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
          <p className="label-caps mb-2">Deep Rest</p>
          <h2 className="font-display text-2xl text-on-surface mb-2">Sleep Mode</h2>
          <p className="text-on-surface-variant text-sm mb-5 max-w-[220px]">
            Surrender to the velvet embrace of the night.
          </p>
          <Link
            to="/sleep"
            className="inline-block btn-aurora text-xs px-6 py-3"
          >
            Begin Journey
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-around mb-8">
          {[
            { icon: Zap, label: 'Focus', sub: 'Clear the mind.', to: '/focus' },
            { icon: Wind, label: 'Breathe', sub: 'Find rhythm.', to: '/breathe' },
            { icon: Brain, label: 'Mind\nDump', sub: 'Release\nthoughts.', to: '/minddump' },
          ].map((item, i) => (
            <Link key={i} to={item.to} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-2 transition-colors group-hover:bg-surface-container-highest group-active:scale-95">
                <item.icon size={22} className="text-secondary" />
              </div>
              <span className="text-on-surface text-xs font-medium whitespace-pre-line">{item.label}</span>
              <span className="text-on-surface-variant text-[0.6rem] whitespace-pre-line mt-0.5">{item.sub}</span>
            </Link>
          ))}
        </div>

        {/* Nature's Echo Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <p className="label-caps">Nature's Echo</p>
            <Link to="/library" className="text-secondary text-xs font-medium">View All</Link>
          </div>

          <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-2">
            {sounds.map((sound) => (
              <button
                key={sound.name}
                onClick={() => setSelectedSound(sound.name)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full shrink-0 transition-all text-sm ${
                  selectedSound === sound.name
                    ? 'bg-surface-container-high text-secondary border border-secondary/30'
                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/10'
                }`}
              >
                <sound.icon size={14} />
                <span>{sound.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Now Playing Bar */}
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <selected.icon size={18} className="text-secondary" />
            </div>
            <div>
              <p className="text-on-surface text-sm font-medium">{selected.name}</p>
              <p className="text-on-surface-variant text-xs label-caps" style={{ fontSize: '0.5rem' }}>
                Soundscape • {audio.isPlaying ? 'Playing' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <SkipBack size={16} className="text-on-surface-variant" />
            <button
              onClick={() => audio.playSoundscape(selected.kind)}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center"
              aria-label={isSelectedPlaying ? 'Stop' : 'Play'}
            >
              <Play size={14} className="text-on-secondary ml-0.5" />
            </button>
            <SkipForward size={16} className="text-on-surface-variant" />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
