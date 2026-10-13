import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";

// First card spans the full row; the last one does too if it would otherwise sit alone.
const isWide = (i: number, total: number) => i === 0 || (i === total - 1 && (total - 1) % 2 === 1);

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <h2 className="section-title">Featured Projects</h2>
      </Reveal>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className={isWide(i, projects.length) ? "project-wide" : undefined}>
            <Link href={`/portfolio/${p.slug}`} className="project-card">
              <div className="project-media">
                <Image src={p.cover} alt={p.title} fill sizes="(max-width: 809px) 100vw, 60vw" />
              </div>
              <div className="project-meta">
                <h3>{p.title}</h3>
                <span className="project-arrow" aria-hidden>
                  ↗
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
