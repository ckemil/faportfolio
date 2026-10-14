/**
 * Canvas drawing for Playground Jump — one-line art style:
 * everything is drawn with a single, even ink stroke on off-white paper, no colour fills.
 * Shapes that must hide what's behind them are filled with the paper colour.
 */

/** Canvas can't read CSS variables; the game resolves next/font's family name at runtime and sets it here. */
let UI_FONT = "sans-serif";
export function setCanvasFont(family: string) {
  if (family) UI_FONT = family;
}

export const INK = "#1c1b19";
export const PAPER = "#faf8f3";
const FAINT = "#b9b4aa"; // distant layers
const LINE = 2.5;

function line(ctx: CanvasRenderingContext2D, color = INK, width = LINE) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const wrap = (v: number, span: number) => ((v % span) + span) % span;

/** A cloud drawn as one looping stroke. */
function cloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.beginPath();
  ctx.moveTo(x - 50 * s, y);
  ctx.bezierCurveTo(x - 60 * s, y - 22 * s, x - 30 * s, y - 30 * s, x - 22 * s, y - 16 * s);
  ctx.bezierCurveTo(x - 18 * s, y - 42 * s, x + 20 * s, y - 42 * s, x + 18 * s, y - 16 * s);
  ctx.bezierCurveTo(x + 34 * s, y - 28 * s, x + 60 * s, y - 14 * s, x + 50 * s, y);
  ctx.lineTo(x - 50 * s, y);
  ctx.stroke();
}

/** Minimal scene: paper, a sun circle, a few clouds and one gentle horizon line. cam is the camera x. */
export function drawBackdrop(ctx: CanvasRenderingContext2D, W: number, H: number, cam: number, t: number) {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  line(ctx, INK, 2);
  ctx.beginPath();
  ctx.arc(W * 0.78 - wrap(cam * 0.02, 60), 120, 40, 0, Math.PI * 2);
  ctx.stroke();

  line(ctx, FAINT, 1.8);
  for (let i = 0; i < 3; i++) {
    const cx = wrap(i * 420 - cam * 0.1 + t * 6, W + 300) - 150;
    cloud(ctx, cx, 80 + i * 34, 0.75);
  }

  // single horizon line, well below the platforms so it never crosses them
  line(ctx, FAINT, 1.8);
  ctx.beginPath();
  for (let x = -10; x <= W + 20; x += 16) {
    const y = 500 - Math.sin((x + cam * 0.4) / 240) * 14;
    if (x === -10) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

/** Platform: a single outlined, paper-filled rounded slab. */
export function drawPlatform(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, _color: number) {
  line(ctx);
  ctx.fillStyle = PAPER;
  rr(ctx, x - 4, y - 8, w + 8, 24, 12);
  ctx.fill();
  ctx.stroke();
}

/** Bonus pickup: a star outline. */
export function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, spin = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.sin(spin) * 0.25);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r * 0.46 : r;
    ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.fillStyle = PAPER;
  ctx.fill();
  line(ctx, INK, 2);
  ctx.stroke();
  ctx.restore();
}

/** Design element: an outlined card with its glyph and name. */
export function drawElementCard(ctx: CanvasRenderingContext2D, x: number, y: number, glyph: string, label: string) {
  ctx.fillStyle = PAPER;
  rr(ctx, x - 40, y - 46, 80, 90, 10);
  ctx.fill();
  line(ctx, INK, 2.2);
  ctx.stroke();
  // glyph drawn in greyscale so the scene stays monochrome
  ctx.save();
  ctx.filter = "grayscale(1) contrast(1.2)";
  ctx.font = "30px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, x, y - 8);
  ctx.restore();
  ctx.fillStyle = INK;
  ctx.font = `600 11px ${UI_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label.length > 13 ? label.slice(0, 12) + "…" : label, x, y + 28);
}

/**
 * The runner, drawn in single-weight lines. (x, y) = feet centre. ~56px tall.
 * `run` is the running phase (radians), `air` true while jumping.
 */
export function drawKid(ctx: CanvasRenderingContext2D, x: number, y: number, facing: 1 | -1, run: number, air: boolean, squash = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing * (2 - squash), squash);
  line(ctx, INK, 2.4);
  const leg = air ? 0.55 : Math.sin(run) * 0.65;
  const arm = air ? -1.1 : Math.sin(run + Math.PI) * 0.7;

  // legs with little feet
  for (const s of [1, -1]) {
    const a = s * leg;
    const kx = Math.sin(a) * 10;
    const ky = -18 + Math.cos(a) * 10;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(kx, ky);
    ctx.lineTo(kx + Math.sin(a * 0.5) * 8, 0);
    ctx.lineTo(kx + Math.sin(a * 0.5) * 8 + 6, 0);
    ctx.stroke();
  }
  // body
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.quadraticCurveTo(2, -30, 0, -40);
  ctx.stroke();
  // arms
  for (const s of [1, -1]) {
    ctx.beginPath();
    ctx.moveTo(0, -36);
    ctx.lineTo(Math.sin(s * arm) * 12, -36 + Math.cos(s * arm) * 12);
    ctx.stroke();
  }
  // head (paper-filled so lines behind it are hidden), cap and a dot eye
  ctx.fillStyle = PAPER;
  ctx.beginPath();
  ctx.arc(1, -50, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-9, -53);
  ctx.quadraticCurveTo(0, -66, 10, -54);
  ctx.lineTo(18, -54);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(6, -50, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(5, -45, 3, 0.2, Math.PI - 0.2);
  ctx.stroke();
  ctx.restore();
}

/** Particle: a short ink spark that fades. */
export function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, life: number, _color: string) {
  ctx.globalAlpha = Math.max(0, life);
  line(ctx, INK, 1.6);
  ctx.beginPath();
  ctx.moveTo(x - 3, y);
  ctx.lineTo(x + 3, y);
  ctx.moveTo(x, y - 3);
  ctx.lineTo(x, y + 3);
  ctx.stroke();
  ctx.globalAlpha = 1;
}
