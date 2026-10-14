"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutPhotos, nowPhoto, LINKEDIN, RESUME } from "@/lib/data";
import Reveal from "./Reveal";

// Layout for each aboutPhotos entry (clouds, family, avatar, illustration), in order.
const stickers = [
  { className: "board-clouds", rotate: -4 },
  { className: "board-family", rotate: 4, clip: true },
  { className: "board-avatar", rotate: 6 },
  { className: "board-sketch", rotate: -6 },
];
const emoji = ["🎨", "⚽", "🎮"];

// Simple line icons so the skill cards match the site's dashed, monochrome cards.
const icons = {
  strategy: <path d="M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 1 1M13 11l7-7M17 4h3v3" />,
  interaction: <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.2-3L4 14.5a1.5 1.5 0 0 1 2.6-1.5L9 16" />,
  systems: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 16.5h7M16.5 13v7" />,
};

const skills = [
  { icon: icons.strategy, title: "UX strategy", text: "Research, flows and information architecture" },
  { icon: icons.interaction, title: "Interaction design", text: "Clear journeys for web and mobile" },
  { icon: icons.systems, title: "Design systems", text: "Tokens and components teams can scale" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about-text">
        <Reveal>
          <span className="about-pill">
            <span className="status-dot" /> About me
          </span>
          <h2 className="about-title">
            Designing for People,
            <br />
            Building for Impact.
          </h2>
          <p className="about-lead">
            I’m a Senior Product Designer in the UAE, turning complex problems into simple, elegant products across web
            and mobile — <span>from first research to a shipped design system.</span>
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="about-skills">
            {skills.map((s) => (
              <li key={s.title}>
                <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="about-actions">
          <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Download CV <span aria-hidden>↓</span>
          </a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-soft">
            LinkedIn
          </a>
        </Reveal>
      </div>

      <div className="about-board">
        {/* Main photo. */}
        <motion.div
          className="board-main"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={nowPhoto} alt="Fathima in front of a pagoda at golden hour" fill sizes="(max-width: 809px) 80vw, 360px" />
        </motion.div>

        <ul className="board-emoji" aria-hidden>
          {emoji.map((e, i) => (
            <motion.li
              key={e}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.25, rotate: -10 }}
            >
              {e}
            </motion.li>
          ))}
        </ul>

        {aboutPhotos.map((src, i) => {
          const s = stickers[i];
          return (
            <motion.div
              key={src}
              className={`board-item ${s.className}`}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.15 + i * 0.08 }}
              drag
              dragSnapToOrigin
              whileHover={{ scale: 1.06, zIndex: 10 }}
            >
              {s.clip && <span className="board-clip" aria-hidden>📎</span>}
              <span className="board-img">
                <Image src={src} alt="" fill sizes="160px" draggable={false} />
              </span>
            </motion.div>
          );
        })}

        <motion.a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="note-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.04 }}
        >
          <span className="note-pin" aria-hidden>📌</span>
          <p>Love great design or good coffee?</p>
          <span className="note-cta">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
            Connect Now
          </span>
        </motion.a>
      </div>
    </section>
  );
}
