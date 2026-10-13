import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { caseStudies } from "@/lib/case-studies";
import { Section, SectionHeader } from "@/components/ui";
import Blocks from "@/components/case/Blocks";
import CaseHero from "@/components/case/CaseHero";
import { AptyHero } from "@/components/case/AptyRead";
import Mascot from "@/components/case/Mascot";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";
import NextProject from "@/components/case/NextProject";

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

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const sections = caseStudies[slug] ?? [];

  return (
    <>
      <ScrollProgress />
      <main id="top" className="ds-stack">
        <Section tone="blue" rings className="hero-section">
          {project.hero === "aptyread" ? <AptyHero /> : <CaseHero project={project} />}
        </Section>

        {sections.map((s, i) => (
          <Section key={i} tone={s.tone} rings={s.rings} decor={s.mascot && <Mascot side={s.mascot} />}>
            <SectionHeader
              eyebrow={s.eyebrow}
              eyebrowVariant={s.tone === "primary" || s.tone === "navy" ? "white" : "navy"}
              title={s.title}
              highlight={s.highlight}
              lead={s.lead}
              layout={s.layout}
              plain={s.plain}
            />
            {s.blocks && <Blocks blocks={s.blocks} />}
          </Section>
        ))}

        <NextProject project={next} />
        <Footer />
      </main>
    </>
  );
}
