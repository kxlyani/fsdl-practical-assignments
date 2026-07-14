import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart3, Settings } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/library', label: 'Library', icon: BookOpen },
    { to: '/stats', label: 'Stats', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-outline-variant/10">
        <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex justify-around items-center py-3 px-2">
          {tabs.map((tab) => {
            const isActive = path === tab.to;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex flex-col items-center space-y-1 px-4 py-1 transition-colors ${
                  isActive ? 'text-secondary' : 'text-on-surface-variant'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="label-caps" style={{ fontSize: '0.55rem' }}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
