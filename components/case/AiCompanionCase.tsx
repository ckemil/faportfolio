import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";
import { stack } from "@/lib/data";

/**
 * AI Companion case study, built from the Figma "Case study" frame (AI-Companion file, node 217:749).
 * Styles are scoped to `.aic-scope` in styles/aicompanion.css.
 */

const aic = (name: string) => `/images/aicompanion/${name}`;

/** heroicons sparkles-solid — the AI Companion mark. */
function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
      />
    </svg>
  );
}

function FigmaLogo() {
  return (
    <svg viewBox="0 0 38 57" width="22" height="33" aria-hidden>
      <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`aic-logo ${className}`}>
      <Sparkles className="aic-logo-mark" />
      AI Companion
    </span>
  );
}

/** Gradient orb used above section titles: a waveform or the sparkle mark. */
function Orb({ kind }: { kind: "wave" | "sparkle" }) {
  return (
    <span className="aic-orb" aria-hidden>
      {kind === "sparkle" ? (
        <Sparkles className="aic-orb-icon" />
      ) : (
        <span className="aic-orb-wave">
          {[10, 18, 26, 18, 10].map((h, i) => (
            <span key={i} style={{ height: h }} />
          ))}
        </span>
      )}
    </span>
  );
}

function CenterHeader({ orb, title, lead }: { orb?: "wave" | "sparkle"; title: string; lead?: string }) {
  return (
    <Reveal className="aic-center-head">
      {orb && <Orb kind={orb} />}
      <h2 className="aic-h2">{title}</h2>
      {lead && <p className="aic-lead">{lead}</p>}
    </Reveal>
  );
}

function Panel({ icon, title, children, className = "" }: { icon: string; title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`aic-panel ${className}`}>
      <div className="aic-panel-head">
        <span className="aic-panel-icon" aria-hidden>{icon}</span>
        {title}
      </div>
      <div className="aic-panel-body">{children}</div>
    </div>
  );
}

/** Full-bleed image cropped to the 1480px Figma frame (several source layers overflow it). */
function Crop({ src, alt, ratio, position = "50% 50%" }: { src: string; alt: string; ratio: string; position?: string }) {
  return (
    <div className="aic-crop" style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />
    </div>
  );
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="aic-checks">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

const process = [
  { label: "Research", icon: "⌕" },
  { label: "Structure", icon: "◎", active: true },
  { label: "Wireframe", icon: "◌" },
  { label: "UI Design", icon: "◎", active: true },
  { label: "Prototyping", icon: "◌" },
];

const problemSolution = [
  { kind: "solution", text: "An AI-powered assistant that captures conversations for them, organizes information, and highlights what matters most." },
  { kind: "problem", text: "People want to stay present in conversations but can’t keep track of everything discussed." },
  { kind: "solution", text: "An intuitive AI Companion App that lets users browse or create custom AI assistants, assign them to conversations, and instantly receive structured insights, summaries, and follow-ups." },
  { kind: "problem", text: "Users juggle multiple meetings, calls, and discussions but lack an easy way to capture and understand everything that was said. Important information gets lost, and manual note-taking becomes overwhelming." },
] as const;

const traits = [
  { label: "Detail-Oriented", value: 75, tone: "warm" },
  { label: "Tech-Savvy", value: 80, tone: "green" },
  { label: "Collaborative", value: 65, tone: "blue" },
];

/** Logos come from the home page's stack list; tools without one get a monogram. */
const logo = (name: string) => stack.find((t) => t.name === name)?.icon;

const toolGroups = [
  {
    tag: "Design",
    tone: "design",
    title: "Design & Prototyping",
    tools: [
      { name: "Figma", icon: "figma", desc: "High-fidelity UI design, component systems, and clickable prototype" },
      { name: "FigJam", icon: logo("FigJam"), desc: "Brainstorming, user flows, journey mapping, and affinity clustering" },
    ],
  },
  {
    tag: "AI",
    tone: "ai",
    title: "AI-Assisted Creation",
    tools: [
      { name: "ChatGPT / Claude", icon: logo("Claude AI"), desc: "Ideation, UX writing, summarizing research, generating insight categories" },
      { name: "Uizard", icon: undefined, desc: "Exploring alternative layouts using AI prompts" },
      { name: "Visily", icon: logo("Visily AI"), desc: "Quick UI variations and alternative screen layouts" },
      { name: "Figma Make", icon: "figma", desc: "Refining UI flows with precision" },
    ],
  },
];

const glassTones = [
  { name: "100", hex: "#ffffff", alpha: 1 },
  { name: "60%", hex: "#ffffff", alpha: 0.6 },
  { name: "40%", hex: "#ffffff", alpha: 0.4 },
  { name: "20%", hex: "#ffffff", alpha: 0.2 },
  { name: "Background", hex: "E1E1E1", bg: "#e1e1e1" },
];

export default function AiCompanionCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="aic-scope">
        {/* ---------- hero ---------- */}
        <section className="aic-hero">
          <h1 className="sr-only">AI Companion — UI/UX case study</h1>
          <Image src={aic("hero.png")} alt="AI Companion home screen on an iPhone" fill priority sizes="100vw" className="aic-hero-img" style={{ objectPosition: "50% 100%" }} />
          <Logo className="aic-hero-logo" />
          <span className="aic-mono aic-hero-tag aic-hero-tag--top">Case Study</span>
          <span className="aic-mono aic-hero-tag aic-hero-tag--bottom">AI Companion App</span>
        </section>

        {/* ---------- intro ---------- */}
        <section className="aic-section aic-intro">
          <div className="aic-inner">
            <div className="aic-intro-top">
              <Reveal className="aic-intro-robot">
                <Image src={aic("intro-robot.png")} alt="White humanoid robot" width={370} height={365} sizes="(max-width: 809px) 80vw, 580px" />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="aic-body">
                  A mobile app that turns everyday conversations into clear, actionable insights using personalized AI companions.
                </p>
              </Reveal>
            </div>

            <Reveal className="aic-statement">
              <p>
                An <strong>AI-powered mobile app</strong> that helps users capture conversations and generate personalized insights
                through <strong>customizable AI companions</strong>.
              </p>
              <Image src={aic("idea.png")} alt="" width={58} height={60} className="aic-statement-icon" />
            </Reveal>

            <Reveal className="aic-facts">
              <div>
                <span>Project Name</span>
                <strong>AI Companion App</strong>
              </div>
              <div>
                <span>Industry</span>
                <strong>Personal Productivity &amp; AI Assistants</strong>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- phone + watch ---------- */}
        <section className="aic-devices">
          <Crop src={aic("devices-hd.png")} alt="Recordings screen on iPhone beside a recording in progress on Apple Watch" ratio="1480 / 1065" position="89% 0" />
          <Reveal className="aic-devices-copy">
            <p className="aic-body">Capture conversations from your phone or watch and get instant, personalized summaries.</p>
          </Reveal>
        </section>

        {/* ---------- process ---------- */}
        <section className="aic-section aic-section--tight">
          <div className="aic-inner">
            <Stagger className="aic-process">
              {process.map((s) => (
                <StaggerItem key={s.label} className={`aic-step${s.active ? " is-active" : ""}`}>
                  <span className="aic-step-icon" aria-hidden>{s.icon}</span>
                  {s.label}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- problem & solution ---------- */}
        <section className="aic-section">
          <div className="aic-inner">
            <Reveal>
              <span className="aic-eyebrow">Problem &amp; Solution</span>
              <h2 className="aic-h2 aic-h2--split">
                <span>Identifying the Problem</span>
                Designing the Fix
              </h2>
            </Reveal>

            <div className="aic-ps">
              <div className="aic-ps-ring" aria-hidden />
              <Logo className="aic-ps-logo" />
              <Stagger className="aic-ps-grid">
                {problemSolution.map((c, i) => (
                  <StaggerItem key={i} className={`aic-ps-card aic-ps-card--${c.kind}`}>
                    <span className="aic-ps-label">
                      {c.kind === "solution" && <Sparkles className="aic-ps-label-icon" />}
                      {c.kind === "solution" ? "Solution" : "Problem"}
                    </span>
                    <p>{c.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* ---------- quote band ---------- */}
        <section className="aic-band">
          <Reveal>
            <p>Transform everyday conversations into meaningful knowledge — supported by AI that feels human, helpful, and in your control.</p>
          </Reveal>
        </section>

        {/* ---------- personas ---------- */}
        <section className="aic-section aic-personas">
          <div className="aic-inner">
            <Reveal>
              <h2 className="aic-h2">User Personas</h2>
            </Reveal>

            <Reveal className="aic-persona">
              <div className="aic-persona-photo">
                <Image src={aic("persona-alex.png")} alt="Alex, the persona" width={956} height={897} sizes="290px" />
              </div>
              <p>
                Alex is a busy professional who wants an easy way to capture important details from daily conversations and get clear,
                helpful insights without doing extra work.
              </p>
            </Reveal>

            <Stagger className="aic-persona-grid">
              <StaggerItem>
                <Panel icon="◉" title="Personality">
                  <ul className="aic-traits">
                    {traits.map((t) => (
                      <li key={t.label}>
                        <span className={`aic-trait aic-trait--${t.tone}`} style={{ ["--w" as string]: `${t.value}%` }}>
                          {t.label}
                        </span>
                        <span className="aic-trait-value">{t.value}%</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </StaggerItem>
              <StaggerItem>
                <Panel icon="●" title="Bio Data">
                  <dl className="aic-bio">
                    <div><dt>Age</dt><dd>36 Years</dd></div>
                    <div><dt>Location</dt><dd>San Francisco</dd></div>
                    <div><dt>Occupation</dt><dd>Product Manager</dd></div>
                  </dl>
                </Panel>
              </StaggerItem>
              <StaggerItem>
                <Panel icon="◉" title="Pain Points">
                  <ul className="aic-dots">
                    <li>Action items get lost or forgotten after calls</li>
                    <li>Too many conversations happening daily to track manually</li>
                  </ul>
                </Panel>
              </StaggerItem>
              <StaggerItem>
                <Panel icon="◎" title="Goal">
                  <ul className="aic-dots">
                    <li>Gain quick, reliable summaries from meetings and calls</li>
                    <li>Automate follow-ups and action items</li>
                    <li>Improve decision-making with clear, multi-perspective insights</li>
                  </ul>
                </Panel>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ---------- competitive analysis ---------- */}
        <section className="aic-section">
          <div className="aic-inner aic-split">
            <Reveal>
              <h2 className="aic-h3">Competitive Analysis:</h2>
              <p className="aic-body">
                The landscape of conversational AI and productivity tools is rapidly evolving. While several platforms touch aspects of AI
                assistance, none seamlessly combine custom AI personalities plus conversation capture, analysis, and multi-perspective
                insights in one mobile experience.
              </p>
              <p className="aic-body">Similar Products: Otter AI, Replika, Fireflies AI.</p>
            </Reveal>
            <Reveal delay={0.1} className="aic-media">
              <Image src={aic("competitive-hd.png")} alt="Companion Library screen" width={1192} height={1147} sizes="(max-width: 809px) 100vw, 600px" />
            </Reveal>
          </div>
        </section>

        {/* ---------- brainstorming ---------- */}
        <section className="aic-section aic-section--blue">
          <div className="aic-inner">
            <Reveal>
              <h2 className="aic-h3">Brainstorming &amp; Ideation</h2>
            </Reveal>
            <Stagger className="aic-grid-2">
              <StaggerItem>
                <Panel icon="◎" title="My Approach" className="aic-fill">
                  <p>
                    I approached the challenge with an end-to-end, human-centered design process focused on simplifying a complex AI
                    ecosystem into a trustworthy and delightful mobile experience. The strategy was built around four pillars
                  </p>
                  <Checks
                    items={[
                      "Understand the Problem Deeply",
                      "Prioritize Trust & Control in AI",
                      "Conceptualize a Scalable System",
                      "Design for Natural Behavior Integration",
                    ]}
                  />
                </Panel>
              </StaggerItem>
              <StaggerItem>
                <Panel icon="◎" title="Possible Solutions" className="aic-fill">
                  <p>
                    A personal AI companion ecosystem that helps users capture, understand, and take action based on their real-world
                    conversations
                  </p>
                  <strong className="aic-panel-sub">Core Experience</strong>
                  <Checks
                    items={[
                      "Companion Library",
                      "Create Your Own Companion",
                      "Assign Companions to Conversations",
                      "Actionable Insights & Summaries",
                    ]}
                  />
                </Panel>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ---------- tools ---------- */}
        <section className="aic-section aic-section--lavender">
          <div className="aic-inner">
            <CenterHeader
              title="Tools Used"
              lead="To deliver this project within a 5-day sprint, I used a combination of industry-standard design tools and AI-powered accelerators that helped speed up ideation, visualization, and documentation."
            />
            {toolGroups.map((g) => (
              <div key={g.title} className="aic-toolgroup">
                <div className="aic-toolgroup-head">
                  <span className={`aic-toolgroup-tag aic-toolgroup-tag--${g.tone}`}>{g.tag}</span>
                  <h3>{g.title}</h3>
                </div>
                <Stagger className={`aic-tools aic-tools--${g.tools.length}`}>
                  {g.tools.map((t) => (
                    <StaggerItem key={t.name} className="aic-tool">
                      <span className="aic-tool-logo">
                        {t.icon === "figma" ? <FigmaLogo /> : t.icon ? <Image src={t.icon} alt="" width={40} height={40} /> : t.name[0]}
                      </span>
                      <strong>{t.name}</strong>
                      <p>{t.desc}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- wireframes ---------- */}
        <section className="aic-section aic-section--grey aic-section--bleed">
          <div className="aic-inner">
            <CenterHeader
              orb="wave"
              title="Lo-Fi Wireframes"
              lead="A low-fidelity look at how users move through the app, capturing the core interactions that shape the AI companion experience."
            />
          </div>
          <Reveal className="aic-wide">
            <Image src={aic("wireframes-hd.png")} alt="Low-fidelity wireframes of five app screens" width={2960} height={1704} sizes="(max-width: 1440px) 100vw, 1392px" />
          </Reveal>
        </section>

        {/* ---------- style guide ---------- */}
        <section className="aic-section">
          <div className="aic-inner">
            <CenterHeader orb="sparkle" title="Style Guide" />
            <div className="aic-style">
              <Reveal>
                <h3 className="aic-style-label">Typography</h3>
                <div className="aic-type">
                  <span className="aic-type-tile">Ag</span>
                  <div>
                    <strong>Inter</strong>
                    <span className="aic-type-weights">
                      <span style={{ fontWeight: 400 }}>Regular</span>
                      <span style={{ fontWeight: 500 }}>Medium</span>
                      <span style={{ fontWeight: 600 }}>Semi Bold</span>
                      <span style={{ fontWeight: 700 }}>Bold</span>
                    </span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="aic-style-label">Color palette</h3>
                <div className="aic-swatch-card">
                  <span className="aic-swatch-title">Glass Tones</span>
                  <div className="aic-glass">
                    {glassTones.map((g) => (
                      <div key={g.name} className="aic-glass-cell">
                        <span className="aic-glass-chip" style={{ background: g.bg ?? `rgba(255,255,255,${g.alpha})` }} />
                        <strong>{g.name}</strong>
                        <span>{g.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aic-swatch-row">
                  <div className="aic-swatch-card">
                    <span className="aic-swatch-title">Gradients</span>
                    <div className="aic-grads">
                      <span className="aic-grad aic-grad--a" />
                      <span className="aic-grad aic-grad--b" />
                    </div>
                  </div>
                  <div className="aic-swatch-card">
                    <span className="aic-swatch-title">AI Custom Grad</span>
                    <div className="aic-grads">
                      <span className="aic-grad aic-grad--ai" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- high-fidelity UI ---------- */}
        <section className="aic-section aic-section--lavender aic-section--bleed aic-hifi">
          <div className="aic-inner">
            <CenterHeader orb="wave" title="High-Fidelity UI" lead="The completed interface reflecting final layout, branding, and interactions." />
          </div>
          <Reveal className="aic-wide">
            <Crop src={aic("hifi-home.png")} alt="Home screen in Arabic and English" ratio="2960 / 2091" />
          </Reveal>
          <Reveal className="aic-wide">
            <Crop src={aic("hifi-flows.png")} alt="Recording, recordings list and recording detail screens" ratio="2960 / 2388" />
          </Reveal>
        </section>
      </div>
    </MotionProvider>
  );
}
