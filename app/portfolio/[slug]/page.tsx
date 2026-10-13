import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, projects, type Block } from "@/lib/data";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AptyReadCase from "@/components/case/AptyReadCase";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? { title: `${project.title} | Fathima P`, openGraph: { images: [project.cover] } } : {};
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="cs-h2">{block.text}</h2>;
    case "h3":
      return <h3 key={i} className="cs-h3">{block.text}</h3>;
    case "p":
      return <p key={i} className="cs-p">{block.text}</p>;
    case "callout":
      return (
        <div key={i} className="cs-callout">
          {block.label && <strong>{block.label} </strong>}
          {block.text}
        </div>
      );
    case "points":
      return (
        <ul key={i} className="cs-points">
          {block.items.map((it) => (
            <li key={it.title}>
              <strong>{it.title}</strong> {it.text}
            </li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul key={i} className="cs-list">
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div key={i} className="cs-image">
          <Image src={block.src} alt={block.alt} width={1600} height={1000} sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>
      );
  }
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const nav = (
    <nav className="cs-nav">
      <Link href="/#projects" className="back-link">
        ← Back
      </Link>
    </nav>
  );

  if (project.hero === "aptyread") {
    return (
      <main id="top" className="cs">
        {nav}
        <AptyReadCase />
        <Footer cta />
      </main>
    );
  }

  const blocks = caseStudies[slug] ?? [];

  return (
    <main id="top" className="cs">
      {nav}

      <header className="cs-header">
        <Reveal>
          {(project.year || project.client || project.company || project.website || project.tags) && (
            <div className="cs-meta">
              {project.tags?.map((t) => <span key={t}>{t}</span>)}
              {project.year && <span>{project.year}</span>}
              {project.client && <span>{project.client}</span>}
              {project.company && <span>{project.company}</span>}
              {project.website && (
                <a href={project.website.href} target="_blank" rel="noopener noreferrer">
                  {project.website.label}
                </a>
              )}
            </div>
          )}
          <h1 className="cs-title">{project.title}</h1>
        </Reveal>
        <Reveal delay={0.1} className="cs-cover">
          <Image src={project.cover} alt={project.title} width={2400} height={1600} priority sizes="(max-width: 1200px) 100vw, 1200px" />
        </Reveal>
      </header>

      <article className="cs-body">{blocks.map(renderBlock)}</article>

      <Footer cta />
    </main>
  );
}
