"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { aboutPhotos, nowPhotos, LINKEDIN } from "@/lib/data";
import { Section, SectionHeader, Sparkle } from "@/components/ui";

const tilts = [-8, 5, -3, 7];

export default function About() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow((n) => (n + 1) % nowPhotos.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <Section tone="soft" id="about">
      <SectionHeader
        eyebrow="About"
        title="Designing for People,"
        highlight="Building for Impact."
        lead={{
          muted: "Senior Product Designer passionate about creating intuitive, user-centered digital experiences across web and mobile in the MENA region.",
          text: "Skilled in UX strategy, interaction design, and design systems, I help transform complex problems into simple, elegant solutions that delight users and drive business impact.",
        }}
      />

      <div className="about-board">
        <Sparkle size={24} style={{ left: "46%", top: 10 }} />
        <Sparkle size={16} delay={1.1} style={{ left: "2%", bottom: 20 }} />
        {aboutPhotos.map((src, i) => (
          <motion.div
            key={src}
            className={`polaroid polaroid-${i}`}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 110, damping: 15, delay: i * 0.1 }}
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
          >
            <Image src={src} alt="" fill sizes="240px" draggable={false} />
          </motion.div>
        ))}

        <motion.a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="note-card"
          initial={{ opacity: 0, rotate: 0, y: 30 }}
          whileInView={{ opacity: 1, rotate: -4, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, type: "spring", stiffness: 140, damping: 14 }}
          whileHover={{ rotate: 0, scale: 1.04 }}
        >
          <p>Love great design or good coffee?</p>
          <span className="ds-btn ds-btn--navy note-cta">
            Connect <span className="ds-btn-icon">↗</span>
          </span>
        </motion.a>

        <motion.div
          className="now-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, type: "spring", stiffness: 140, damping: 16 }}
        >
          <span className="ds-pill ds-pill--navy now-label">
            <span className="now-dot" /> Now
          </span>
          <div className="now-media">
            {nowPhotos.map((src, i) => (
              <Image key={src} src={src} alt="" fill sizes="240px" style={{ opacity: i === now ? 1 : 0, transform: i === now ? "scale(1)" : "scale(1.08)", transition: "opacity .8s ease, transform 1.2s ease" }} />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
