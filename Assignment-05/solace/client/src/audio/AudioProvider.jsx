import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createSoundscape, SOUNDSCAPES } from './soundscapes';
import { AudioContextValue } from './AudioProviderContext';

function getOrCreateAudioContext(ref) {
  if (ref.current) return ref.current;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  ref.current = Ctx ? new Ctx() : null;
  return ref.current;
}

export function AudioProvider({ children }) {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);

  const currentRef = useRef({ stop: null, kind: null, title: null, meta: null });
  const [state, setState] = useState({ isPlaying: false, title: null, kind: null, meta: null });

  const ensureGraph = useCallback(async () => {
    const ctx = getOrCreateAudioContext(audioCtxRef);
    if (!ctx) throw new Error('Web Audio is not supported in this browser.');
    if (!masterGainRef.current) {
      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      masterGainRef.current = master;
    }
    if (ctx.state === 'suspended') await ctx.resume();
    return { ctx, master: masterGainRef.current };
  }, []);

  const stop = useCallback(async ({ fadeOutMs = 200 } = {}) => {
    const current = currentRef.current;
    if (current.stop) current.stop({ fadeOutMs });
    currentRef.current = { stop: null, kind: null, title: null, meta: null };
    setState({ isPlaying: false, title: null, kind: null, meta: null });
  }, []);

  const playSoundscape = useCallback(async (kind) => {
    if (!SOUNDSCAPES[kind]) throw new Error(`Unknown soundscape: ${kind}`);
    const { ctx, master } = await ensureGraph();

    // toggle: if the same one is playing, stop
    if (currentRef.current.kind === `soundscape:${kind}` && state.isPlaying) {
      await stop();
      return;
    }

    await stop({ fadeOutMs: 120 });
    const synth = createSoundscape(ctx, kind);
    synth.output.connect(master);
    synth.start({ fadeInMs: 180 });

    const title = SOUNDSCAPES[kind].label;
    currentRef.current = {
      kind: `soundscape:${kind}`,
      title,
      meta: { kind },
      stop: ({ fadeOutMs }) => {
        synth.stop({ fadeOutMs });
        try { synth.output.disconnect(); } catch { /* noop */ }
      },
    };
    setState({ isPlaying: true, title, kind: `soundscape:${kind}`, meta: { kind } });
  }, [ensureGraph, state.isPlaying, stop]);

  const playUrl = useCallback(async ({ url, title = 'Audio', mimeType } = {}) => {
    if (!url) throw new Error('Missing url');
    const { ctx, master } = await ensureGraph();

    await stop({ fadeOutMs: 120 });

    const el = new Audio(url);
    el.preload = 'auto';
    el.crossOrigin = 'anonymous';
    if (mimeType) el.type = mimeType;

    const sourceNode = ctx.createMediaElementSource(el);
    const gain = ctx.createGain();
    gain.gain.value = 1.0;

    sourceNode.connect(gain);
    gain.connect(master);

    await el.play();

    const kind = 'url';
    currentRef.current = {
      kind,
      title,
      meta: { url },
      stop: ({ fadeOutMs }) => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0.0, t + fadeOutMs / 1000);
        setTimeout(() => {
          try { el.pause(); } catch { /* noop */ }
          try { el.src = ''; } catch { /* noop */ }
          try { sourceNode.disconnect(); } catch { /* noop */ }
          try { gain.disconnect(); } catch { /* noop */ }
        }, fadeOutMs + 60);
      },
    };

    el.addEventListener('ended', () => {
      setState((s) => (s.kind === kind ? { isPlaying: false, title: null, kind: null, meta: null } : s));
    });

    setState({ isPlaying: true, title, kind, meta: { url } });
  }, [ensureGraph, stop]);

  const value = useMemo(() => ({
    ...state,
    playSoundscape,
    playUrl,
    stop,
  }), [playSoundscape, playUrl, state, stop]);

  return <AudioContextValue.Provider value={value}>{children}</AudioContextValue.Provider>;
}
