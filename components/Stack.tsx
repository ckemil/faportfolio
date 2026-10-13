import Image from "next/image";
import { stack, type Tool } from "@/lib/data";
import Reveal from "./Reveal";

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" className="tool-card">
      <span className="tool-icon">
        <Image src={tool.icon} alt={tool.name} fill sizes="48px" unoptimized={tool.icon.endsWith(".gif")} />
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
    <section id="stack" className="section stack">
      <Reveal>
        <h2 className="section-title">My Stack</h2>
      </Reveal>
      <Row tools={stack.slice(0, half)} />
      <Row tools={stack.slice(half)} reverse />
    </section>
  );
}
