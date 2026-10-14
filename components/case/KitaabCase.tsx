import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * Kitaab — accounting SaaS case study, built from the Figma frame
 * "Kitaab — case study (portfolio redesign)" (file uCV99jzPqWjUbQx1HwxBsZ, node 2070:601).
 * Screens are exports of the real UI frames in that file; everything else is live markup. Styles: styles/kitaab.css.
 */

const kt = (name: string) => `/images/kitaab/${name}`;

const meta = [
  { k: "Industry", v: "FinTech / SaaS" },
  { k: "Platform", v: "Responsive web application" },
  { k: "Role", v: "Lead UI/UX Designer" },
  { k: "Duration", v: "3 months" },
];

const goals = [
  { t: "Simplify", d: "Make complex financial workflows simple to follow." },
  { t: "Navigate", d: "Improve navigation and task completion across modules." },
  { t: "Systemise", d: "Create a consistent and scalable design system." },
  { t: "Build trust", d: "Use clear, transparent interactions around every number." },
  { t: "Respond", d: "Design one responsive experience for desktop and mobile." },
];

const screens = [
  { src: "business-snapshot.webp", t: "Business snapshot", d: "Key figures summarised first; line-level detail only when asked for." },
  { src: "reports.webp", t: "Reports", d: "Statements organised by period and type, ready to view or download." },
  { src: "documents.webp", t: "Documents", d: "Every invoice, receipt and filing in one searchable place." },
  { src: "chats.webp", t: "Chats", d: "Talk to the bookkeeping team without leaving the workspace." },
];

const roles = [
  { src: "bookkeeper-tasks.webp", t: "Bookkeeper — Tasks", d: "A task queue for each client’s monthly books, with status at a glance." },
  { src: "admin-dashboard.webp", t: "Super admin — Dashboard", d: "Registrations, users and work status across the whole platform." },
];

const phones = [
  { src: "m-home.webp", t: "Home" },
  { src: "m-financials.webp", t: "Financials" },
  { src: "m-categories.webp", t: "Categories" },
  { src: "m-reports.webp", t: "Reports" },
  { src: "m-settings.webp", t: "Settings" },
];

function Screen({ src, t, d, sizes, priority }: { src: string; t: string; d: string; sizes: string; priority?: boolean }) {
  return (
    <figure className="kt-screen">
      <Image src={kt(src)} alt={`Kitaab ${t} screen`} width={1440} height={900} sizes={sizes} priority={priority} />
      <figcaption>
        <strong>{t}</strong>
        <span>{d}</span>
      </figcaption>
    </figure>
  );
}

export default function KitaabCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="kt-scope">
        {/* ---------- hero ---------- */}
        <section className="kt-panel kt-dark kt-hero">
          <div className="kt-topbar">
            <Image src={kt("logo.svg")} alt="Kitaab" width={148} height={36} className="kt-logo" priority />
            <ul className="kt-services" aria-label="Services">
              {["Online accounting", "Taxation", "CFO services"].map((s) => (
                <li key={s} className="kt-chip"><span className="kt-chip-dot" aria-hidden />{s}</li>
              ))}
            </ul>
          </div>
          <Reveal className="kt-intro">
            <p className="kt-label kt-label--lime">Case study · Accounting SaaS · UAE</p>
            <h1 className="kt-title">Kitaab</h1>
            <div className="kt-subrow">
              <p className="kt-subtitle">An AI-powered financial operating system that brings bookkeeping, VAT, corporate tax and reporting together for UAE startups and SMEs.</p>
              <p className="kt-hand" aria-hidden>Financial<br />management, made calm.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="kt-mockup">
            <Image src={kt("hero-mockup.webp")} alt="Kitaab home dashboard showing bookkeeping status by month" width={2528} height={1200} priority sizes="(max-width: 1440px) 100vw, 1264px" />
          </Reveal>
          <dl className="kt-meta">
            {meta.map((m) => (
              <div key={m.k}><dt className="kt-label">{m.k}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
        </section>

        {/* ---------- disclaimer ---------- */}
        <div className="kt-panel kt-disclaimer-wrap">
          <p className="kt-disclaimer">
            <span aria-hidden>!</span>
            Kitaab is an internal application, so every screen shown here is a representation of the actual work, not the production product.
          </p>
        </div>

        {/* ---------- overview + role ---------- */}
        <section className="kt-panel kt-overview">
          <div className="kt-split">
            <Reveal>
              <p className="kt-label">01 / Overview</p>
              <h2 className="kt-h2">Every part of a business’s finances, in one calm workspace.</h2>
            </Reveal>
            <Reveal delay={0.1} className="kt-copy kt-copy--offset">
              <p>Kitaab.ai is an AI-powered financial operating system built for startups, entrepreneurs and SMEs in the UAE. It brings bookkeeping, accounting, VAT, corporate tax, compliance and financial reporting into a single digital experience.</p>
              <p className="kt-strong">The objective was to simplify complex financial workflows while giving users clarity, transparency and confidence in managing their business finances.</p>
            </Reveal>
          </div>
          <Reveal className="kt-role">
            <div>
              <p className="kt-label">My role</p>
              <h3 className="kt-h3">Lead UI/UX Designer</h3>
              <p className="kt-body">I led the UI/UX design for the platform, working closely with the Business Analyst, Project Manager and development team. They defined the business requirements and user flows together; I turned them into intuitive experiences through wireframes, high-fidelity designs, interactive prototypes and a scalable design system.</p>
            </div>
            <div className="kt-role-side">
              <div>
                <p className="kt-label kt-label--muted">Delivered</p>
                <ul className="kt-tags">{["Wireframes", "High-fidelity UI", "Prototypes", "Design system"].map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div>
                <p className="kt-label kt-label--muted">Worked with</p>
                <ul className="kt-tags">{["Business Analyst", "Project Manager", "Developers"].map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- challenge ---------- */}
        <section className="kt-panel kt-flush">
          <Reveal className="kt-challenge">
            <div className="kt-challenge-top">
              <p className="kt-label kt-label--lime">02 / The challenge</p>
              <div>
                <p>Financial platforms often present large amounts of information and technical terminology, making them hard to navigate for people who aren’t accountants.</p>
                <p>The challenge was to simplify complex workflows while keeping the accuracy and functionality that financial operations demand.</p>
              </div>
            </div>
            <p className="kt-question">How might we keep every number accurate and available, without making business owners feel like they need an accounting degree?</p>
            <p className="kt-label kt-label--lime">The guiding design question</p>
          </Reveal>
        </section>

        {/* ---------- goals ---------- */}
        <section className="kt-panel kt-flush">
          <Reveal>
            <p className="kt-label">03 / Goals</p>
            <h2 className="kt-h2">What the design had to do.</h2>
          </Reveal>
          <Stagger className="kt-goals">
            {goals.map((g, i) => (
              <StaggerItem key={g.t} className={`kt-goal${i === goals.length - 1 ? " kt-goal--accent" : ""}`}>
                <span className="kt-goal-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{g.t}</h3>
                <p>{g.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- key decision ---------- */}
        <section className="kt-panel kt-white">
          <div className="kt-split kt-split--end">
            <Reveal>
              <p className="kt-label">04 / The key decision</p>
              <h2 className="kt-h2 kt-h2--lg">Show less, on purpose.</h2>
            </Reveal>
            <Reveal delay={0.1} className="kt-copy">
              <p>Financial software tends to show everything at once — every line item, field and number — on the theory that more visibility means more transparency. In practice, it overwhelms users who don’t yet know what’s important.</p>
            </Reveal>
          </div>
          <Stagger className="kt-options">
            <StaggerItem className="kt-option">
              <span className="kt-pill kt-pill--ghost">Option considered</span>
              <h3>Keep everything visible</h3>
              <p>Rely on stronger visual hierarchy — size, weight, colour — to guide the eye to what matters. The conservative option: nothing hidden, nothing to click to find.</p>
            </StaggerItem>
            <StaggerItem className="kt-option kt-option--chosen">
              <span className="kt-pill"><span className="kt-chip-dot" aria-hidden />What I chose</span>
              <h3>Progressive disclosure</h3>
              <p>Summaries surface first; line-level detail only appears when a user actively asks for it.</p>
            </StaggerItem>
          </Stagger>
          <Reveal className="kt-why">
            <p className="kt-label">Why</p>
            <div>
              <p className="kt-body kt-body--lg">Visual hierarchy alone still leaves every number on screen, competing for attention even when styled to recede. For financial data the goal wasn’t just helping users find the important number faster — it was reducing how much a non-financial user has to process just to feel oriented. Progressive disclosure removes the competing information rather than de-emphasising it: a stronger version of the same goal.</p>
              <blockquote className="kt-quote">Nothing users needed was hidden — it was one tap away. It just wasn’t on screen by default, competing for attention.</blockquote>
            </div>
          </Reveal>
        </section>

        {/* ---------- wireframes ---------- */}
        <section className="kt-panel">
          <div className="kt-split kt-split--end">
            <Reveal>
              <p className="kt-label">05 / Wireframes</p>
              <h2 className="kt-h2">Structure before style.</h2>
            </Reveal>
            <Reveal delay={0.1} className="kt-copy">
              <p>Low-fidelity wireframes mapped the flows from the Business Analyst and Project Manager into screens, so layout and disclosure decisions could be agreed before any visual design.</p>
            </Reveal>
          </div>
          <Reveal className="kt-wireframes">
            <Image src={kt("wireframes.webp")} alt="Grid of low-fidelity Kitaab wireframes" width={2528} height={1428} sizes="(max-width: 1440px) 100vw, 1264px" />
          </Reveal>
        </section>

        {/* ---------- high fidelity ---------- */}
        <section className="kt-panel kt-white">
          <div className="kt-split kt-split--end">
            <Reveal>
              <p className="kt-label">06 / High-fidelity design</p>
              <h2 className="kt-h2">A calm, guided financial workspace.</h2>
            </Reveal>
            <Reveal delay={0.1} className="kt-copy">
              <p>Deep green for trust, lime for focus and plenty of white space. Each screen leads with a summary and keeps the next action close, so business owners always know where their books stand.</p>
            </Reveal>
          </div>
          <Reveal>
            <Screen src="home.webp" t="Home" d="Bookkeeping status month by month at a glance, with invoice uploads and on-demand help one step away." sizes="(max-width: 1440px) 100vw, 1264px" />
          </Reveal>
          <Stagger className="kt-grid">
            {screens.map((s) => (
              <StaggerItem key={s.t}><Screen {...s} sizes="(max-width: 809px) 100vw, 620px" /></StaggerItem>
            ))}
          </Stagger>

          <Reveal className="kt-roles-head">
            <p className="kt-label">Built for every role</p>
            <p className="kt-body kt-body--lg">The same design system extends to the people behind the books: bookkeepers, reviewers and the super admin.</p>
          </Reveal>
          <Stagger className="kt-grid">
            {roles.map((s) => (
              <StaggerItem key={s.t}><Screen {...s} sizes="(max-width: 809px) 100vw, 620px" /></StaggerItem>
            ))}
          </Stagger>

          <Reveal className="kt-mobile">
            <div className="kt-split kt-split--end">
              <div>
                <p className="kt-label kt-label--lime">Responsive</p>
                <h3 className="kt-h3 kt-h3--light">The same clarity on a phone.</h3>
              </div>
              <p className="kt-body kt-body--dark">Summaries stack into cards and navigation moves to a menu, so owners can check their numbers on the go.</p>
            </div>
            <ul className="kt-phones">
              {phones.map((p) => (
                <li key={p.t}>
                  <Image src={kt(p.src)} alt={`Kitaab mobile ${p.t} screen`} width={375} height={812} sizes="(max-width: 809px) 46vw, 220px" />
                  <span>{p.t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>
    </MotionProvider>
  );
}
