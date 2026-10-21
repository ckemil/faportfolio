import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";
import ArrowUpRight from "@/components/ArrowUpRight";

/**
 * Financial Partner Platform — case study, built from the Figma frame
 * "Financial Partner Platform — case study" (file Mv934ZWVEsrFEy8UdMQPi9, node 1:203).
 * Phones are 2x exports of that frame; everything else is live markup. Styles: styles/fpp.css.
 */

const fpp = (name: string) => `/images/fpp/${name}`;

function Phone({ src, alt }: { src: string; alt: string }) {
  return <Image className="fpp-phone" src={fpp(src)} alt={alt} width={640} height={1340} sizes="(max-width: 809px) 70vw, 320px" />;
}

const needs = [
  { title: "Business at a glance", text: "Quickly review performance and understand what needs attention." },
  { title: "Client context", text: "Find client information and understand portfolios across products." },
  { title: "Timely follow-ups", text: "Stay aware of incomplete onboarding and upcoming renewals." },
  { title: "Clear earnings", text: "Track commissions and understand product-specific payout schedules." },
  { title: "Product depth", text: "Move from a consolidated portfolio to the detail behind it." },
  { title: "Everyday support", text: "Access learning resources, marketing materials and sales support." },
];

const solutions = [
  {
    mark: "A", tone: "grey", phone: "phone-dashboard.png", alt: "Your workspace dashboard screen", caption: "OVERVIEW → ATTENTION → FOLLOW-UP",
    title: "An action-oriented dashboard",
    text: "Business metrics sit alongside document follow-ups and relationship reminders. Search by name, PAN or phone number keeps client lookup close at hand.",
    intent: "Connect business overview with practical next steps.",
  },
  {
    mark: "B", tone: "blue", phone: "phone-opportunity.png", alt: "Opportunities screen", caption: "NEW BUSINESS ≠ RETENTION",
    title: "A structured opportunity view",
    text: "Potential business is grouped by product category. Insurance dues, SIP expiries and pending onboarding are separated into focused follow-up areas.",
    intent: "Distinguish acquisition from retention and prioritize follow-ups.",
  },
];

const depth = [
  { label: "C / CONSOLIDATED CLIENT OVERVIEW", phone: "phone-client.png", alt: "Client overview screen", title: "Context before conversation", text: "Profile, contact actions, net worth, product relationships and performance share one overview. Overview, Details and Reports keep the context close." },
  { label: "D / PRODUCT-SPECIFIC DEPTH", phone: "phone-mutual-funds.png", alt: "Mutual funds detail screen", title: "Detail without losing the client", text: "Mutual-fund holdings lead to active SIPs, transactions, mandates and investment-entry screens. Dedicated equity, insurance and loan views extend the same structure." },
  { label: "D / PORTFOLIO ANALYSIS", phone: "phone-analysis.png", alt: "Portfolio analysis screen", title: "Understand what sits underneath", text: "Asset allocation, sector distribution and market-cap analysis add a deeper perspective alongside portfolio performance." },
];

const palette = [
  { name: "Action blue", hex: "#265BFF" },
  { name: "Light surface", hex: "#FFFFFF", border: true },
  { name: "Navigation ink", hex: "#101438" },
  { name: "Equity", hex: "#BCEEF8" },
  { name: "Mutual funds", hex: "#FFE8AA" },
  { name: "Insurance", hex: "#C6EED6" },
  { name: "Loans", hex: "#F9D5D4" },
];

const tradeoffs = [
  { tension: "Breadth versus simplicity", choice: "A shared overview, dedicated detail", why: "A broad product set needs a common starting point. Dedicated product views hold the depth without putting every detail on the dashboard." },
  { tension: "Information versus action", choice: "Follow-ups connect data to work", why: "Metrics provide context; document tasks, renewals and reminders turn that context into a possible next action." },
  { tension: "Density versus readability", choice: "Long screens remain an open question", why: "Vertical grouping supports a wide scope, but scanning, navigation and cognitive load still need usability assessment." },
];

const tasks = [
  { task: "Find a client and review their portfolio", question: "Can partners locate the right person and explain the consolidated portfolio?" },
  { task: "Identify onboarding requirements", question: "Are missing documents and the next follow-up clear?" },
  { task: "Locate retention opportunities", question: "Can partners distinguish insurance dues and SIP expiries from new business?" },
  { task: "Interpret metrics and charts", question: "Are values, categories and portfolio visualizations understood as intended?" },
  { task: "Understand payouts", question: "Can partners separate credited earnings, amounts due and payout schedules?" },
];

function TileIcon({ kind }: { kind: "equity" | "mf" | "loans" }) {
  return (
    <svg className="fpp-tile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      {kind === "equity" && <path d="M8 16v-4M12 16V8M16 16v-6" />}
      {kind === "mf" && <path d="M7 16l4-4 3 3 4-6" />}
      {kind === "loans" && <path d="M7 10h10M7 14h6" />}
    </svg>
  );
}

export default function FppCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="fpp-scope">
        {/* ---------- introduction ---------- */}
        <section className="fpp-panel fpp-dark fpp-intro">
          <hr className="fpp-rule" />
          <Reveal>
            <h1 className="fpp-h1">Financial Partner Platform</h1>
            <div className="fpp-intro-row">
              <p className="fpp-subtitle">A mobile app for managing clients, portfolios, and business growth</p>
              <span className="fpp-scroll" aria-hidden>↓</span>
            </div>
            <dl className="fpp-meta">
              <div><dt>PLATFORM</dt><dd>Mobile application</dd></div>
              <div><dt>FOCUS</dt><dd>UX/UI design · Financial services · Client relationship management</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={0.15} className="fpp-hero-visual">
            <Image src={fpp("hero-phones.png")} alt="Workspace, client overview and opportunities screens" width={2528} height={1492} priority sizes="(max-width: 1440px) 100vw, 1264px" />
          </Reveal>
          <div className="fpp-footline">
            <span>Anonymized, editable interface excerpts · All identities and financial values are illustrative</span>
            <span className="fpp-footline-cue">THE PRODUCT / 01</span>
          </div>
        </section>

        {/* ---------- overview, challenge, audience ---------- */}
        <section className="fpp-panel fpp-light">
          <div className="fpp-split">
            <Reveal>
              <p className="fpp-label">01 / OVERVIEW</p>
              <h2 className="fpp-h2">Many responsibilities. One daily workspace.</h2>
            </Reveal>
            <Reveal delay={0.1} className="fpp-copy">
              <p>Financial Partner Platform helps financial advisors and distribution partners manage their daily work through a unified mobile experience.</p>
              <p>Client portfolios, business performance, sales opportunities, onboarding tasks and payouts sit together across equity, mutual funds, insurance and loans.</p>
              <p className="fpp-strong">The goal: make complex financial information easier to navigate, while keeping everyday actions accessible.</p>
            </Reveal>
          </div>

          <Reveal className="fpp-challenge">
            <div className="fpp-challenge-top">
              <p className="fpp-label fpp-label--muted">02 / THE CHALLENGE</p>
              <p>Advisory work spans relationships, incomplete applications, investments, renewals and earnings. Fragmented tools can make it difficult to see what needs attention.</p>
            </div>
            <p className="fpp-question">How might a mobile application help financial partners understand their business, review client needs, and prioritize their next action?</p>
            <p className="fpp-label">THE GUIDING DESIGN QUESTION <ArrowUpRight /></p>
          </Reveal>

          <div className="fpp-split">
            <Reveal>
              <p className="fpp-label">03 / INTENDED AUDIENCE</p>
              <h2 className="fpp-h2 fpp-h2--sm">For partners managing multiple clients and products.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-label">KEY NEEDS</p>
              <p className="fpp-note">These needs shaped the design, focusing on what advisors and distribution partners rely on every day.</p>
            </Reveal>
          </div>
          <Stagger className="fpp-needs">
            {needs.map((n) => (
              <StaggerItem key={n.title} className="fpp-need">
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- solution A / B ---------- */}
        <section className="fpp-panel fpp-light">
          <div className="fpp-split fpp-split--end">
            <Reveal>
              <p className="fpp-label">04 / THE SOLUTION</p>
              <h2 className="fpp-h2">A clearer starting point. A more useful next step.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-note">The platform connects a high-level business view with the follow-ups that give those numbers meaning.</p>
            </Reveal>
          </div>
          <Stagger className="fpp-pair">
            {solutions.map((s) => (
              <StaggerItem key={s.mark}>
                <div className={`fpp-stage fpp-stage--${s.tone}`}>
                  <span className="fpp-stage-mark" aria-hidden>{s.mark}</span>
                  <Phone src={s.phone} alt={s.alt} />
                  <span className="fpp-stage-caption">{s.caption}</span>
                </div>
                <h3 className="fpp-h3">{s.title}</h3>
                <p className="fpp-body">{s.text}</p>
                <p className="fpp-intent">Intent / {s.intent}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="fpp-fine">All people and financial data shown are illustrative.</p>
        </section>

        {/* ---------- client depth ---------- */}
        <section className="fpp-panel fpp-dark">
          <div className="fpp-split fpp-split--end">
            <Reveal>
              <p className="fpp-label fpp-label--muted">04 / THE SOLUTION, CONTINUED</p>
              <h2 className="fpp-h2">Keep the client in view. Go deeper when needed.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-note">From a portfolio review to a client conversation, the intent is to balance an accessible overview with deeper product information.</p>
            </Reveal>
          </div>
          <Stagger className="fpp-trio">
            {depth.map((d) => (
              <StaggerItem key={d.title}>
                <p className="fpp-label fpp-label--muted">{d.label}</p>
                <div className="fpp-stage fpp-stage--dark">
                  <Phone src={d.phone} alt={d.alt} />
                </div>
                <h3 className="fpp-h3">{d.title}</h3>
                <p className="fpp-body">{d.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="fpp-principle">
            <span>A shared client context. Different levels of detail.</span>
            <span className="fpp-label fpp-label--muted">OVERVIEW → PRODUCT → ANALYSIS</span>
          </div>
        </section>

        {/* ---------- operations ---------- */}
        <section className="fpp-panel fpp-light">
          <div className="fpp-ops">
            <Reveal className="fpp-ops-copy">
              <p className="fpp-label">04 / E — BUSINESS OPERATIONS &amp; ENABLEMENT</p>
              <h2 className="fpp-h2">Beyond the portfolio.</h2>
              <p className="fpp-body fpp-body--lg">The advisor’s daily workspace extends beyond investments. Earnings, learning and sales support belong in the same experience.</p>
              <hr className="fpp-rule fpp-rule--light" />
              <h3 className="fpp-h3">Make earnings understandable</h3>
              <p className="fpp-body">Payout summaries and ledgers sit alongside product-specific schedules, so partners can distinguish what has been paid from what is due.</p>
              <h3 className="fpp-h3">Keep support within reach</h3>
              <p className="fpp-body">Learning, certifications, marketing materials, referrals and support address the broader responsibilities of financial partners.</p>
              <p className="fpp-intent">Intent / Support the work around the client relationship, not just the portfolio itself.</p>
            </Reveal>
            <Reveal delay={0.1} className="fpp-ops-stage">
              <figure>
                <Phone src="phone-payout.png" alt="Payout and invoicing screen" />
                <figcaption>EARNINGS &amp; SCHEDULES</figcaption>
              </figure>
              <figure className="fpp-ops-offset">
                <Phone src="phone-resources.png" alt="Resources screen" />
                <figcaption>LEARNING &amp; SALES SUPPORT</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ---------- visual direction ---------- */}
        <section className="fpp-panel fpp-light fpp-divided">
          <div className="fpp-split">
            <Reveal>
              <p className="fpp-label">05 / VISUAL DIRECTION</p>
              <h2 className="fpp-h2 fpp-h2--sm">Light, compact and clearly grouped.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-note">The application’s direction uses light surfaces, compact cards, blue accents, contrasting bottom navigation, pastel product tiles and charts. Vertically grouped information supports a mobile reading rhythm—distinct from this case study’s oversized editorial styling.</p>
            </Reveal>
          </div>
          <Stagger className="fpp-palette">
            {palette.map((c) => (
              <StaggerItem key={c.name}>
                <span className={`fpp-swatch${c.border ? " fpp-swatch--border" : ""}`} style={{ background: c.hex }} />
                <span className="fpp-swatch-name">{c.name}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="fpp-specimens">
            <Reveal>
              <p className="fpp-label fpp-label--ink">APPLICATION TYPOGRAPHY / OUTFIT</p>
              <p className="fpp-specimen" aria-hidden>Aa 123</p>
              <p className="fpp-note">A friendly geometric voice for compact financial information.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-label fpp-label--ink">APPLICATION LANGUAGE / PRODUCT TILES &amp; HIERARCHY</p>
              <div className="fpp-tiles">
                <div className="fpp-tile" style={{ background: "#BCEEF8" }}><TileIcon kind="equity" /><strong>Equity</strong><span>View details →</span></div>
                <div className="fpp-tile" style={{ background: "#FFE8AA" }}><TileIcon kind="mf" /><strong>Mutual funds</strong><span>View details →</span></div>
                <div className="fpp-tile" style={{ background: "#F9D5D4" }}><TileIcon kind="loans" /><strong>Loans</strong><span>View details →</span></div>
              </div>
              <p className="fpp-note">Pastel categories differentiate products; blue consistently marks actions and selection.</p>
            </Reveal>
          </div>
        </section>

        {/* ---------- tradeoffs + validation ---------- */}
        <section className="fpp-panel fpp-light">
          <div className="fpp-split fpp-split--end">
            <Reveal>
              <p className="fpp-label">06 / KEY DESIGN TRADEOFFS</p>
              <h2 className="fpp-h2">Breadth needs structure.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="fpp-note">Fitting many responsibilities onto a mobile screen meant making deliberate choices about what comes first.</p>
            </Reveal>
          </div>
          <Reveal className="fpp-tradeoffs">
            {tradeoffs.map((t) => (
              <div key={t.tension} className="fpp-tradeoff">
                <span className="fpp-tradeoff-tension">{t.tension}</span>
                <span className="fpp-tradeoff-choice">{t.choice}</span>
                <span className="fpp-tradeoff-why">{t.why}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="fpp-validation">
            <div className="fpp-split">
              <div>
                <p className="fpp-label">07 / USABILITY TESTING</p>
                <h2 className="fpp-h2 fpp-h2--sm">What we test with partners.</h2>
              </div>
              <div>
                <p className="fpp-label">APPROACH</p>
                <p className="fpp-note">Task-based usability sessions with financial partners, focusing on comprehension, findability and prioritization.</p>
              </div>
            </div>
            <div className="fpp-tasks" role="table">
              <div className="fpp-task fpp-task--head" role="row">
                <span role="columnheader">TASK TO ASSESS</span>
                <span role="columnheader">QUESTION TO INVESTIGATE</span>
              </div>
              {tasks.map((t) => (
                <div key={t.task} className="fpp-task" role="row">
                  <span role="cell">{t.task}</span>
                  <span role="cell">{t.question}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- reflection ---------- */}
        <section className="fpp-panel fpp-dark">
          <Reveal>
            <p className="fpp-label fpp-label--muted">08 / REFLECTION</p>
            <p className="fpp-closing">
              Connect the business.
              <br />
              Keep the client close.
              <br />
              Make the next step clear.
            </p>
          </Reveal>
          <Reveal className="fpp-reflection">
            <p>The platform brings business performance, client context and actionable follow-ups into a coherent daily workspace. Its value lies in the connections between those layers—not simply in the number of features on a screen.</p>
            <p>The next challenge is keeping that breadth clear and easy to navigate as advisory work grows.</p>
          </Reveal>
          <div className="fpp-footline">
            <span className="fpp-footline-name">Financial Partner Platform</span>
          </div>
        </section>
      </div>
    </MotionProvider>
  );
}
