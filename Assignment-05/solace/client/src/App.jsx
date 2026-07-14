import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SleepMode from './pages/SleepMode';
import FocusMode from './pages/FocusMode';
import BreathingExercise from './pages/BreathingExercise';
import MindDump from './pages/MindDump';
import Library from './pages/Library';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import AudioUploads from './pages/AudioUploads';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto relative">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sleep" element={<SleepMode />} />
          <Route path="/focus" element={<FocusMode />} />
          <Route path="/breathe" element={<BreathingExercise />} />
          <Route path="/minddump" element={<MindDump />} />
          <Route path="/library" element={<Library />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/uploads" element={<AudioUploads />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
