import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * Duxbe — restaurant management case study, built from the Figma frame
 * "Duxbe — case study" (file 6risBblxBAIRyuWT24cX2U, node 2:2). Styles: styles/duxbe.css.
 */

const dx = (name: string) => `/images/duxbe/${name}`;

const modules = ["Point of sale", "Inventory", "Recipes", "Purchasing", "Loyalty"];

const meta = [
  { k: "Role", v: "Senior Product Designer" },
  { k: "Product", v: "Restaurant management platform" },
  { k: "Timeline", v: "5 months" },
];

const focus = [
  { t: "Simplifying workflows", d: "Making frequent tasks such as order taking, billing and inventory management easier to complete." },
  { t: "Connecting operations", d: "Improving the relationship between menu items, recipes, ingredients and purchasing." },
  { t: "Improving visibility", d: "Helping owners spot important metrics, stock risks and operational issues quickly." },
];

const phases = [
  { t: "Discover", d: "Understand how restaurant teams take orders, manage stock and buy ingredients today.", m: ["Workflow analysis"], out: "Workflow map" },
  { t: "Define", d: "Structure the product around the tasks teams repeat every day.", m: ["Information architecture", "User flows"], out: "IA & key flows" },
  { t: "Design", d: "Turn flows into screens, then into reusable patterns.", m: ["Wireframes", "High-fidelity UI", "Design system"], out: "UI & component library", state: "focus" },
  { t: "Validate", d: "Check the solutions with real users and data before scaling them.", m: ["Prototyping", "Usability testing", "Product analytics"], out: "Findings to iterate on", state: "planned" },
  { t: "Deliver", d: "Work alongside developers so the design ships as intended.", m: ["Developer collaboration", "Handoff"], out: "Build-ready specs" },
] as const;

export default function DuxbeCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="dx-scope">
        {/* ---------- hero ---------- */}
        <section className="dx-panel dx-hero">
          <span className="dx-ring dx-ring--a" aria-hidden />
          <span className="dx-ring dx-ring--b" aria-hidden />
          <div className="dx-topbar">
            <span className="dx-brand"><span className="dx-mark" aria-hidden>D</span>Duxbe</span>
            <ul className="dx-modules" aria-label="Modules">
              {modules.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </div>
          <Reveal className="dx-intro">
            <p className="dx-label dx-label--light">Case study · Restaurant SaaS</p>
            <h1 className="dx-title">Simplifying restaurant management.</h1>
            <p className="dx-subtitle">A restaurant platform that connects point of sale, inventory, recipes, purchasing and customer loyalty in one ecosystem.</p>
          </Reveal>
          <dl className="dx-meta">
            {meta.map((m) => (
              <div key={m.k}><dt className="dx-label dx-label--muted">{m.k}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
          <Reveal delay={0.15} className="dx-hero-shot">
            <Image src={dx("dashboard.webp")} alt="Duxbe dashboard with revenue, customers, transactions, store visits and best-selling products" width={2528} height={1580} priority sizes="(max-width: 1440px) 100vw, 1264px" />
          </Reveal>
        </section>

        {/* ---------- disclaimer + overview ---------- */}
        <section className="dx-panel dx-overview">
          <p className="dx-disclaimer">
            <span aria-hidden>!</span>
            <span><strong>Disclaimer:</strong> Due to the confidential nature of the project, all images are representations of the actual work.</span>
          </p>
          <div className="dx-split">
            <Reveal>
              <p className="dx-label">01 / Overview</p>
              <h2 className="dx-h2">One connected platform for every part of the restaurant.</h2>
            </Reveal>
            <Reveal delay={0.1} className="dx-copy dx-copy--offset">
              <p>Duxbe is a restaurant management platform that connects point of sale, inventory, recipe management, purchasing and customer loyalty in one ecosystem.</p>
              <p className="dx-strong">My goal was to create an intuitive experience that simplifies daily restaurant operations and helps owners make informed business decisions.</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- problem ---------- */}
        <section className="dx-panel dx-flush">
          <Reveal className="dx-problem">
            <div className="dx-problem-top">
              <p className="dx-label dx-label--light">02 / The problem</p>
              <p>Restaurant teams often manage orders, ingredients, recipes and purchasing across different workflows. Limited visibility and disconnected information make daily operations more complicated.</p>
            </div>
            <p className="dx-question">How might we simplify restaurant management while improving operational efficiency and decision-making?</p>
            <p className="dx-label dx-label--light">The challenge</p>
          </Reveal>
        </section>

        {/* ---------- approach ---------- */}
        <section className="dx-panel dx-flush">
          <Reveal>
            <p className="dx-label">03 / My approach</p>
            <h2 className="dx-h2">Three areas of focus.</h2>
          </Reveal>
          <Stagger className="dx-focus">
            {focus.map((f, i) => (
              <StaggerItem key={f.t} className={`dx-card${i === 1 ? " dx-card--tint" : ""}`}>
                <span className="dx-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- process ---------- */}
        <section className="dx-panel dx-flush">
          <div className="dx-split dx-split--end">
            <Reveal>
              <p className="dx-label">04 / Design process</p>
              <h2 className="dx-h2">From workflow to working product.</h2>
            </Reveal>
            <Reveal delay={0.1} className="dx-copy">
              <p>Five phases, each with a clear output, moving from how restaurants run today to a product the development team could build.</p>
            </Reveal>
          </div>
          <Stagger className="dx-steps">
            {phases.map((p, i) => {
              const state = "state" in p ? p.state : undefined;
              return (
                <StaggerItem key={p.t} className={`dx-step${state ? ` dx-step--${state}` : ""}`}>
                  <div className="dx-step-rail" aria-hidden>
                    <span className="dx-step-node">{String(i + 1).padStart(2, "0")}</span>
                    {i < phases.length - 1 && <span className="dx-step-line" />}
                  </div>
                  <div className="dx-step-card">
                    <div className="dx-step-top">
                      <span>Phase {String(i + 1).padStart(2, "0")}</span>
                      {state === "focus" && <em>Main focus</em>}
                      {state === "planned" && <em>Next step</em>}
                    </div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                    <ul className="dx-chips">{p.m.map((m) => <li key={m}>{m}</li>)}</ul>
                    <div className="dx-step-out">
                      <span>Output</span>
                      <strong>{p.out}</strong>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className="dx-legend"><span aria-hidden />Dashed: validation through usability testing and product analytics is the planned next step, not completed research.</p>
        </section>

        {/* ---------- outcome ---------- */}
        <section className="dx-panel dx-white">
          <div className="dx-split">
            <Reveal>
              <p className="dx-label">05 / Outcome</p>
              <h2 className="dx-h2">More than an ERP system.</h2>
            </Reveal>
            <Reveal delay={0.1} className="dx-copy dx-copy--offset">
              <p>The design direction positions Duxbe as a connected platform for managing restaurant operations, not only a point of sale.</p>
              <p className="dx-strong">The focus is on reducing unnecessary navigation, making operational information easier to understand, and helping users move from identifying a problem to taking action.</p>
            </Reveal>
          </div>
          <p className="dx-note">Actual business impact should be supported by verified usability findings, product analytics or customer feedback.</p>
        </section>

        {/* ---------- learnings ---------- */}
        <section className="dx-panel dx-dark">
          <Reveal>
            <p className="dx-label dx-label--light">06 / Key learnings</p>
            <p className="dx-closing">Designing restaurant software means balancing speed, accuracy and complexity.</p>
            <p className="dx-closing-sub">The most valuable experiences do more than display information: they connect workflows, clarify decisions and help users act confidently.</p>
          </Reveal>
        </section>
      </div>
    </MotionProvider>
  );
}
