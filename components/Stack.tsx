import Image from "next/image";
import { stack, type Tool } from "@/lib/data";
import Reveal from "./Reveal";

function ToolCard({ tool, hidden }: { tool: Tool; hidden?: boolean }) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card"
      // the duplicate copy only exists for the seamless loop: keep it out of tab order and screen readers
      {...(hidden ? { "aria-hidden": true, tabIndex: -1 } : {})}
    >
      <span className="tool-icon">
        <Image src={tool.icon} alt="" fill sizes="36px" unoptimized={tool.icon.endsWith(".gif")} />
      </span>
      <span className="tool-text">
        <strong>{tool.name}</strong>
        <span>{tool.desc}</span>
      </span>
      <svg className="tool-arrow" viewBox="0 0 16 16" aria-hidden>
        <path d="M4 12 L12 4 M5 4 H12 V11" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </a>
  );
}

/** Two marquee rows drifting in opposite directions; pauses on hover. */
function Row({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {tools.map((t) => (
          <ToolCard key={t.name} tool={t} />
        ))}
        {tools.map((t) => (
          <ToolCard key={`${t.name}-copy`} tool={t} hidden />
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
      <Reveal className="marquee-rows">
        <Row tools={stack.slice(0, half)} />
        <Row tools={stack.slice(half)} reverse />
      </Reveal>
    </section>
  );
}
