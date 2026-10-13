"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Pill, Sparkle } from "@/components/ui";
import { ease } from "@/components/motion";
import type { Project } from "@/lib/data";

/** Generic case-study hero for projects without a bespoke one. */
export default function CaseHero({ project }: { project: Project }) {
  const meta = [project.year, project.client, project.company, ...(project.tags ?? [])].filter(Boolean) as string[];
  return (
    <div className="case-hero">
      <Sparkle size={26} style={{ right: "8%", top: 40 }} />
      <Sparkle size={16} delay={1} style={{ left: "6%", top: "40%" }} />
      {meta.length > 0 && (
        <motion.div className="case-hero-meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
          {meta.map((m, i) => (
            <Pill key={m} variant={i === 0 ? "navy" : "frost"}>{m}</Pill>
          ))}
          {project.website && (
            <a href={project.website.href} target="_blank" rel="noopener noreferrer" className="ds-pill ds-pill--frost">
              {project.website.label} ↗
            </a>
          )}
        </motion.div>
      )}
      <motion.h1 className="case-hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease }}>
        {project.title}
      </motion.h1>
      <motion.div className="case-hero-cover" initial={{ opacity: 0, y: 80, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.25, duration: 1, ease }}>
        <Image src={project.cover} alt={project.title} width={2400} height={1600} priority sizes="(max-width: 1440px) 100vw, 1300px" />
      </motion.div>
    </div>
  );
}
