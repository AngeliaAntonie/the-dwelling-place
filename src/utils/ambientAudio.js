// Web Audio API Synth for Sacred Ambient Soundscapes
// Generates gentle chapel bell chimes and peaceful warm singing bowl / organ drone ambient sound

class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.masterGain = null;
    this.bellInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbient() {
    this.init();
    if (this.isPlaying) return;

    this.isPlaying = true;

    // Master gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low Drone Oscillator 1 (C3 = 130.81 Hz)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(130.81, this.ctx.currentTime);

    // Subtle Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // Warm Fifth Drone Oscillator 2 (G3 = 196.00 Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(196.00, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(this.masterGain);

    this.droneOsc1.start();
    this.droneOsc2.start();

    // Trigger gentle chapel bell chime every 18 seconds
    this.playChapelBell();
    this.bellInterval = setInterval(() => {
      if (this.isPlaying) {
        this.playChapelBell();
      }
    }, 18000);
  }

  playChapelBell() {
    if (!this.ctx || !this.isPlaying) return;

    // Bell frequencies (High pitch sacred chime: A5 880Hz & E6 1318.51Hz)
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    bellOsc.type = 'sine';
    // Soft random selection between 3 sacred tones
    const tones = [523.25, 659.25, 783.99, 880.00];
    const freq = tones[Math.floor(Math.random() * tones.length)];
    bellOsc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    bellGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.08);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 4.5);

    bellOsc.connect(bellGain);
    bellGain.connect(this.masterGain);

    bellOsc.start();
    bellOsc.stop(this.ctx.currentTime + 4.6);
  }

  stopAmbient() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.bellInterval) {
      clearInterval(this.bellInterval);
      this.bellInterval = null;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        if (this.droneOsc1) this.droneOsc1.stop();
        if (this.droneOsc2) this.droneOsc2.stop();
      }, 1300);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }
}

export const ambientAudio = new AmbientAudioEngine();
