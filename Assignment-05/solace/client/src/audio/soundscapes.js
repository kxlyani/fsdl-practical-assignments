export const SOUNDSCAPES = {
  rain: { label: 'Rain' },
  ocean: { label: 'Ocean' },
  woods: { label: 'Woods' },
  breeze: { label: 'Breeze' },
};

function createNoiseBuffer(context, seconds = 1) {
  const sampleRate = context.sampleRate;
  const length = Math.max(1, Math.floor(sampleRate * seconds));
  const buffer = context.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function createLoopingNoiseSource(context) {
  const src = context.createBufferSource();
  src.buffer = createNoiseBuffer(context, 1);
  src.loop = true;
  return src;
}

/**
 * A tiny “soundscape synth” built on Web Audio so the app has real sound
 * without shipping audio assets. Returns { output, start(), stop() }.
 */
export function createSoundscape(context, kind) {
  const output = context.createGain();
  output.gain.value = 0.0;

  const now = () => context.currentTime;

  // Shared nodes
  const noise = createLoopingNoiseSource(context);
  const filter1 = context.createBiquadFilter();
  const filter2 = context.createBiquadFilter();
  const amp = context.createGain();

  // Defaults
  filter1.type = 'lowpass';
  filter2.type = 'highpass';
  filter1.frequency.value = 1200;
  filter2.frequency.value = 120;
  amp.gain.value = 0.6;

  // Optional modulation
  let lfo = null;
  let lfoGain = null;

  const connectChain = () => {
    noise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(amp);
    amp.connect(output);
  };

  const disconnectAll = () => {
    try { noise.disconnect(); } catch { /* noop */ }
    try { filter1.disconnect(); } catch { /* noop */ }
    try { filter2.disconnect(); } catch { /* noop */ }
    try { amp.disconnect(); } catch { /* noop */ }
    if (lfo) {
      try { lfo.disconnect(); } catch { /* noop */ }
    }
    if (lfoGain) {
      try { lfoGain.disconnect(); } catch { /* noop */ }
    }
  };

  // Shape per soundscape
  switch (kind) {
    case 'rain': {
      // Bright-ish hiss with a gentle moving band
      filter1.type = 'bandpass';
      filter1.frequency.value = 1800;
      filter1.Q.value = 0.8;
      filter2.type = 'highpass';
      filter2.frequency.value = 250;
      amp.gain.value = 0.55;

      lfo = context.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.08;
      lfoGain = context.createGain();
      lfoGain.gain.value = 600; // sweep band center
      lfo.connect(lfoGain);
      lfoGain.connect(filter1.frequency);
      break;
    }
    case 'ocean': {
      // Low, warm noise with slow amplitude swell
      filter1.type = 'lowpass';
      filter1.frequency.value = 420;
      filter1.Q.value = 0.4;
      filter2.type = 'highpass';
      filter2.frequency.value = 40;
      amp.gain.value = 0.8;

      lfo = context.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.03;
      lfoGain = context.createGain();
      lfoGain.gain.value = 0.25;
      lfo.connect(lfoGain);
      lfoGain.connect(amp.gain);
      break;
    }
    case 'woods': {
      // Midrange “rustle”
      filter1.type = 'bandpass';
      filter1.frequency.value = 900;
      filter1.Q.value = 0.9;
      filter2.type = 'highpass';
      filter2.frequency.value = 160;
      amp.gain.value = 0.45;

      lfo = context.createOscillator();
      lfo.type = 'triangle';
      lfo.frequency.value = 0.06;
      lfoGain = context.createGain();
      lfoGain.gain.value = 250;
      lfo.connect(lfoGain);
      lfoGain.connect(filter1.frequency);
      break;
    }
    case 'breeze': {
      // Airy highpassed hiss with subtle flutter
      filter1.type = 'highpass';
      filter1.frequency.value = 900;
      filter2.type = 'highpass';
      filter2.frequency.value = 250;
      amp.gain.value = 0.35;

      lfo = context.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.12;
      lfoGain = context.createGain();
      lfoGain.gain.value = 0.18;
      lfo.connect(lfoGain);
      lfoGain.connect(amp.gain);
      break;
    }
    default: {
      // fall through
      break;
    }
  }

  connectChain();

  let started = false;

  const start = ({ fadeInMs = 250 } = {}) => {
    if (started) return;
    started = true;
    const t = now();
    output.gain.cancelScheduledValues(t);
    output.gain.setValueAtTime(0.0, t);
    output.gain.linearRampToValueAtTime(1.0, t + fadeInMs / 1000);
    if (lfo) lfo.start();
    noise.start();
  };

  const stop = ({ fadeOutMs = 250 } = {}) => {
    if (!started) return;
    const t = now();
    output.gain.cancelScheduledValues(t);
    const current = output.gain.value;
    output.gain.setValueAtTime(current, t);
    output.gain.linearRampToValueAtTime(0.0, t + fadeOutMs / 1000);

    const stopAt = t + fadeOutMs / 1000 + 0.02;
    try { noise.stop(stopAt); } catch { /* noop */ }
    if (lfo) {
      try { lfo.stop(stopAt); } catch { /* noop */ }
    }

    // Disconnect shortly after to avoid leaks
    setTimeout(() => disconnectAll(), fadeOutMs + 100);
    started = false;
  };

  return { output, start, stop };
}

