"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Section, Sparkle, SplitPill } from "@/components/ui";
import { ease } from "@/components/motion";
import { Wordmark } from "@/components/case/AptyRead";
import { avatar, heroIcons } from "@/lib/data";

// Floating tool tiles around the wordmark (avatar is shown on its own above the pill).
const tiles = heroIcons.filter((i) => i.src !== avatar);
const tilePos = [
  { left: "7%", top: "58%", r: -10, depth: 26 },
  { right: "9%", top: "52%", r: 8, depth: 40 },
  { left: "20%", top: "18%", r: 6, depth: 18 },
];

function HeroTile({
  tile,
  index,
  sx,
  sy,
}: {
  tile: (typeof tiles)[number];
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const { r, depth, ...pos } = tilePos[index];
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div
      className="hero-tile"
      data-i={index}
      style={{ ...pos, x, y }}
      initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: r }}
      transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.7 + index * 0.12 }}
      drag
      dragSnapToOrigin
      whileHover={{ scale: 1.1, rotate: 0 }}
    >
      <span className={`ds-float${index % 2 ? " ds-float--delay" : ""}`}>
        <Image src={tile.src} alt={tile.alt} width={120} height={120} draggable={false} />
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  // Pointer parallax for the floating tiles.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  // Scroll parallax: wordmark drifts up slower than the page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <Section tone="blue" rings id="hero" className="hero-section">
      <div ref={ref} className="home-hero" onPointerMove={onMove}>
        <Sparkle size={22} style={{ left: "56%", top: 52 }} />
        <Sparkle size={14} delay={0.8} style={{ left: "45%", top: 128 }} />
        <Sparkle size={32} delay={1.4} style={{ left: "4%", top: "40%" }} />
        <Sparkle size={26} delay={0.4} style={{ right: "6%", top: "30%" }} />
        <Sparkle size={20} delay={2} style={{ right: "28%", bottom: "8%" }} />

        {tiles.map((t, i) => (
          <HeroTile key={t.alt} tile={t} index={i} sx={sx} sy={sy} />
        ))}

        <motion.div className="hero-avatar" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
          <Image src={avatar} alt="Fathima" width={96} height={96} priority />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
          <SplitPill left="Hello, I’m" right="Senior Product Designer" />
        </motion.div>

        <motion.div style={{ y: wordY }}>
          <Wordmark text="Fathima" delay={0.3} />
        </motion.div>

        <motion.p className="hero-tagline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease }}>
          I turn complex workflows into products people <span className="ds-hl">enjoy using.</span>
        </motion.p>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
          Delighted to have you explore my portfolio.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.6, ease }}>
          <Link href="#projects" className="hero-chip">
            View my work <span className="apty-hero-play">↓</span>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
