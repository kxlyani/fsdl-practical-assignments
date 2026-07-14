import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Plus, Play } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useAudio } from '../audio/useAudio';

const Library = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Nature');
  const [darkMode] = useState(true);
  const audio = useAudio();

  const tabs = ['Nature', 'White Noise', 'Ambient'];

  const staffPicks = [
    { title: 'Midnight Forest', category: 'Atmosphere', duration: '34 min', desc: 'Immersion', kind: 'woods' },
    { title: 'Andean Winds', category: 'Nature', duration: '22 min', desc: 'Ambient', kind: 'breeze' },
  ];

  const exploreItems = [
    { title: 'My Uploads', subtitle: 'Personal Files', isUpload: true },
    { title: 'Rainy Terrace', subtitle: 'Rooftop • 15 min', color: 'from-blue-900/40 to-surface-container' },
    { title: 'Pacific Pulse', subtitle: 'Water • 8 min', color: 'from-amber-900/40 to-surface-container' },
    { title: 'Hearth Glow', subtitle: 'White Noise • 30 min', color: 'from-orange-900/40 to-surface-container' },
    { title: 'Luna Dream', subtitle: 'Ambient • 12 min', color: 'from-purple-900/40 to-surface-container' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant">
            <ArrowLeft size={20} />
          </button>
          <span className="font-display text-xs tracking-[0.15em] text-on-surface/60 uppercase">Solace</span>
        </div>
        <div className="flex items-center space-x-2">
          <Moon size={14} className="text-on-surface-variant" />
          <span className="label-caps text-on-surface-variant" style={{ fontSize: '0.55rem' }}>
            {darkMode ? 'Ark Mode' : 'Light Mode'}
          </span>
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* Search bar placeholder */}
        <div className="glass-card px-4 py-3 mb-6 flex items-center">
          <span className="text-on-surface-variant/40 text-sm">Search sounds...</span>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === tab
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Staff Picks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg text-on-surface">Staff Picks</h2>
            <span className="label-caps text-on-surface-variant" style={{ fontSize: '0.55rem' }}>View All</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
            {staffPicks.map((pick, i) => (
              <div key={i} className="shrink-0 w-44">
                <div className="w-44 h-28 rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container-lowest mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/5" />
                  <div className="absolute bottom-3 left-3">
                    <button
                      onClick={() => audio.playSoundscape(pick.kind)}
                      className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center"
                      aria-label="Play"
                    >
                      <Play size={12} className="text-secondary ml-0.5" />
                    </button>
                  </div>
                </div>
                <p className="label-caps mb-0.5" style={{ fontSize: '0.5rem' }}>{pick.category}</p>
                <p className="text-on-surface text-sm font-medium">{pick.title}</p>
                <p className="text-on-surface-variant text-xs">{pick.duration} • {pick.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Library */}
        <div>
          <h2 className="font-display text-lg text-on-surface mb-4">Explore Library</h2>
          <div className="grid grid-cols-2 gap-3">
            {exploreItems.map((item, i) => (
              <button
                key={i}
                onClick={() => item.isUpload && navigate('/uploads')}
                className="text-left"
              >
                <div className={`w-full aspect-square rounded-2xl mb-2 relative overflow-hidden ${
                  item.isUpload
                    ? 'bg-surface-container-high border border-dashed border-outline-variant/30 flex items-center justify-center'
                    : `bg-gradient-to-br ${item.color}`
                }`}>
                  {item.isUpload ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                        <Plus size={18} className="text-secondary" />
                      </div>
                      <span className="label-caps text-secondary" style={{ fontSize: '0.5rem' }}>Add New</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  )}
                </div>
                <p className="text-on-surface text-xs font-medium">{item.title}</p>
                <p className="text-on-surface-variant text-[0.6rem]">{item.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Library;
