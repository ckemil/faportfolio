/** Tiny Web Audio sound effects — no files to download. Muted state is shared module-wide. */

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

const NOTES: Record<string, [number, number, OscillatorType][]> = {
  jump: [[520, 0.08, "square"]],
  star: [[880, 0.06, "triangle"], [1320, 0.08, "triangle"]],
  element: [[660, 0.08, "triangle"], [880, 0.08, "triangle"], [1100, 0.12, "triangle"]],
  hurt: [[220, 0.15, "sawtooth"]],
  win: [[523, 0.1, "triangle"], [659, 0.1, "triangle"], [784, 0.1, "triangle"], [1047, 0.2, "triangle"]],
};

export function sfx(name: keyof typeof NOTES) {
  if (muted || typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    let at = ctx.currentTime;
    for (const [freq, dur, type] of NOTES[name]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.06, at);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      o.connect(g).connect(ctx.destination);
      o.start(at);
      o.stop(at + dur);
      at += dur * 0.8;
    }
  } catch {
    /* audio unavailable — the game works silently */
  }
}
