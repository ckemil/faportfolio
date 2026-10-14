"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { drawBackdrop, drawElementCard, drawKid, drawPlatform, drawSparkle, drawStar, setCanvasFont } from "./draw";
import { setMuted, sfx } from "./sound";

/*
 * Playground Jump — an endless runner in the spirit of the offline "dino" game.
 * The kid runs on her own; jump between playground platforms, grab stars and design elements
 * for bonus points, and beat your high score. One fall ends the run.
 */

const W = 960;
const H = 540;
const JUMP = 900;
const GRAVITY = 2200;
const AIRTIME = (2 * JUMP) / GRAVITY; // ≈0.82s for a full jump
const KID = 1.3;
const HALF_W = 16;
const SCREEN_X = 200; // where the runner sits on screen
const HI_KEY = "playground-jump-hi";
const MUTE_KEY = "playground-jump-muted";

const ELEMENTS = [
  { glyph: "🔘", name: "Button", tip: "Buttons help people take action. Use clear verb labels and one consistent primary style." },
  { glyph: "🗂️", name: "Card", tip: "Cards group related content into one scannable unit with a clear entry point." },
  { glyph: "🔤", name: "Typeface", tip: "One or two typefaces is plenty — personality comes from how you use them." },
  { glyph: "🌓", name: "Contrast", tip: "Body text needs at least 4.5:1 contrast with its background to stay readable." },
  { glyph: "📏", name: "Type scale", tip: "A consistent type scale (12, 16, 20, 28, 40) builds clear visual hierarchy." },
  { glyph: "💬", name: "Feedback", tip: "Every action deserves a response: loading states, confirmations and clear errors." },
  { glyph: "♿", name: "Accessibility", tip: "Design for keyboard, screen readers and large text from the start, not as a fix." },
  { glyph: "🎨", name: "Tokens", tip: "Design tokens store decisions — colour, type, spacing — so one change updates everywhere." },
  { glyph: "🧩", name: "Components", tip: "Build reusable components once, then compose every screen from them." },
  { glyph: "🔲", name: "Spacing", tip: "A spacing scale built on 4 or 8 px keeps layouts rhythmic and predictable." },
  { glyph: "🎯", name: "User problem", tip: "Start with the user's problem, not the solution you already like." },
  { glyph: "🔄", name: "Iteration", tip: "Learn, adjust, repeat — great products are refined, not finished." },
];

type Platform = { x: number; y: number; w: number; color: number };
type Pickup = { x: number; y: number; kind: "star" | "element"; el?: (typeof ELEMENTS)[number]; taken: boolean };
type Phase = "ready" | "running" | "over";

const pad = (n: number) => String(Math.floor(n)).padStart(5, "0");

function readNum(key: string) {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}
function write(key: string, v: string) {
  try {
    localStorage.setItem(key, v);
  } catch {
    /* storage blocked — high score just won't persist */
  }
}

export default function Runner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<Phase>("ready");
  const jumpHeld = useRef(false);
  const jumpQueued = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  const lastOver = useRef(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  const [newHi, setNewHi] = useState(false);
  const [muted, setMutedState] = useState(false);
  const [run, setRun] = useState<{ metres: number; stars: number; learned: (typeof ELEMENTS)[number][]; best: number } | null>(null);
  const [tip, setTip] = useState<(typeof ELEMENTS)[number] | null>(null);
  const tipRef = useRef(false); // the run is paused while a design tip is open

  useEffect(() => {
    setHi(readNum(HI_KEY));
    const m = readNum(MUTE_KEY) === 1;
    setMutedState(m);
    setMuted(m);
  }, []);

  const toggleMute = () => {
    const m = !muted;
    setMutedState(m);
    setMuted(m);
    write(MUTE_KEY, m ? "1" : "0");
  };

  /** Space / tap: start, jump, or restart after a game over. */
  const closeTip = useCallback(() => {
    tipRef.current = false;
    setTip(null);
  }, []);

  const press = useCallback(() => {
    if (tipRef.current) return closeTip();
    const ph = phaseRef.current;
    if (ph === "over") {
      if (performance.now() - lastOver.current < 450) return; // don't restart from the same tap that ended the run
      resetRef.current();
    }
    if (ph !== "running") {
      phaseRef.current = "running";
      setPhase("running");
    }
    jumpHeld.current = true;
    jumpQueued.current = true;
  }, [closeTip]);
  const release = useCallback(() => {
    jumpHeld.current = false;
  }, []);

  /* ---------------- keyboard ---------------- */
  useEffect(() => {
    const isJump = (k: string) => k === " " || k === "arrowup" || k === "w";
    const kd = (e: KeyboardEvent) => {
      if (!isJump(e.key.toLowerCase())) return;
      e.preventDefault(); // stop the page scrolling
      if (!e.repeat) press();
    };
    const ku = (e: KeyboardEvent) => {
      if (isJump(e.key.toLowerCase())) release();
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [press, release]);

  /* ---------------- game loop ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    setCanvasFont(getComputedStyle(canvas).fontFamily);

    let platforms: Platform[] = [];
    let pickups: Pickup[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    let p = { x: 0, y: 0, vy: 0, onGround: true, run: 0, coyote: 0, jumpBuf: 0, squash: 1 };
    let speed = 300;
    let dist = 0;
    let bonus = 0;
    let stars = 0;
    let learned: (typeof ELEMENTS)[number][] = [];
    let t = 0;
    let elIndex = 0;
    let sincEl = 0;
    let shownScore = -1;

    const addPlatform = () => {
      const last = platforms[platforms.length - 1];
      // gaps grow with speed but always stay inside the jump's reach at that speed
      const reach = speed * AIRTIME;
      const dy = (Math.random() - 0.5) * 180;
      const y = Math.max(270, Math.min(450, last.y + dy));
      const rising = y < last.y - 50;
      const maxGap = Math.min(reach * (rising ? 0.48 : 0.62), 70 + dist / 45);
      const gap = 55 + Math.random() * Math.max(10, maxGap - 55);
      const w = 150 + Math.random() * 200;
      const pl: Platform = { x: last.x + last.w + gap, y, w, color: (last.color + 1 + Math.floor(Math.random() * 3)) % 5 };
      platforms.push(pl);
      sincEl++;
      if (sincEl >= 5 + Math.floor(Math.random() * 3)) {
        sincEl = 0;
        pickups.push({ x: pl.x + pl.w / 2, y: pl.y - 112, kind: "element", el: ELEMENTS[elIndex++ % ELEMENTS.length], taken: false });
      } else if (Math.random() < 0.65) {
        const n = 1 + Math.floor(Math.random() * 3);
        for (let k = 0; k < n; k++) pickups.push({ x: pl.x + (pl.w / (n + 1)) * (k + 1), y: pl.y - 64 - Math.sin(((k + 1) / (n + 1)) * Math.PI) * 22, kind: "star", taken: false });
      }
    };

    const reset = () => {
      platforms = [{ x: -200, y: 420, w: 760, color: 0 }];
      pickups = [];
      particles = [];
      p = { x: 120, y: 414, vy: 0, onGround: true, run: 0, coyote: 0, jumpBuf: 0, squash: 1 };
      speed = 300;
      dist = 0;
      bonus = 0;
      stars = 0;
      learned = [];
      elIndex = Math.floor(Math.random() * ELEMENTS.length);
      sincEl = 2;
      shownScore = -1;
      jumpQueued.current = false;
      while (platforms[platforms.length - 1].x < W * 2) addPlatform();
      setScore(0);
      setNewHi(false);
      tipRef.current = false;
      setTip(null);
    };
    resetRef.current = reset;
    reset();

    const burst = (x: number, y: number, color: string, n = 10) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        particles.push({ x, y, vx: Math.cos(a) * 120, vy: Math.sin(a) * 120 - 60, life: 1, color });
      }
    };

    const gameOver = () => {
      phaseRef.current = "over";
      lastOver.current = performance.now();
      sfx("hurt");
      const final = Math.floor(dist / 10) + bonus;
      const best = readNum(HI_KEY);
      setRun({ metres: Math.floor(dist / 40), stars, learned: [...learned], best: Math.max(best, final) });
      if (final > best) {
        write(HI_KEY, String(final));
        setHi(final);
        setNewHi(true);
      }
      setScore(final);
      setPhase("over");
    };

    const update = (dt: number) => {
      speed = Math.min(560, 300 + dist * 0.012);
      const dx = speed * dt;
      p.x += dx;
      dist += dx;

      if (jumpQueued.current) {
        p.jumpBuf = 0.12;
        jumpQueued.current = false;
      }
      p.jumpBuf -= dt;
      p.coyote = p.onGround ? 0.08 : p.coyote - dt;
      if (p.jumpBuf > 0 && p.coyote > 0) {
        p.vy = -JUMP;
        p.coyote = 0;
        p.jumpBuf = 0;
        p.onGround = false;
        p.squash = 1.2;
        sfx("jump");
      }
      if (!jumpHeld.current && p.vy < -360) p.vy = -360; // tap = short hop, hold = full jump

      p.vy = Math.min(p.vy + GRAVITY * dt, 1200);
      const prev = p.y;
      p.y += p.vy * dt;
      const wasGround = p.onGround;
      p.onGround = false;
      for (const pl of platforms) {
        const top = pl.y - 6;
        if (p.vy >= 0 && prev <= top + 2 && p.y >= top && p.x + HALF_W > pl.x && p.x - HALF_W < pl.x + pl.w) {
          p.y = top;
          p.vy = 0;
          p.onGround = true;
          if (!wasGround) p.squash = 0.82;
          break;
        }
      }
      if (p.onGround) p.run += speed * dt * 0.05;
      p.squash += (1 - p.squash) * Math.min(1, dt * 12);
      if (p.y > H + 60) return gameOver();

      // pickups
      const cy = p.y - 36;
      for (const pk of pickups) {
        if (pk.taken) continue;
        if (pk.kind === "star" ? Math.hypot(pk.x - p.x, pk.y - cy) < 32 : Math.abs(pk.x - p.x) < 52 && Math.abs(pk.y - cy) < 64) {
          pk.taken = true;
          if (pk.kind === "star") {
            bonus += 5;
            stars++;
            burst(pk.x, pk.y, "#f6b3c3");
            sfx("star");
          } else {
            bonus += 25;
            learned.push(pk.el!);
            burst(pk.x, pk.y, "#d4472f", 16);
            sfx("element");
            jumpHeld.current = false;
            tipRef.current = true;
            setTip(pk.el!);
          }
        }
      }

      // stream the world: add ahead, drop behind
      const cam = p.x - SCREEN_X;
      while (platforms[platforms.length - 1].x < cam + W * 1.6) addPlatform();
      platforms = platforms.filter((pl) => pl.x + pl.w > cam - 200);
      pickups = pickups.filter((pk) => pk.x > cam - 100);

      for (const s of particles) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 500 * dt;
        s.life -= dt * 1.6;
      }
      particles = particles.filter((s) => s.life > 0);

      const sc = Math.floor(dist / 10) + bonus;
      if (sc !== shownScore) {
        shownScore = sc;
        setScore(sc);
      }
    };

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cam = p.x - SCREEN_X;
      drawBackdrop(ctx, W, H, cam, t);
      ctx.save();
      ctx.translate(-Math.round(cam), 0);
      for (const pl of platforms) drawPlatform(ctx, pl.x, pl.y, pl.w, pl.color);
      for (const pk of pickups) {
        if (pk.taken) continue;
        const bob = Math.sin(t * 3 + pk.x * 0.01) * 5;
        if (pk.kind === "star") drawStar(ctx, pk.x, pk.y + bob, 15, t * 2 + pk.x);
        else drawElementCard(ctx, pk.x, pk.y + bob, pk.el!.glyph, pk.el!.name);
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(KID, KID);
      drawKid(ctx, 0, 0, 1, phaseRef.current === "ready" ? 0 : p.run, !p.onGround, p.squash);
      ctx.restore();
      for (const s of particles) drawSparkle(ctx, s.x, s.y, s.life, s.color);
      ctx.restore();
    };

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(1 / 30, (now - last) / 1000);
      last = now;
      t += dt;
      if (phaseRef.current === "running" && !tipRef.current) update(dt);
      render();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="pj-game"
      onPointerDown={(e) => {
        // buttons handle themselves; reading the result card shouldn't restart the run
        if ((e.target as HTMLElement).closest("button, .pj-result")) return;
        e.preventDefault();
        press();
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onContextMenu={(e) => e.preventDefault()}
    >
      <canvas ref={canvasRef} className="pj-canvas" role="img" aria-label="Playground Jump. Press space or tap to jump between platforms." />

      <div className="pj-hud">
        <button type="button" className="pj-round" onClick={toggleMute} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
          {muted ? "🔇" : "🔊"}
        </button>
        <p className="pj-scores" aria-live="off">
          <span className="pj-hi">HI {pad(hi)}</span>
          <span>{pad(score)}</span>
        </p>
      </div>

      {tip && (
        <div className="pj-center pj-center--tip" role="dialog" aria-modal="true" aria-labelledby="pj-tip-title">
          <div className="pj-card pj-tip">
            <span className="pj-seal" aria-hidden>
              ✎
            </span>
            <p className="pj-tip-kicker">Design Tip · +25</p>
            <h2 id="pj-tip-title">
              <span aria-hidden>{tip.glyph}</span> {tip.name}
            </h2>
            <p className="pj-tip-text">{tip.tip}</p>
            <button type="button" className="pj-got" autoFocus onClick={closeTip}>
              Got it — keep running
            </button>
            <p className="pj-small">
              or press <kbd>Space</kbd>
            </p>
          </div>
        </div>
      )}

      {phase === "ready" && (
        <div className="pj-center">
          <h1 className="pj-title">
            Playground <span>Jump</span>
          </h1>
          <p>
            Press <kbd>Space</kbd> or tap to jump
          </p>
          <p className="pj-small">Hold to jump higher · Collect stars and design cards for bonus points</p>
        </div>
      )}

      {phase === "over" && run && (
        <div className="pj-center pj-center--over" role="dialog" aria-modal="true" aria-labelledby="pj-over-title">
          <div className="pj-card pj-result">
            <span className="pj-seal" aria-hidden>
              ★
            </span>
            <p className="pj-tip-kicker">{newHi ? "New high score!" : "Run complete"}</p>
            <h2 id="pj-over-title">Game Over</h2>

            <div className="pj-result-score">
              <div>
                <span>Score</span>
                <strong>{pad(score)}</strong>
              </div>
            </div>

            <dl className="pj-result-stats">
              <div>
                <dt>Distance</dt>
                <dd>{run.metres} m</dd>
              </div>
              <div>
                <dt>★ Stars</dt>
                <dd>{run.stars}</dd>
              </div>
              <div>
                <dt>Tips learned</dt>
                <dd>{run.learned.length}</dd>
              </div>
            </dl>

            {run.learned.length > 0 ? (
              <ul className="pj-result-learned" aria-label="Design elements collected this run">
                {run.learned.map((el, i) => (
                  <li key={i}>
                    <span aria-hidden>{el.glyph}</span>
                    {el.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pj-result-hint">Grab a hanging design card next run to learn a tip.</p>
            )}

            <button type="button" className="pj-got pj-again" autoFocus onClick={press}>
              ↻ Play again
            </button>
            <p className="pj-small">
              or press <kbd>Space</kbd>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
