"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { Pill, Section, SectionHeader } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";

// First card spans the full row; the last one does too if it would otherwise sit alone.
const isWide = (i: number, total: number) => i === 0 || (i === total - 1 && (total - 1) % 2 === 1);

function ProjectCard({ p, wide, index }: { p: Project; wide: boolean; index: number }) {
  const meta = p.tags ?? ([p.client, p.year].filter(Boolean) as string[]);
  return (
    <Link href={`/portfolio/${p.slug}`} className={`project-card ds-card--${p.tone}${wide ? " project-card--wide" : ""}`}>
      <div className="project-media">
        <Image src={p.cover} alt={p.title} fill sizes={wide ? "(max-width: 809px) 100vw, 1300px" : "(max-width: 809px) 100vw, 640px"} />
      </div>
      <div className="project-meta">
        <div>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{p.title}</h3>
          {meta.length > 0 && (
            <div className="project-tags">
              {meta.map((m) => (
                <Pill key={m} variant="frost">{m}</Pill>
              ))}
            </div>
          )}
        </div>
        <motion.span className="project-arrow" aria-hidden whileHover={{ scale: 1.1 }}>
          ↗
        </motion.span>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <Section tone="surface" id="projects">
      <SectionHeader eyebrow="Selected work" title="Featured Projects" />
      <Stagger className="projects-grid">
        {projects.map((p, i) => {
          const wide = isWide(i, projects.length);
          return (
            <StaggerItem key={p.slug} className={wide ? "projects-wide" : undefined}>
              <ProjectCard p={p} wide={wide} index={i} />
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
