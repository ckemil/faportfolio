"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { avatar, LINKEDIN } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const NAME = "فاطمة إبراهيم";

/**
 * Design-tool ruler along the top edge: a label every 100 units (125px).
 * It pans as the mouse moves horizontally, and a marker reads out the cursor's x.
 * Panning by 0.25·x with 1.25px per unit makes the unit under the cursor equal x.
 */
function Ruler({ x, active }: { x: MotionValue<number>; active: boolean }) {
  const pan = useTransform(x, (v) => -v * 0.25);
  const label = useTransform(x, (v) => Math.round(v));
  return (
    <div className="hero-ruler" aria-hidden>
      <motion.div className="hero-ruler-track" style={{ x: pan }}>
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} style={{ left: i * 125 }}>{i * 100}</span>
        ))}
      </motion.div>
      <motion.div className="hero-ruler-marker" style={{ x }} animate={{ opacity: active ? 1 : 0 }}>
        <motion.span>{label}</motion.span>
      </motion.div>
    </div>
  );
}

function Target() {
  return (
    <svg className="hero-glyph hero-glyph--target" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

function Flower() {
  return (
    <svg className="hero-glyph hero-glyph--flower" viewBox="0 0 24 24" aria-hidden>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <circle key={i} cx={12 + Math.cos(a) * 7.5} cy={12 + Math.sin(a) * 7.5} r="3" fill="currentColor" />;
      })}
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <path d="M4 4 L36 14 L21 19 L16 34 Z" fill="currentColor" stroke="#141414" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // "YOU" cursor: follows the visitor's pointer inside the hero (mouse only).
  const [pointer, setPointer] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cx = useSpring(mx, { stiffness: 500, damping: 40 });
  const cy = useSpring(my, { stiffness: 500, damping: 40 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    setPointer(true);
  };

  const drag = { drag: true, dragConstraints: ref, dragElastic: 0.15, dragMomentum: false, whileDrag: { scale: 1.05, zIndex: 20 } } as const;

  return (
    <section id="hero" className="hero" ref={ref} onPointerMove={onMove} onPointerLeave={() => setPointer(false)}>
      <Ruler x={cx} active={pointer} />

      {/* visitor + "Fathima" cursors, like a multiplayer canvas */}
      <motion.div className="hero-you" style={{ x: cx, y: cy }} animate={{ opacity: pointer ? 1 : 0 }} aria-hidden>
        <span className="hero-you-dot" />
        <span className="hero-you-label">YOU</span>
      </motion.div>
      <motion.div
        className="hero-me"
        aria-hidden
        animate={{ x: [0, 30, 10, 24, 0], y: [0, 90, 200, 120, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={avatar} alt="" width={64} height={64} />
      </motion.div>

      <div className="hero-stage">

        <div className="hero-name-wrap">

          <motion.span className="hero-hand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Hello, I’m
          </motion.span>

          <motion.div
            className="hero-frame"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            {["tl", "tr", "bl", "br"].map((h) => (
              <span key={h} className={`hero-handle hero-handle--${h}`} aria-hidden />
            ))}
            {/* Animated per word: splitting Arabic into letters would break the joined script. */}
            {/* Visible name is Arabic; the keyword-rich h1 is for search engines and screen readers. */}
            <h1 className="sr-only">Fathima Ibrahim — UI/UX Designer in the UAE</h1>
            <p className="hero-name" lang="ar" dir="rtl">
              {NAME.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: "30%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.7, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </motion.div>

          {/* tags are anchored to the name frame so they keep their spot at any width */}
          <motion.div className="hero-tag hero-tag--role" {...drag}>
            Product Designer
            <Arrow className="hero-tag-arrow" />
          </motion.div>
          <motion.div className="hero-tag hero-tag--loc" initial={{ rotate: -12 }} {...drag}>
            <Arrow className="hero-tag-arrow" />
            Based in UAE
          </motion.div>
        </div>


        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease }}
        >
          <span className="nowrap">I turn complex workflows <Target /></span>
          <br />
          <span className="nowrap">into products people enjoy <Flower />.</span>
        </motion.p>

        {/* entrance animation lives on the wrapper so it doesn't override the button's hover lift */}
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
        >
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Contact me <span aria-hidden>↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
