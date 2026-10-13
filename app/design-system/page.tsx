import type { Metadata } from "next";
import { Badge, Button, Card, Eyebrow, Pill, Section, SectionHeader, SpeechNote, SplitPill, Sparkle, WarningNote } from "@/components/ui";
import Blocks from "@/components/case/Blocks";
import { avatar } from "@/lib/data";

export const metadata: Metadata = { title: "Design System | Fathima P" };

const colors: { group: string; items: [string, string][] }[] = [
  { group: "Brand", items: [["--ink", "#121a3d"], ["--navy", "#1b2559"], ["--primary", "#335cef"], ["--primary-500", "#5b7ff6"], ["--primary-300", "#7c9bff"], ["--primary-200", "#9db4ff"]] },
  { group: "Text", items: [["--text", "#4a5068"], ["--text-soft", "#5e6478"], ["--muted", "#8a90a6"], ["--on-dark", "#c9d1f0"], ["--on-primary", "#dce5ff"]] },
  { group: "Surfaces", items: [["--bg", "#ffffff"], ["--surface", "#f4f5f8"], ["--surface-soft", "#faf9fc"], ["--surface-strong", "#eaecf1"], ["--border", "#e3e5ec"]] },
  { group: "Tints", items: [["--tint-blue", "#dce5ff"], ["--tint-lime", "#e2f2b8"], ["--tint-lavender", "#d9ccfa"], ["--tint-pink", "#fbe2e6"], ["--tint-yellow", "#fff1c9"]] },
  { group: "Accents", items: [["--accent-lime", "#6a7a3a"], ["--accent-lavender", "#6b4bc4"], ["--accent-pink", "#f06b8a"], ["--accent-yellow", "#f5a623"], ["--accent-teal", "#5392a8"], ["--success", "#4cc36b"]] },
];

const type: [string, string, React.CSSProperties][] = [
  ["Display · Black 280", "Aa", { fontSize: "var(--fs-display)", fontWeight: 900, color: "var(--primary-300)", lineHeight: 1, letterSpacing: "var(--tracking-display)" }],
  ["H1 · Bold 56", "Learning that feels like play.", { fontSize: "var(--fs-h1)", fontWeight: 700, lineHeight: 1.15 }],
  ["H2 · Bold 40", "Progress over engagement.", { fontSize: "var(--fs-h2)", fontWeight: 700, lineHeight: 1.15 }],
  ["H3 · Bold 24", "Learning is cumulative", { fontSize: "var(--fs-h3)", fontWeight: 700 }],
  ["Lead · Regular 22", "Each lesson supports a specific skill.", { fontSize: "var(--fs-lead)", lineHeight: 1.45 }],
  ["Body · Regular 17", "Parents need to understand what their children are learning.", { fontSize: "var(--fs-body)", lineHeight: 1.5, color: "var(--text)" }],
  ["Eyebrow · Black 13 · +8%", "THE CHALLENGE", { fontSize: "var(--fs-xs)", fontWeight: 900, letterSpacing: "var(--tracking-eyebrow)" }],
];

const radii = [["xs", 12], ["sm", 18], ["md", 24], ["lg", 32], ["xl", 40], ["2xl", 48], ["pill", 999]] as const;

export default function DesignSystem() {
  return (
    <main id="top" className="ds-stack">
      <Section tone="blue" rings>
        <div className="dsdoc-hero">
          <Sparkle size={26} style={{ right: "10%", top: 0 }} />
          <SplitPill left="Portfolio" right="Design System" />
          <h1 className="ds-title" style={{ fontSize: "var(--fs-h1)", marginTop: 24 }}>
            One visual language, <span className="ds-hl">every page.</span>
          </h1>
          <p className="ds-lead" style={{ marginTop: 16, maxWidth: 760 }}>
            <span className="ds-muted">Extracted from the AptyRead case study in Figma.</span> Tokens live in{" "}
            <code>styles/tokens.css</code>, component styles in <code>styles/ds.css</code>, React components in{" "}
            <code>components/ui</code>.
          </p>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Foundations" title="Colour" />
        <div className="dsdoc-colors">
          {colors.map((g) => (
            <div key={g.group}>
              <h3 className="dsdoc-label">{g.group}</h3>
              <div className="dsdoc-swatches">
                {g.items.map(([name, hex]) => (
                  <div key={name} className="dsdoc-swatch">
                    <span style={{ background: `var(${name})` }} />
                    <strong>{name}</strong>
                    <small>{hex}</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeader eyebrow="Foundations" title="Typography" lead={{ muted: "Lato in Regular, Bold and Black.", text: "Headings are tight (1.15), body copy breathes (1.5)." }} />
        <div className="dsdoc-type">
          {type.map(([label, sample, style]) => (
            <div key={label} className="dsdoc-type-row">
              <small className="dsdoc-label">{label}</small>
              <span style={{ color: "var(--ink)", ...style }}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Foundations" title="Radius & elevation" />
        <div className="dsdoc-radii">
          {radii.map(([n, r]) => (
            <div key={n}>
              <span style={{ borderRadius: r === 999 ? 999 : r }} />
              <small>--r-{n} · {r === 999 ? "pill" : `${r}px`}</small>
            </div>
          ))}
        </div>
        <div className="dsdoc-radii" style={{ marginTop: 32 }}>
          {["sm", "md", "lg"].map((s) => (
            <div key={s}>
              <span style={{ borderRadius: 24, background: "#fff", boxShadow: `var(--shadow-${s})` }} />
              <small>--shadow-{s}</small>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeader eyebrow="Components" title="Eyebrows, pills, badges & buttons" />
        <div className="dsdoc-row">
          <Eyebrow>Navy eyebrow</Eyebrow>
          <span style={{ background: "var(--navy)", padding: 8, borderRadius: 999 }}><Eyebrow variant="white">White eyebrow</Eyebrow></span>
        </div>
        <div className="dsdoc-row">
          <Pill>Default</Pill>
          <Pill variant="navy">Navy</Pill>
          <Pill variant="blue">Blue</Pill>
          <Pill variant="lime">Lime</Pill>
          <Pill variant="lavender">Lavender</Pill>
          <Pill variant="pink">Pink</Pill>
          <Pill variant="yellow">Yellow</Pill>
          <SplitPill left="Your AI" right="Learning Buddy" />
        </div>
        <div className="dsdoc-row">
          {(["soft", "primary", "navy", "lime", "lavender", "pink", "teal", "yellow", "success"] as const).map((t, i) => (
            <Badge key={t} tone={t}>{i + 1}</Badge>
          ))}
        </div>
        <div className="dsdoc-row">
          <Button href="#" variant="primary">Primary</Button>
          <Button href="#" variant="navy" icon="↗">Navy with icon</Button>
          <span style={{ background: "var(--primary)", padding: 12, borderRadius: 999, display: "inline-flex", gap: 12 }}>
            <Button href="#" variant="white" icon="→">White</Button>
            <Button href="#" variant="ghost">Ghost</Button>
          </span>
        </div>
      </Section>

      <Section tone="blue" rings="b">
        <SectionHeader eyebrow="Components" title="Cards" lead={{ muted: "One component, eleven tones.", text: "Each tone pairs with a badge colour automatically." }} />
        <div className="ds-grid ds-grid--3">
          <Card badge="1" tone="white" title="White">On tinted sections.</Card>
          <Card badge="2" tone="frost" title="Frost">Translucent white on blue.</Card>
          <Card badge="3" tone="navy" title="Navy">The emphasised card in a row.</Card>
          <Card badge="4" tone="lime" title="Lime">Pastel tint with lime accent.</Card>
          <Card badge="5" tone="lavender" title="Lavender">Pastel tint with violet accent.</Card>
          <Card badge="6" tone="pink" title="Pink">Pastel tint with pink accent.</Card>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeader eyebrow="Components" title="Notes" />
        <SpeechNote avatar={avatar} label="Speech note:" text="avatar plus bubble, with a highlighted label." tail="The muted tail carries secondary detail." />
        <WarningNote label="Warning note:" text="for caveats and things still to be measured." />
      </Section>

      <Section tone="soft">
        <SectionHeader eyebrow="Patterns" title="Flow, process & table" />
        <Blocks
          blocks={[
            { type: "flow", loop: "↺  Loops back to the start", items: [
              { tone: "lime", title: "Step one", text: "Lime" },
              { tone: "blue", title: "Step two", text: "Blue" },
              { tone: "lavender", title: "Step three", text: "Lavender" },
              { tone: "pink", title: "Step four", text: "Pink" },
              { tone: "navy", title: "Step five", text: "Navy" },
            ] },
          ]}
        />
        <div style={{ marginTop: 64 }}>
          <Blocks blocks={[{ type: "process", items: [{ tone: "lime", title: "Learning flow" }, { tone: "blue", title: "Structure" }, { tone: "lavender", title: "Character & voice" }, { tone: "pink", title: "UI design" }, { tone: "navy", title: "Refinement" }] }]} />
        </div>
        <div style={{ marginTop: 64 }}>
          <Blocks blocks={[{ type: "table", head: ["Area", "What to measure"], rows: [{ label: "Learnability", tone: "lime", text: "Rows animate in one by one." }, { label: "Task success", tone: "blue", text: "Pill tone comes from the row." }] }]} />
        </div>
      </Section>

      <Section tone="primary" rings>
        <SectionHeader eyebrow="Patterns" eyebrowVariant="white" title="Metrics on primary" />
        <Blocks blocks={[{ type: "metrics", items: [{ dir: "up", label: "Goes up", value: "To be measured" }, { dir: "down", label: "Goes down", value: "To be measured" }, { dir: "up", label: "Arrows bob", value: "Ambient" }] }]} />
      </Section>

      <Section tone="navy" rings="b">
        <SectionHeader
          eyebrow="Motion"
          eyebrowVariant="white"
          title="Calm, purposeful motion."
          lead={{ muted: "Everything eases out on cubic-bezier(.22, 1, .36, 1).", text: "All motion respects the OS reduce-motion setting." }}
        />
        <div className="ds-grid ds-grid--3">
          <Card tone="glass" title="Enter">Sections rise and scale in; children stagger at 90ms.</Card>
          <Card tone="glass" title="Ambient">Rings drift, sparkles twinkle, mascots and chips float.</Card>
          <Card tone="glass" title="Response">Cards lift on hover, arrows nudge, buttons press.</Card>
        </div>
      </Section>
    </main>
  );
}
