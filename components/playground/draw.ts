/**
 * Canvas drawing for Playground Jump — Japanese woodblock (ukiyo-e) style:
 * washi-paper sky, rising red sun, layered Mt Fuji, pagodas, pines and drifting sakura,
 * lacquered wooden platforms with ink outlines.
 */

/** Canvas can't read CSS variables; the game resolves next/font's family name at runtime and sets it here. */
let UI_FONT = "sans-serif";
export function setCanvasFont(family: string) {
  if (family) UI_FONT = family;
}

const INK = "#2a2420";

export const PLAT_COLORS = [
  { top: "#d4472f", side: "#8f2a1e" }, // vermilion lacquer (torii red)
  { top: "#c99a5b", side: "#8a6234" }, // cedar wood
  { top: "#3d4f80", side: "#26335a" }, // indigo
  { top: "#a9a397", side: "#736e64" }, // stone
  { top: "#7d9a5a", side: "#53693b" }, // moss
];

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

function pagoda(ctx: CanvasRenderingContext2D, x: number, base: number, s: number, color: string) {
  ctx.fillStyle = color;
  for (let i = 0; i < 4; i++) {
    const w = (60 - i * 10) * s;
    const y = base - i * 26 * s;
    ctx.beginPath(); // upswept roof
    ctx.moveTo(x - w * 0.62, y - 10 * s);
    ctx.quadraticCurveTo(x - w * 0.3, y - 14 * s, x, y - 22 * s);
    ctx.quadraticCurveTo(x + w * 0.3, y - 14 * s, x + w * 0.62, y - 10 * s);
    ctx.lineTo(x + w * 0.42, y - 6 * s);
    ctx.lineTo(x - w * 0.42, y - 6 * s);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - w * 0.28, y - 6 * s, w * 0.56, 8 * s);
  }
  ctx.fillRect(x - 1.5 * s, base - 4 * 26 * s - 22 * s, 3 * s, 18 * s); // spire
}

function sakuraTree(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.strokeStyle = "#4a3426";
  ctx.lineCap = "round";
  ctx.lineWidth = 7 * s;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x - 6 * s, y - 40 * s, x + 4 * s, y - 70 * s);
  ctx.moveTo(x + 2 * s, y - 48 * s);
  ctx.quadraticCurveTo(x + 24 * s, y - 60 * s, x + 34 * s, y - 72 * s);
  ctx.stroke();
  const blossoms: [number, number, number][] = [[0, -82, 30], [-26, -70, 22], [28, -80, 24], [12, -100, 22], [-12, -96, 18]];
  for (const [bx, by, r] of blossoms) {
    ctx.fillStyle = "#f3b6c4";
    ctx.beginPath();
    ctx.arc(x + bx * s, y + by * s, r * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,230,236,0.7)";
    ctx.beginPath();
    ctx.arc(x + bx * s - r * 0.3 * s, y + by * s - r * 0.3 * s, r * 0.45 * s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function pine(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = "#4a3426";
  ctx.fillRect(x - 3 * s, y - 50 * s, 6 * s, 50 * s);
  ctx.fillStyle = "#3f5e46";
  for (const [dx, dy, w] of [[0, -58, 46], [-14, -44, 34], [16, -40, 30]] as const) {
    ctx.beginPath();
    ctx.ellipse(x + dx * s, y + dy * s, (w / 2) * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Washi sky, rising sun, Fuji, pagodas, trees and falling sakura petals. `cam` is the camera x. */
export function drawBackdrop(ctx: CanvasRenderingContext2D, W: number, H: number, cam: number, t: number) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#f6e6c8");
  g.addColorStop(0.55, "#f8eedd");
  g.addColorStop(1, "#efe3cc");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // rising sun (barely moves)
  ctx.fillStyle = "#d9412b";
  ctx.beginPath();
  ctx.arc(W * 0.72 - wrap(cam * 0.02, 60), 150, 78, 0, Math.PI * 2);
  ctx.fill();

  // stylised woodblock clouds: horizontal bands with rounded ends
  ctx.fillStyle = "rgba(255,250,240,0.92)";
  for (let i = 0; i < 6; i++) {
    const cx = wrap(i * 300 - cam * 0.08 + t * 6, W + 360) - 180;
    const cy = 70 + ((i * 53) % 110);
    const w = 120 + ((i * 37) % 80);
    rr(ctx, cx, cy, w, 14, 7);
    ctx.fill();
    rr(ctx, cx + 30, cy + 18, w * 0.7, 12, 6);
    ctx.fill();
  }

  // Mt Fuji with a snow cap (very slow parallax)
  const fx = W * 0.32 - wrap(cam * 0.04, W * 1.6) + W * 0.2;
  ctx.fillStyle = "#8ea3c0";
  ctx.beginPath();
  ctx.moveTo(fx - 300, 430);
  ctx.lineTo(fx - 70, 205);
  ctx.quadraticCurveTo(fx, 192, fx + 70, 205);
  ctx.lineTo(fx + 300, 430);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fbf7ef";
  ctx.beginPath();
  ctx.moveTo(fx - 70, 205);
  ctx.quadraticCurveTo(fx, 192, fx + 70, 205);
  ctx.lineTo(fx + 108, 243);
  ctx.lineTo(fx + 72, 236);
  ctx.lineTo(fx + 44, 252);
  ctx.lineTo(fx + 12, 236);
  ctx.lineTo(fx - 22, 254);
  ctx.lineTo(fx - 56, 236);
  ctx.lineTo(fx - 108, 243);
  ctx.closePath();
  ctx.fill();

  // far ridge with pagodas
  ctx.fillStyle = "#b8c4b0";
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W + 20; x += 20) {
    const wx = x + cam * 0.2;
    ctx.lineTo(x, 400 - Math.sin(wx / 160) * 28 - Math.sin(wx / 61) * 10);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
  for (let i = 0; i < 3; i++) {
    const px = wrap(i * 520 + 180 - cam * 0.2, W + 400) - 200;
    pagoda(ctx, px, 392 - Math.sin((px + cam * 0.2) / 160) * 28, 0.7, "#7f8f7a");
  }

  // near hills: sakura and pines
  ctx.fillStyle = "#a4b78f";
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W + 20; x += 20) {
    const wx = x + cam * 0.45;
    ctx.lineTo(x, 470 - Math.sin(wx / 210) * 30 - Math.sin(wx / 83) * 12);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.fill();
  for (let i = 0; i < 7; i++) {
    const tx = wrap(i * 290 - cam * 0.45, W + 300) - 150;
    const ty = 478 + ((i * 29) % 30);
    if (i % 3 === 1) pine(ctx, tx, ty, 0.9);
    else sakuraTree(ctx, tx, ty, 0.75);
  }

  // drifting petals
  for (let i = 0; i < 26; i++) {
    const px = wrap(i * 137 - cam * 0.6 - t * 30, W + 40) - 20;
    const py = wrap(i * 89 + t * (24 + (i % 5) * 6), H + 20) - 10;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(t * (1 + (i % 3)) + i);
    ctx.fillStyle = i % 2 ? "#f2a7b8" : "#f7c6d1";
    ctx.beginPath();
    ctx.ellipse(0, 0, 4, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/** Lacquered plank with an ink outline, a darker front face and two little torii-style posts. */
export function drawPlatform(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, color: number) {
  const c = PLAT_COLORS[color % PLAT_COLORS.length];
  ctx.fillStyle = "rgba(42,36,32,0.12)";
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + 66, w * 0.42, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  // posts
  ctx.fillStyle = "#2a2420";
  for (const px of [x + 16, x + w - 24]) ctx.fillRect(px, y + 20, 8, 40);
  // front face + top face
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = INK;
  ctx.fillStyle = c.side;
  rr(ctx, x, y + 6, w, 22, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = c.top;
  rr(ctx, x - 6, y - 8, w + 12, 18, 6);
  ctx.fill();
  ctx.stroke();
  // wood-grain / lacquer highlight
  ctx.strokeStyle = "rgba(255,240,220,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 6, y - 2);
  ctx.lineTo(x + w - 6, y - 2);
  ctx.stroke();
}

/** Bonus pickup: a five-petal sakura blossom (replaces the old star). */
export function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, spin = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(spin * 0.3);
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 5);
    ctx.fillStyle = "#f6b3c3";
    ctx.strokeStyle = "#c9607b";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); // notched petal
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(r * 0.75, -r * 0.35, r * 0.28, -r);
    ctx.lineTo(0, -r * 0.82);
    ctx.lineTo(-r * 0.28, -r);
    ctx.quadraticCurveTo(-r * 0.75, -r * 0.35, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = "#e0a91f";
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Design element as a hanging wooden ema (votive plaque) with a red cord. */
export function drawElementCard(ctx: CanvasRenderingContext2D, x: number, y: number, glyph: string, label: string) {
  ctx.strokeStyle = "#c8412f";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 58);
  ctx.lineTo(x, y - 46);
  ctx.lineTo(x + 10, y - 58);
  ctx.stroke();
  ctx.save();
  ctx.shadowColor = "rgba(42,36,32,0.25)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = "#e9c99a";
  ctx.beginPath(); // ema: pentagon with a peaked top
  ctx.moveTo(x - 42, y - 30);
  ctx.lineTo(x, y - 50);
  ctx.lineTo(x + 42, y - 30);
  ctx.lineTo(x + 42, y + 44);
  ctx.lineTo(x - 42, y + 44);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = "#d4472f";
  ctx.fillRect(x - 42, y - 30, 84, 5);
  ctx.font = "30px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, x, y - 2);
  ctx.fillStyle = INK;
  ctx.font = `600 11px ${UI_FONT}`;
  ctx.fillText(label.length > 13 ? label.slice(0, 12) + "…" : label, x, y + 30);
}

/**
 * The runner: kid in an indigo happi jacket and a red cap. (x, y) = feet centre. ~56px tall.
 * `run` is the running phase (radians), `air` true while jumping.
 */
export function drawKid(ctx: CanvasRenderingContext2D, x: number, y: number, facing: 1 | -1, run: number, air: boolean, squash = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing * (2 - squash), squash);
  const legSwing = air ? 0.5 : Math.sin(run) * 0.6;
  ctx.lineCap = "round";
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#f3cfae";
  for (const s of [1, -1]) {
    ctx.save();
    ctx.translate(s * 5, -18);
    ctx.rotate(s * legSwing);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 13);
    ctx.stroke();
    ctx.fillStyle = "#2a2420"; // geta-style dark sandals
    ctx.beginPath();
    ctx.ellipse(2, 16, 6, 3.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = "#e8dcc6";
  rr(ctx, -10, -24, 20, 9, 3);
  ctx.fill();
  // indigo happi jacket with a white collar band
  ctx.fillStyle = "#2f3f72";
  rr(ctx, -11, -39, 22, 18, 5);
  ctx.fill();
  ctx.strokeStyle = "#f7f1e6";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-3, -39);
  ctx.lineTo(3, -26);
  ctx.stroke();
  ctx.fillStyle = "#c8412f"; // obi sash
  ctx.fillRect(-11, -27, 22, 4);
  ctx.strokeStyle = "#f3cfae";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(6, -34);
  ctx.lineTo(12, air ? -44 : -26 + Math.sin(run + Math.PI) * 4);
  ctx.stroke();
  // hair, head, face
  ctx.fillStyle = "#1f1714";
  ctx.beginPath();
  ctx.ellipse(-4, -48, 12, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f6d9bd";
  ctx.beginPath();
  ctx.arc(1, -50, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1f1714";
  ctx.beginPath();
  ctx.ellipse(5, -50, 1.8, 2.4, 0, 0, Math.PI * 2);
  ctx.ellipse(10, -50, 1.6, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(217,65,43,0.35)";
  ctx.beginPath();
  ctx.arc(8, -45, 2.6, 0, Math.PI * 2);
  ctx.fill();
  // red cap
  ctx.fillStyle = "#d4472f";
  ctx.beginPath();
  ctx.ellipse(0, -59, 12, 7, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#a8321f";
  rr(ctx, 4, -60, 15, 4, 2);
  ctx.fill();
  ctx.restore();
}

export function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, life: number, color: string) {
  ctx.globalAlpha = Math.max(0, life);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 4 + (1 - life) * 3, 2.4, life * 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}
