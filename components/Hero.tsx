"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroIcons } from "@/lib/data";

// Position + tilt of each floating icon around the headline.
const placements = [
  { top: "14%", left: "12%", rotate: -12, delay: 0.2 },
  { top: "18%", right: "12%", rotate: 10, delay: 0.35 },
  { bottom: "18%", left: "16%", rotate: 8, delay: 0.5 },
  { bottom: "14%", right: "15%", rotate: -6, delay: 0.65 },
];

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {heroIcons.map((icon, i) => {
        const { rotate, delay, ...pos } = placements[i];
        return (
          <motion.div
            key={icon.alt}
            className="hero-icon"
            style={pos}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay }}
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.08, rotate: 0 }}
          >
            <Image src={icon.src} alt={icon.alt} fill sizes="120px" draggable={false} />
          </motion.div>
        );
      })}

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="hero-title">
          Hello,
          <br />
          I’m Fathima
        </h1>
        <p className="hero-sub">Delighted to have you explore my portfolio.</p>
        <p className="hero-tagline">
          I turn complex workflows into products people <em>enjoy using.</em>
        </p>
      </motion.div>
    </section>
  );
}
