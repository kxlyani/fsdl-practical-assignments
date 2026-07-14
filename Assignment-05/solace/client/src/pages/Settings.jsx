import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Palette, Timer, Volume2, Bell, Brain, Shield, Info, ChevronRight, LogOut } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const sections = [
    {
      title: 'Appearance',
      items: [
        { icon: Moon, label: 'Theme', value: 'Midnight Observatory (Dark)', action: true },
        { icon: Palette, label: 'Accent Color', value: 'Bioluminescent Teal', action: true },
      ]
    },
    {
      title: 'Audio Defaults',
      items: [
        { icon: Timer, label: 'Timer', value: '20 Minutes', action: true },
        { icon: Volume2, label: 'Fade-out', value: 'Gradual dissolution (ON)', action: true },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { icon: Bell, label: 'Gentle Reminders', value: 'Daily at 10:00 PM', action: true },
      ]
    },
    {
      title: 'Privacy',
      items: [
        { icon: Brain, label: 'Mind dump data', value: 'Clear all personal notes and logs', action: true },
        { icon: Shield, label: 'Account', value: '', action: true },
      ]
    },
    {
      title: 'About',
      items: [
        { icon: Info, label: 'Version', value: '2.6.9 CELESTIAL', action: false },
        { icon: Info, label: 'Terms of Solace', value: '', action: true },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center px-6 pt-6 mb-6">
        <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-display text-lg text-on-surface">Settings</h1>
      </header>

      <div className="px-6">
        {/* Profile */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-3 border border-outline-variant/20">
            <span className="font-display text-xl text-secondary">
              {userInfo.name?.charAt(0)?.toUpperCase() || 'S'}
            </span>
          </div>
          <h2 className="font-display text-lg text-on-surface">{userInfo.name || 'Seeker'}</h2>
          <p className="label-caps mt-1" style={{ fontSize: '0.5rem' }}>The Celestial Sanctuary</p>
        </div>

        {/* Sections */}
        {sections.map((section, si) => (
          <div key={si} className="mb-6">
            <p className="label-caps mb-3">{section.title}</p>
            <div className="glass-card overflow-hidden divide-y divide-outline-variant/10">
              {section.items.map((item, ii) => (
                <button key={ii} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} className="text-on-surface-variant" />
                    <div>
                      <p className="text-on-surface text-sm">{item.label}</p>
                      {item.value && (
                        <p className="text-on-surface-variant text-xs mt-0.5">{item.value}</p>
                      )}
                    </div>
                  </div>
                  {item.action && <ChevronRight size={16} className="text-on-surface-variant/40" />}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-4 text-error text-sm font-medium mb-6"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>

        {/* Footer Quote */}
        <p className="text-center font-display italic text-on-surface-variant/50 text-xs pb-4">
          "Stitch for the tired ones."
        </p>
        <p className="text-center label-caps text-on-surface-variant/30 text-[0.45rem] pb-6">
          The Celestial Sanctuary Collective
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;
