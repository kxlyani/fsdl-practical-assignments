import React from 'react';
import { Link } from 'react-router-dom';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6">
        <h2 className="font-display text-sm tracking-[0.15em] text-on-surface/70 uppercase">Solace</h2>
        <Link to="/login" className="label-caps text-on-surface-variant hover:text-on-surface transition-colors">Skip</Link>
      </header>

      {/* Circular Portal */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-56 h-56 rounded-full mb-12">
          {/* Outer ring glow */}
          <div className="absolute inset-[-8px] rounded-full bg-gradient-to-b from-surface-container-high to-surface-container-lowest" />
          {/* Inner dark circle */}
          <div className="absolute inset-0 rounded-full bg-surface-container-lowest overflow-hidden flex items-center justify-center">
            {/* Warm glow at bottom of circle */}
            <div className="absolute bottom-6 w-20 h-20 bg-secondary/40 rounded-full blur-[30px]" />
            <div className="absolute bottom-8 w-10 h-10 bg-secondary/70 rounded-full blur-[15px]" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl text-center text-on-surface leading-snug mb-6">
          You don't need more<br />content.<br />
          <span className="italic font-medium">You need less.</span>
        </h1>

        <p className="text-center text-on-surface-variant text-sm max-w-[260px] leading-relaxed">
          In a world of noise, we offer a silent refuge. Curated stillness for the modern mind.
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center space-x-2 pb-10">
        <div className="w-6 h-1.5 rounded-full bg-secondary" />
        <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/30" />
      </div>
    </div>
  );
};

export default Onboarding;
