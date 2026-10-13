"use client";

import { motion } from "framer-motion";
import { ease } from "@/components/motion";
import type { Visual } from "@/lib/aptyread";

/** Small illustrations inside Product Strategy / Design System cards (rebuilt from Figma). */
export default function CardVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case "now-next":
      return (
        <>
          <span className="ds-pill ds-pill--navy">NOW · Trace the letter S</span>
          <motion.span
            style={{ color: "var(--muted)", fontWeight: 700 }}
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span className="ds-pill">NEXT · Say the word</span>
        </>
      );
    case "bars": {
      const bars = [
        { label: "Letters", h: 40, bg: "rgba(51,92,239,.35)" },
        { label: "Sounds", h: 64, bg: "rgba(51,92,239,.55)" },
        { label: "Words", h: 88, bg: "rgba(51,92,239,.75)" },
        { label: "Reading", h: 112, bg: "var(--navy)" },
      ];
      return (
        <div className="viz-bars">
          {bars.map((b, i) => (
            <div key={b.label} className="viz-bar">
              <motion.span
                style={{ background: b.bg, height: b.h }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease }}
              />
              <small>{b.label}</small>
            </div>
          ))}
        </div>
      );
    }
    case "parent-toggle":
      return (
        <>
          <span className="ds-pill" style={{ gap: 10 }}>
            Daily limit · 2 lessons
            <motion.span
              className="viz-toggle"
              initial={{ backgroundColor: "#c9ccd6" }}
              whileInView={{ backgroundColor: "#4cc36b" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.span initial={{ x: 0 }} whileInView={{ x: 16 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 22 }} />
            </motion.span>
          </span>
          <span className="ds-pill" style={{ fontSize: 13 }}>Nyha · 80% of Level 1</span>
        </>
      );
    case "states":
      return (
        <div className="viz-states">
          <p>STATES WITHOUT RELYING ON COLOUR</p>
          {[
            { icon: "✓", cls: "ds-badge--success", label: "Completed" },
            { icon: "2", cls: "ds-badge--white", label: "Current" },
            { icon: "🔒", cls: "", label: "Upcoming" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="viz-state"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, ease }}
            >
              <span className={`ds-badge ds-badge--xs ${s.cls}`} style={s.cls ? undefined : { background: "var(--navy-600)", color: "#fff" }}>
                {s.icon}
              </span>
              {s.label}
            </motion.div>
          ))}
        </div>
      );
  }
}
