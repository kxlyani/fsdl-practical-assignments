import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient glow behind moon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-[80px] ambient-pulse" />

      {/* Crescent Moon */}
      <div className="relative w-28 h-28 mb-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/30 to-transparent" />
        <div className="absolute top-2 right-1 w-24 h-24 rounded-full bg-background" />
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(113,215,205,0.15)]" />
      </div>

      {/* Brand */}
      <h1 className="font-display text-3xl tracking-[0.2em] text-on-surface/90 lowercase mb-3">
        solace
      </h1>
      <p className="label-caps text-on-surface-variant/60">
        Your space to rest
      </p>

      {/* Version */}
      <p className="absolute bottom-8 label-caps text-on-surface-variant/30 text-[0.5rem]">
        Version v1.0
      </p>
    </div>
  );
};

export default Splash;
