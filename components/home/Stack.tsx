import Image from "next/image";
import { stack, type Tool } from "@/lib/data";
import { Section, SectionHeader } from "@/components/ui";

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-card">
      <span className="tool-icon">
        <Image src={tool.icon} alt={tool.name} fill sizes="52px" unoptimized={tool.icon.endsWith(".gif")} />
      </span>
      <span className="tool-text">
        <strong>{tool.name}</strong>
        <span>{tool.desc}</span>
      </span>
    </a>
  );
}

function Row({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  // Duplicated once so the CSS marquee can loop seamlessly.
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {[...tools, ...tools].map((t, i) => (
          <ToolCard key={`${t.name}-${i}`} tool={t} />
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const half = Math.ceil(stack.length / 2);
  return (
    <Section tone="primary" rings id="stack" className="stack-section">
      <SectionHeader eyebrow="My Stack" eyebrowVariant="white" title="My Stack" />
      <Row tools={stack.slice(0, half)} />
      <Row tools={stack.slice(half)} reverse />
    </Section>
  );
}
