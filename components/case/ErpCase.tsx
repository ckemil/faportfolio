import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * Enterprise ERP & SFA case study. Styles are scoped to `.erp-scope` in styles/erp.css.
 * Copy is the original case study text; the UX decisions table was rebuilt from its old image.
 */

const img = (name: string) => `/images/${name}`;

const role = ["Stakeholder research", "Information architecture", "User flows", "Wireframes", "High-fidelity UI", "Design system", "Prototyping", "Developer handoff"];

const research = [
  { title: "Speed in the field is non-negotiable.", text: "Reps needed to place an order in minutes, standing in front of a customer — not after driving back to the office." },
  { title: "Visibility beats reporting.", text: "Managers didn't want another report; they wanted to see field activity as it happened." },
  { title: "Reconciliation was eating finance's week.", text: "Manual matching of records across systems was the single biggest time sink for finance." },
  { title: "Stock data had to be trustworthy.", text: "Warehouse teams needed one accurate number, not three conflicting ones." },
  { title: "Executives wanted answers, not spreadsheets.", text: "A dashboard that surfaced insight, not just data." },
];

const process = ["Discover", "Research", "Information Architecture", "User Flows", "Low-Fidelity Wireframes", "High-Fidelity UI", "Interactive Prototypes", "Usability Testing", "Iterate", "Developer Handoff"];

const products = [
  {
    tag: "ERP · Web",
    title: "Runs the business",
    modules: ["AI Dashboard", "CRM", "Sales", "Purchase", "Inventory / Warehouse", "Accounting", "HRMS", "Payroll", "Assets", "Approvals", "Reports", "Admin"],
    text: "The dashboard surfaces AI-driven insights — trends, anomalies, and forecasts — so executives get a head start on decisions instead of a pile of spreadsheets to interpret themselves.",
  },
  {
    tag: "SFA · Mobile",
    title: "Runs the field",
    modules: ["Visit planning", "GPS check-in", "Route optimization", "Order taking", "Live stock", "Collections", "Customer history", "Promotions", "Offline mode + sync"],
    text: "Access is role-based across Warehouse Gatekeeper, Manager, and Sales Person — each sees a tailored view built around their day, not a one-size-fits-all app.",
  },
];

const loop = [
  { step: "Rep checks in", where: "at a customer site" },
  { step: "Places an order", where: "on the spot, in the SFA app" },
  { step: "Syncs to the ERP", where: "in real time" },
  { step: "Seen live", where: "manager sees the order, warehouse sees updated stock" },
];

const decisions = [
  { area: "ERP Dashboard", tone: "violet", decision: "AI-driven insights, KPI cards, live activity feed", why: "Turned raw data into decisions executives could act on immediately" },
  { area: "ERP Forms", tone: "blue", decision: "Step-by-step sections, auto-save, validation", why: "Reduced errors and abandonment on long, complex entries" },
  { area: "ERP Tables", tone: "green", decision: "Sticky headers, advanced filters, bulk actions, export", why: "Made heavy operational data actually usable at scale" },
  { area: "SFA Interactions", tone: "orange", decision: "One-handed use, large touch targets", why: "Reps use the app while standing, walking, holding products" },
  { area: "SFA Connectivity", tone: "pink", decision: "Offline-first with auto-sync", why: "Field areas often had poor signal — the app couldn't stop working" },
  { area: "SFA Access", tone: "purple", decision: "Role-based views for Gatekeeper, Manager, Sales Person", why: "Each role sees only what's relevant to their job, not a generic dashboard" },
];

const impact = [
  "Executives moved from raw reports to AI-generated insights and forecasts",
  "Faster order processing and less manual data entry",
  "More accurate, trustworthy inventory data across warehouse and sales",
  "Real-time visibility into field sales activity for managers",
  "Faster approval cycles with clear status tracking",
  "Significantly reduced manual reconciliation time for finance",
  "One consistent experience across desktop and mobile — no relearning between platforms",
];

function Head({ eyebrow, title, children, light }: { eyebrow: string; title: string; children?: React.ReactNode; light?: boolean }) {
  return (
    <Reveal className={`erp-head${light ? " erp-head--light" : ""}`}>
      <span className="erp-eyebrow">{eyebrow}</span>
      <h2 className="erp-h2">{title}</h2>
      {children && <div className="erp-lead">{children}</div>}
    </Reveal>
  );
}

export default function ErpCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="erp-scope">
        {/* ---------- hero ---------- */}
        <section className="erp-panel erp-hero">
          <Reveal className="erp-hero-copy">
            <p className="erp-meta">
              <span>2025</span>
              <span>Seoul Oasis</span>
              <span>Web + Mobile</span>
            </p>
            <h1 className="erp-h1">Enterprise ERP &amp; Sales Force Automation Platform</h1>
            <p className="erp-hero-lead">
              A web ERP and a mobile sales app designed as one ecosystem, so an order placed in the field reaches the warehouse and
              finance in seconds.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="erp-hero-media">
            <Image src={img("kztwhzJ6t6fNmax9g7D5uy9Qw.png")} alt="ERP dashboard on desktop with the SFA app on a phone" width={3711} height={2700} priority sizes="(max-width: 1440px) 100vw, 1300px" />
          </Reveal>
        </section>

        {/* ---------- overview ---------- */}
        <section className="erp-panel">
          <div className="erp-split">
            <Head eyebrow="Overview" title="Two products, designed as one business." />
            <Reveal delay={0.1} className="erp-prose">
              <p>
                This project connected two products into one business: a web-based ERP that runs internal operations, and a mobile
                Sales Force Automation (SFA) app that puts the same operational intelligence into the hands of field sales reps.
                Instead of designing them as separate tools, I approached them as one ecosystem — a rep&apos;s order placed at a
                customer&apos;s door should be visible to a warehouse manager and a finance controller within seconds, not by end of day.
              </p>
              <span className="erp-label">My role</span>
              <ul className="erp-chips">
                {role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ---------- problem ---------- */}
        <section className="erp-panel erp-panel--tint">
          <div className="erp-split">
            <Head eyebrow="Core problem" title="A patchwork of tools that didn’t talk to each other." />
            <Reveal delay={0.1} className="erp-prose">
              <p>
                The organization was running on multiple disconnected third-party systems layered on top of manual processes —
                separate tools for sales, inventory, accounting, and customer management. Field sales reps recorded orders by hand,
                then re-entered them later, which meant delays, duplicate data entry, inventory mismatches, and management flying
                blind on what was actually happening outside the office.
              </p>
              <div className="erp-goal">
                <span>Goal</span>
                <p>
                  Replace the patchwork with one connected ecosystem — a web ERP for internal operations and a mobile SFA app for
                  the field — sharing the same real-time data, so every department is working off the same picture.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- research ---------- */}
        <section className="erp-panel">
          <Head eyebrow="Research highlights" title="What every team told us.">
            I met stakeholders across sales, warehouse, finance and management to understand how each team actually worked. These
            findings came up again and again, and shaped most of the decisions that followed.
          </Head>
          <Stagger className="erp-grid erp-grid--research">
            {research.map((r, i) => (
              <StaggerItem key={r.title} className="erp-card">
                <span className="erp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- process + design system ---------- */}
        <section className="erp-panel erp-panel--tint">
          <Head eyebrow="Design process" title="From discovery to developer handoff." />
          <Stagger className="erp-steps">
            {process.map((p, i) => (
              <StaggerItem key={p} className="erp-step">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {p}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="erp-prose erp-prose--wide">
            <p>
              A single, shared design system carried color, typography, grid, and components across both the web and mobile
              products — buttons, cards, tables, forms, modals, status indicators, and charts — so the experience felt like one
              product family, not two separately built apps, while also speeding up development.
            </p>
          </Reveal>
          <Reveal className="erp-media">
            <Image src={img("EmFVWl1XOUIpOmZBShccs9Je7gY.png")} alt="Shared design system across web and mobile" width={2895} height={1317} sizes="(max-width: 1440px) 100vw, 1300px" />
          </Reveal>
        </section>

        {/* ---------- solution ---------- */}
        <section className="erp-panel erp-panel--dark">
          <Head eyebrow="The solution" title="Two products, one ecosystem." light />
          <Reveal className="erp-media erp-media--dark">
            <Image src={img("xGCZQ7ajlAxUsbDQn7bCbJ1y8d0.png")} alt="ERP and SFA screens" width={4320} height={2700} sizes="(max-width: 1440px) 100vw, 1300px" />
          </Reveal>
          <Stagger className="erp-grid erp-grid--2">
            {products.map((p) => (
              <StaggerItem key={p.tag} className="erp-product">
                <span className="erp-product-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <ul className="erp-chips erp-chips--dark">
                  {p.modules.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <p>{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="erp-loop">
            <span className="erp-label erp-label--light">The core loop</span>
            <ol>
              {loop.map((l, i) => (
                <li key={l.step}>
                  <span className="erp-loop-num">{i + 1}</span>
                  <strong>{l.step}</strong>
                  <span>{l.where}</span>
                </li>
              ))}
            </ol>
            <p>What used to be a next-day report becomes a real-time event.</p>
          </Reveal>
        </section>

        {/* ---------- UX decisions ---------- */}
        <section className="erp-panel">
          <Head eyebrow="Key UX decisions" title="Six decisions, each tied to a real constraint." />
          <Reveal>
            <div className="erp-table" role="table">
            <div className="erp-row erp-row--head" role="row">
              <span role="columnheader">Area</span>
              <span role="columnheader">Decision</span>
              <span role="columnheader">Why it mattered</span>
            </div>
            {decisions.map((d) => (
              <div key={d.area} className="erp-row" role="row">
                <span role="cell">
                  <span className={`erp-pill erp-pill--${d.tone}`}>{d.area}</span>
                </span>
                <span role="cell" className="erp-row-decision">{d.decision}</span>
                <span role="cell" className="erp-row-why">{d.why}</span>
              </div>
            ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- impact ---------- */}
        <section className="erp-panel erp-panel--tint">
          <Head eyebrow="Business impact" title="What changed for the business." />
          <Stagger className="erp-grid erp-grid--impact">
            {impact.map((i) => (
              <StaggerItem key={i} className="erp-impact">
                <span className="erp-check" aria-hidden>
                  ✓
                </span>
                {i}
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- takeaway ---------- */}
        <section className="erp-panel erp-panel--dark erp-takeaway">
          <Reveal>
            <span className="erp-eyebrow erp-eyebrow--light">Key takeaway</span>
            <blockquote>
              Enterprise complexity and usability aren’t in conflict when research stays continuous and the design system is
              shared.
            </blockquote>
            <p>
              Connecting ERP and SFA into a single ecosystem — instead of treating them as separate products — turned scattered,
              delayed, third-party-fragmented data into one real-time, organization-wide view. That’s the difference between a tool
              people tolerate and a system they actually run their business on.
            </p>
          </Reveal>
        </section>

        {/* ---------- final screens ---------- */}
        <section className="erp-panel erp-panel--screens">
          <Head eyebrow="Final screens" title="The finished product." />
          <Reveal className="erp-media">
            <Image src={img("WOZPKWx8kur4QnHS2bis2czPAZY.png")} alt="Final ERP and SFA screens" width={4320} height={17598} sizes="(max-width: 1440px) 100vw, 1300px" />
          </Reveal>
        </section>
      </div>
    </MotionProvider>
  );
}
