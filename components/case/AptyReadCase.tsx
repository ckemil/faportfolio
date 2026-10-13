import { MotionProvider } from "@/components/motion";
import { Section, SectionHeader } from "@/components/ui";
import { aptyreadSections } from "@/lib/aptyread";
import Blocks from "./Blocks";
import { AptyHero } from "./AptyRead";
import Mascot from "./Mascot";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * AptyRead case study, built from the Figma "Apty Read — Case Study" frame.
 * Its design tokens are scoped to `.apty-scope`, so nothing here affects the rest of the site.
 */
export default function AptyReadCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="apty-scope ds-stack">
        <Section tone="blue" rings className="hero-section">
          <AptyHero />
        </Section>

        {aptyreadSections.map((s, i) => (
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
      </div>
    </MotionProvider>
  );
}
