"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, Pill, SpeechNote, WarningNote, LeadText } from "@/components/ui";
import { Reveal, Stagger, StaggerItem, ease } from "@/components/motion";
import type { Block } from "@/lib/case-studies";
import CardVisual from "./Visuals";
import { AptyIntro, AptyClosing } from "./AptyRead";

const DEFAULT_AVATAR = "/images/YgxBe7wgNd93XD54nNj4qVCKM.jpeg";

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</>;
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <Reveal>
          <p className="ds-body block-gap">{block.text}</p>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal>
          <LeadText lead={block.lead} className="ds-quote" />
        </Reveal>
      );

    case "cards": {
      const grid = (
        <Stagger className={`ds-grid ds-grid--${block.columns ?? 3}${block.framed ? "" : " block-gap"}`}>
          {block.items.map((it, i) => (
            <StaggerItem key={i} className="ds-grid-cell">
              {it.visual === "states" ? (
                <div className="ds-card ds-card--navy" style={{ height: "100%" }}>
                  <CardVisual kind="states" />
                </div>
              ) : (
                <Card
                  tone={it.tone}
                  badge={it.badge}
                  badgeTone={it.badgeTone}
                  title={it.title}
                  inlineBadge={!!it.visual}
                  visual={it.visual && <CardVisual kind={it.visual} />}
                  className="ds-fill"
                >
                  {it.text}
                </Card>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      );
      return block.framed ? <div className="ds-grid-frame">{grid}</div> : grid;
    }

    case "flow":
      return (
        <div className="ds-flow" style={{ ["--n" as string]: block.items.length }}>
          <Stagger className="ds-flow-row" style={{ ["--n" as string]: block.items.length }}>
            {block.items.map((s, i) => (
              <StaggerItem key={s.title} className={`ds-flow-step ds-tone-${s.tone}`}>
                <span className="ds-flow-num">{String(i + 1).padStart(2, "0")}</span>
                <strong className="ds-flow-title">{s.title}</strong>
                {s.text && <span className="ds-flow-text">{s.text}</span>}
                {s.chips && (
                  <span className="ds-flow-chips">
                    {s.chips.map((c) => (
                      <Pill key={c} size="sm">{c}</Pill>
                    ))}
                  </span>
                )}
              </StaggerItem>
            ))}
          </Stagger>
          {block.loop && (
            <div className="ds-flow-loop" aria-hidden>
              <svg viewBox="0 0 1000 72" preserveAspectRatio="none">
                <motion.path
                  d="M2 0 V40 Q2 70 34 70 H966 Q998 70 998 40 V0"
                  fill="none"
                  stroke="var(--dash)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.6, ease }}
                />
              </svg>
              <motion.span
                className="ds-flow-loop-label"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.6, ease }}
              >
                {block.loop}
              </motion.span>
            </div>
          )}
        </div>
      );

    case "process": {
      const circle: Record<string, { bg: string; fg?: string; band: string }> = {
        lime: { bg: "var(--tint-lime)", band: "rgba(200,229,138,.7)" },
        blue: { bg: "var(--tint-blue)", band: "rgba(220,229,255,.7)" },
        lavender: { bg: "#b79cf2", fg: "#fff", band: "rgba(217,204,250,.7)" },
        pink: { bg: "var(--primary-500)", fg: "#fff", band: "rgba(201,214,255,.7)" },
        navy: { bg: "var(--navy)", fg: "#fff", band: "transparent" },
      };
      const accent: Record<string, string> = { lime: "#9cc54a", blue: "var(--primary)", lavender: "#7b4fd8", pink: "var(--primary)", navy: "var(--navy)" };
      return (
        <div className="ds-process" style={{ ["--n" as string]: block.items.length }}>
          <div className="ds-process-band" aria-hidden>
            {block.items.slice(0, -1).map((s, i) => (
              <motion.span
                key={s.title}
                style={{ background: circle[s.tone].band }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.25, ease }}
              />
            ))}
          </div>
          {block.items.map((s, i) => (
            <motion.div
              key={s.title}
              className="ds-process-item"
              style={{ ["--step-accent" as string]: accent[s.tone], ["--circle-bg" as string]: circle[s.tone].bg, ["--circle-fg" as string]: circle[s.tone].fg }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 + i * 0.25 }}
            >
              <span className="ds-process-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ds-process-circle">
                <span className="ds-process-arc" aria-hidden />
                {s.title}
              </span>
            </motion.div>
          ))}
        </div>
      );
    }

    case "table":
      return (
        <Reveal className="ds-table">
          <div className="ds-table-row ds-table-head">
            <span>{block.head[0]}</span>
            <span>{block.head[1]}</span>
          </div>
          {block.rows.map((r, i) => (
            <motion.div
              key={r.label}
              className="ds-table-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, ease }}
            >
              <span>
                <Pill variant={r.tone === "navy" ? "navy" : r.tone} size="sm">{r.label}</Pill>
              </span>
              <span>{r.text}</span>
            </motion.div>
          ))}
        </Reveal>
      );

    case "metrics":
      return (
        <Stagger className="ds-grid ds-grid--5">
          {block.items.map((m) => (
            <StaggerItem key={m.label} className="ds-card ds-card--glass ds-metric">
              <span className="ds-metric-arrow" data-dir={m.dir}>
                <span>{m.dir === "up" ? "↑" : "↓"}</span>
              </span>
              <h3 className="ds-card-title">{m.label}</h3>
              <span className="ds-pill ds-pill--glass">{m.value}</span>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case "checklist":
      return (
        <Stagger className="ds-checklist">
          {block.items.map((it) => (
            <StaggerItem key={it} style={{ display: "contents" }}>
              <li>
                <span className="ds-badge ds-badge--xs ds-badge--white">✓</span>
                {it}
              </li>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case "image":
      return (
        <Reveal className="block-gap">
          <figure className={`ds-media${block.bare ? " ds-media--bare" : ""}`}>
            <Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 1440px) 100vw, 1300px" />
          </figure>
          {block.caption && <p className="ds-caption">{block.caption}</p>}
        </Reveal>
      );

    case "images":
      return (
        <Stagger className="ds-grid ds-grid--2 block-gap">
          {block.items.map((it) => (
            <StaggerItem key={it.src} className="ds-media ds-media--hover">
              <Image src={it.src} alt={it.alt} width={it.width} height={it.height} sizes="(max-width: 809px) 100vw, 640px" />
            </StaggerItem>
          ))}
        </Stagger>
      );

    case "speech":
      return <SpeechNote avatar={block.avatar ?? DEFAULT_AVATAR} label={block.label} text={block.text} tail={block.tail} />;

    case "warning":
      return <WarningNote label={block.label} text={block.text} />;

    case "apty-intro":
      return <AptyIntro />;

    case "apty-closing":
      return <AptyClosing />;
  }
}
