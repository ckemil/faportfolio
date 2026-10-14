"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { radar, type RadarKind } from "@/lib/data";
import Reveal from "./Reveal";
import ArrowUpRight from "./ArrowUpRight";

const kinds: ("All" | RadarKind)[] = ["All", "Trend", "Tool", "Read", "Inspiration"];

/** "Design Radar": a filterable feed of trends, tools and reads currently on my radar. */
export default function Radar() {
  const [filter, setFilter] = useState<(typeof kinds)[number]>("All");
  const items = filter === "All" ? radar : radar.filter((r) => r.kind === filter);

  return (
    <section id="radar" className="section radar">
      <Reveal className="radar-head">
        <div>
          <h2 className="section-title">Design Radar</h2>
          <p className="radar-intro">Trends, tools and reads I’m watching right now — the things shaping how I design.</p>
        </div>
        <div className="radar-filters" role="group" aria-label="Filter the radar">
          {kinds.map((k) => (
            <button key={k} type="button" className={`radar-filter${filter === k ? " is-active" : ""}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {k}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.ul layout className="radar-grid">
        <AnimatePresence mode="popLayout">
          {items.map((r) => (
            <motion.li
              key={r.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={r.href} target="_blank" rel="noopener noreferrer" className="radar-card">
                <span className={`radar-kind radar-kind--${r.kind.toLowerCase()}`}>{r.kind}</span>
                <h3>{r.title}</h3>
                <p>{r.note}</p>
                <span className="radar-source">
                  {r.source} <ArrowUpRight />
                </span>
              </a>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
