import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Send } from 'lucide-react';
import API from '../services/api';

const moods = ['Anxiety', 'Work', 'Longing', 'Unpolish'];

const MindDump = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleMood = (mood) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const mentalWeight = Math.min(100, Math.round((content.length / 500) * 100));

  const handleRelease = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      await API.post('/journals', {
        title: 'Mind Dump',
        content,
        mood: selectedMoods.join(', ') || 'neutral'
      });
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-6 pt-6 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate('/dashboard')} className="text-on-surface-variant">
            <ArrowLeft size={20} />
          </button>
          <span className="font-display text-xs tracking-[0.15em] text-on-surface/60 uppercase">Solace</span>
        </div>
        <button className="text-on-surface-variant">
          <Clock size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col px-6 pt-8 z-10">
        {/* Question */}
        <h1 className="font-display text-3xl italic text-on-surface text-center leading-snug mb-12">
          What won't let you<br />sleep tonight?
        </h1>

        {/* Text area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Let it all out..."
          className="flex-1 w-full bg-transparent outline-none resize-none text-on-surface/80 font-body text-base leading-relaxed placeholder:text-on-surface-variant/30 min-h-[150px]"
        />
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8 z-10">
        {/* Mood Tags */}
        <div className="flex space-x-2 mb-6 overflow-x-auto hide-scrollbar">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => toggleMood(mood)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedMoods.includes(mood)
                  ? 'bg-secondary/20 text-secondary border border-secondary/30'
                  : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/10'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        {/* Mental Weight */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="label-caps">Mental Weight</span>
            <span className="text-on-surface-variant text-xs">{mentalWeight}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-surface-container-highest">
            <div
              className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-container transition-all duration-500"
              style={{ width: `${mentalWeight}%` }}
            />
          </div>
        </div>

        {/* Release Button */}
        <button
          onClick={handleRelease}
          disabled={saving || !content.trim()}
          className="w-full btn-aurora flex items-center justify-center space-x-2 disabled:opacity-40"
        >
          <span>{saving ? 'Releasing...' : 'Release'}</span>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default MindDump;
