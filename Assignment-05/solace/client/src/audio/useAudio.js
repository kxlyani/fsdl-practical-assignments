import { useContext } from 'react';
import { AudioContextValue } from './AudioProviderContext';

export function useAudio() {
  const v = useContext(AudioContextValue);
  if (!v) throw new Error('useAudio must be used within AudioProvider');
  return v;
}

