"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { aboutPhotos, nowPhotos, LINKEDIN } from "@/lib/data";
import Reveal from "./Reveal";

const tilts = [-8, 5, -3, 7];

export default function About() {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow((n) => (n + 1) % nowPhotos.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="section about">
      <div className="about-text">
        <Reveal>
          <h2 className="about-title">
            Designing for People,
            <br />
            Building for Impact.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="about-body">
            Senior Product Designer passionate about creating intuitive, user-centered digital experiences
            across web and mobile in the MENA region. Skilled in UX strategy, interaction design, and design
            systems, I help transform complex problems into simple, elegant solutions that delight users and
            drive business impact.
          </p>
        </Reveal>
      </div>

      <div className="about-board">
        {aboutPhotos.map((src, i) => (
          <motion.div
            key={src}
            className={`polaroid polaroid-${i}`}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.08 }}
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            <Image src={src} alt="" fill sizes="240px" draggable={false} />
          </motion.div>
        ))}

        <motion.a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="note-card"
          initial={{ opacity: 0, rotate: 0 }}
          whileInView={{ opacity: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ rotate: 0, scale: 1.04 }}
        >
          <p>Love great design or good coffee?</p>
          <span className="note-cta">Connect</span>
        </motion.a>

        <div className="now-card">
          <span className="now-label">
            <span className="now-dot" /> Now
          </span>
          <div className="now-media">
            {nowPhotos.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="220px"
                style={{ opacity: i === now ? 1 : 0, transition: "opacity 0.8s ease" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
