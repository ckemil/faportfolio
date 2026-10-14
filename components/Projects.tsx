import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";

/** Design-tool style corner handles around a "selected" frame. */
function Handles() {
  return (
    <>
      <span className="handle tl" aria-hidden />
      <span className="handle tr" aria-hidden />
      <span className="handle bl" aria-hidden />
      <span className="handle br" aria-hidden />
    </>
  );
}

function meta(p: Project) {
  const who = p.client ?? p.company ?? p.tags?.slice(0, 2).join(" · ");
  return [who, p.year].filter(Boolean) as string[];
}

export default function Projects() {
  return (
    <section id="projects" className="works">
      <div className="works-inner">
        <Reveal className="works-head">
          <span className="works-eyebrow">
            Featured projects<span className="caret">_</span>
            <Handles />
          </span>
          <h2 className="works-title">Work I am proud of</h2>
        </Reveal>

        <div className="works-list">
          {projects.map((p) => {
            const [who, year] = meta(p);
            return (
              <Reveal key={p.slug} className="works-item">
                <span className="work-tag">
                  <span aria-hidden>◇</span> {p.industry}
                </span>
                <Link href={`/portfolio/${p.slug}`} className="work-card">
                  <Handles />
                  <div className="work-text">
                    {who && (
                      <span className="work-meta">
                        <span className="work-client">{who}</span>
                        {year && <span className="work-dot" aria-hidden />}
                        {year && <span>{year}</span>}
                      </span>
                    )}
                    <h3>{p.title}</h3>
                    {p.summary && <p>{p.summary}</p>}
                    <span className="work-cta">
                      View case study <span aria-hidden>→</span>
                    </span>
                  </div>
                  <div className="work-media">
                    <Image src={p.cover} alt={`${p.title} — UI/UX case study cover`} fill sizes="(max-width: 809px) 100vw, 600px" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
