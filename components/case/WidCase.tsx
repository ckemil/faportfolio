import Image from "next/image";
import { MotionProvider, Reveal, Stagger, StaggerItem } from "@/components/motion";
import ScrollProgress from "@/components/ScrollProgress";

/**
 * WID — luxury floral gifting (Doha) case study, built from the Figma "WID — Case Study" frame
 * (file Mv934ZWVEsrFEy8UdMQPi9, node 9:12676). Styles are scoped to `.wid-scope` in styles/wid.css.
 * Device mockups are 2x exports of that frame; all copy, cards, tables and swatches are live markup.
 */

const wid = (name: string) => `/images/wid/${name}`;

type Tone = "light" | "dark";

function Head({ num, label, title, lead, tone = "light" }: { num: string; label: string; title: [string, string]; lead: string; tone?: Tone }) {
  return (
    <Reveal className={`wid-head wid-head--${tone}`}>
      <div>
        <p className="wid-eyebrow">
          <span className="wid-eyebrow-num">{num}</span>
          <span className="wid-eyebrow-rule" aria-hidden />
          {label}
        </p>
        <h2 className="wid-h2">
          {title[0]}
          <br />
          {title[1]}
        </h2>
      </div>
      <p className="wid-lead">{lead}</p>
    </Reveal>
  );
}

function Insights({ items, tone = "light", cols = 3 }: { items: { title: string; text: string }[]; tone?: Tone; cols?: 2 | 3 }) {
  return (
    <Stagger className={`wid-insights wid-insights--${cols}`}>
      {items.map((it, i) => (
        <StaggerItem key={it.title} className={`wid-insight wid-insight--${tone}`}>
          <span className="wid-insight-num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

const platforms = [
  { pill: "SEND", title: "Customer App", tone: "wine", text: "Discover by occasion, personalise with a message or video, pick a delivery slot, pay with wallet, points or cashback — then track and rate.", flow: "Moment → Product → Message → Slot → Pay" },
  { pill: "DELIVER", title: "Driver App", tone: "sand", text: "Go online, work pending and ongoing orders, follow a delivery countdown, get directions and collect cash on delivery.", flow: "Online → Pending → Out for delivery → Done" },
  { pill: "RUN", title: "Super Admin", tone: "white", text: "Dashboard, orders, products, collections, moments, care instructions, inventory & purchasing, customers, roles, ads and home-page content.", flow: "Catalogue → Orders → Dispatch → Insights" },
];

const questions = [
  { role: "Customer", title: "Personal, not transactional", text: "How might senders add meaning — a note, a video, a secret identity — without slowing checkout down?" },
  { role: "Driver", title: "On time, every time", text: "How might drivers see what’s due, where it goes and what to collect, at a glance and one-handed?" },
  { role: "Admin", title: "One source of truth", text: "How might a small team run catalogue, moments, stock and orders without spreadsheets and guesswork?" },
];

const journey = [
  { role: "Customer", title: "Choose the moment", text: "Browse by Birthday, Anniversary, Get Well Soon or Congratulations." },
  { role: "Customer", title: "Make it personal", text: "Add a message, template, video or audio — and choose to stay anonymous." },
  { role: "Admin", title: "Prepare & dispatch", text: "Confirm the order, check stock and assign it to a driver." },
  { role: "Driver", title: "Deliver & collect", text: "Follow the countdown and directions, collect COD and confirm the drop-off." },
  { role: "Customer", title: "Rate & remember", text: "Track progress, get notified and rate the order and the driver." },
];

const personalise = [
  { icon: "icon-templates.png", title: "Occasion templates, To & From", text: "Pick the occasion, address the card and start from a template instead of a blank page." },
  { icon: "icon-video.png", title: "Video & voice, not just text", text: "Paste a media link or upload audio and video so the gift carries a real voice." },
  { icon: "icon-secret.png", title: "Keep my identity secret", text: "Hide the sender on the card — or the whole order — for surprises and secret admirers." },
  { icon: "icon-address.png", title: "Ask the recipient for the address", text: "Don’t know where they live? WID contacts the recipient, without spoiling the surprise." },
  { icon: "icon-slot.png", title: "Pick the exact delivery slot", text: "Date and time windows plus standard or express delivery, set before payment." },
];

const modules = [
  "Dashboard", "Orders", "Products", "Categories", "Collections", "Moments", "Care instructions", "Baskets", "Inventory", "Purchases", "Suppliers", "Transactions",
  "Customers", "Role management", "Home page CMS", "Ads", "Notifications", "Log activity", "Chat", "Driver cards", "Settings",
];

const swatches = [
  { name: "Rose", hex: "#B99EA0", fg: "#fff" },
  { name: "Sand", hex: "#E1D9CD", fg: "#3a0607" },
  { name: "Mist", hex: "#DADADA", fg: "#3a0607" },
  { name: "Navy", hex: "#021433", fg: "#fff" },
  { name: "Signal", hex: "#FF9500", fg: "#3a0607" },
];

const validation = [
  { role: "Customer", scenario: "Send an anniversary gift with a video message, anonymously.", signal: "Completion rate; time to checkout; message add-rate.", method: "Moderated prototype test." },
  { role: "Customer", scenario: "Redeem points and wallet balance at checkout.", signal: "Redemption rate; payment errors; total comprehension.", method: "Task test + analytics." },
  { role: "Driver", scenario: "Take an order from pending to delivered with COD.", signal: "On-time rate; COD mismatches; taps per delivery.", method: "Field pilot with drivers." },
  { role: "Admin", scenario: "Publish a new moment collection to the home page.", signal: "Time to publish; errors; content changes without dev.", method: "Ops walkthrough." },
];

export default function WidCase() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <div className="wid-scope">
        {/* ---------- hero ---------- */}
        <section className="wid-panel wid-dark wid-hero">
          <span className="wid-glow wid-glow--hero-a" aria-hidden />
          <span className="wid-glow wid-glow--hero-b" aria-hidden />
          <nav className="wid-hero-nav">
            <Image src={wid("wid-logo.svg")} alt="WID" width={121} height={44} priority />
            <ul aria-label="Products in this case study">
              <li>Customer App</li>
              <li>Driver App</li>
              <li>Super Admin</li>
            </ul>
          </nav>
          <Reveal className="wid-hero-copy">
            <p className="wid-badge">✿ LUXURY FLORAL GIFTING · DOHA, QATAR</p>
            <h1 className="wid-h1">
              Where every petal
              <br />
              <span>tells a story.</span>
            </h1>
            <div className="wid-hero-row">
              <p className="wid-hero-lead">
                A customer app, a driver app and a super admin panel for a premium flower and gift brand — designed so every order arrives
                feeling as personal as the moment it was sent for.
              </p>
              <dl className="wid-stats">
                <div><dt>Platforms</dt><dd>3 apps · 3 roles</dd></div>
                <div><dt>Screens</dt><dd>170+ designed</dd></div>
                <div><dt>Scope</dt><dd>End-to-end UX &amp; UI</dd></div>
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="wid-hero-visual">
            <Image src={wid("hero-visual.png")} alt="WID customer app, admin dashboard and driver app" width={2766} height={1352} priority sizes="(max-width: 1440px) 100vw, 1300px" />
          </Reveal>
        </section>

        {/* ---------- 01 overview ---------- */}
        <section className="wid-panel wid-cream">
          <Head num="01" label="OVERVIEW" title={["Three apps.", "One moment that matters."]} lead="WID sells flowers, gift baskets, cakes, perfumes and chocolates for life’s occasions. The product spans the person who sends, the driver who delivers and the team that runs the shop." />
          <Stagger className="wid-bento">
            {platforms.map((p) => (
              <StaggerItem key={p.title} className={`wid-platform wid-platform--${p.tone}`}>
                <div>
                  <span className="wid-pill">{p.pill}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
                <span className="wid-flow">{p.flow}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- 02 challenge ---------- */}
        <section className="wid-panel wid-dark">
          <span className="wid-glow wid-glow--top-right" aria-hidden />
          <Head tone="dark" num="02" label="THE CHALLENGE" title={["Gifting is emotional.", "Logistics isn’t."]} lead="A floral order carries a feeling and a deadline. Sending has to feel effortless and personal, while drivers and operators get the precision a perishable, time-boxed delivery demands." />
          <Stagger className="wid-insights wid-insights--3">
            {questions.map((q, i) => (
              <StaggerItem key={q.title} className="wid-question">
                <div className="wid-question-top">
                  <span className="wid-insight-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wid-tag">{q.role}</span>
                </div>
                <h3>{q.title}</h3>
                <p>{q.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="wid-footnote">DESIGN GOALS FRAMED FROM THE SCREENS · NOT RESEARCH FINDINGS</p>
        </section>

        {/* ---------- 03 journey ---------- */}
        <section className="wid-panel wid-white">
          <Head num="03" label="END-TO-END JOURNEY" title={["From a feeling", "to a front door."]} lead="One order touches all three apps. Each handoff has to carry the emotion forward — and the details that make it arrive on time." />
          <Stagger className="wid-journey">
            {journey.map((j, i) => (
              <StaggerItem key={j.title} className="wid-step">
                <span className="wid-step-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="wid-step-role">{j.role.toUpperCase()}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ---------- 04 discover ---------- */}
        <section className="wid-panel wid-cream">
          <Head num="04" label="CUSTOMER APP · DISCOVER" title={["Shop by moment,", "not by SKU."]} lead="People don’t search for “12 red roses” — they search for an anniversary. The home screen leads with occasions and editorial imagery that sells the feeling first." />
          <Reveal className="wid-stage">
            <Image src={wid("discover-screens.png")} alt="Onboarding, home, product and filter screens" width={2528} height={1360} sizes="(max-width: 1440px) 100vw, 1260px" />
          </Reveal>
          <Insights
            items={[
              { title: "Moments-first navigation", text: "Birthday, Anniversary, Get Well Soon and Congratulations sit at the top of home — the fastest route from intent to gift." },
              { title: "Editorial, not catalogue", text: "Full-bleed photography and “Where every petal tells a story” set a premium tone before a single price appears." },
              { title: "Confidence on the product page", text: "Price, category, rich description, photo reviews and related items answer “is this the right gift?” in one scroll." },
            ]}
          />
        </section>

        {/* ---------- 05 personalise ---------- */}
        <section className="wid-panel wid-wine">
          <span className="wid-glow wid-glow--top-right" aria-hidden />
          <Head tone="dark" num="05" label="CUSTOMER APP · PERSONALISE" title={["The message is", "part of the gift."]} lead="The most distinctive flow in the product: senders can wrap their words, a video or a voice note into the delivery — and decide how much of themselves to reveal." />
          <div className="wid-personalise">
            <Reveal className="wid-personalise-screens">
              <Image src={wid("personalise-screens.png")} alt="Personalised message and shopping cart screens" width={1306} height={1280} sizes="(max-width: 809px) 100vw, 660px" />
            </Reveal>
            <Stagger className="wid-features">
              {personalise.map((f) => (
                <StaggerItem key={f.title} className="wid-feature">
                  <Image src={wid(f.icon)} alt="" width={44} height={44} />
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ---------- 06 checkout ---------- */}
        <section className="wid-panel wid-white">
          <Head num="06" label="CUSTOMER APP · PAY & FOLLOW UP" title={["Rewards that feel", "like part of the ritual."]} lead="Checkout stacks every way to save — wallet, points, bank cashback, promo codes — then keeps the sender close to the order until it’s rated." />
          <Reveal className="wid-stage">
            <Image src={wid("checkout-screens.png")} alt="Delivery slot, wallet, points, tracking and rating screens" width={2528} height={1120} sizes="(max-width: 1440px) 100vw, 1260px" />
          </Reveal>
          <Insights
            cols={2}
            items={[
              { title: "Transparent totals", text: "Products, delivery fee, discount and taxes are itemised before “Proceed to Pay” — no surprises at the last step." },
              { title: "Points with a visible value", text: "Reward points convert in plain language (2953 = 29.53 QR), so redeeming is a decision, not a puzzle." },
              { title: "Wallet as a habit", text: "Top-ups and point history turn one-off gifting into a relationship with the brand." },
              { title: "After-care built in", text: "Order tracking, notifications, chat and a two-part rating (order + delivery) close the loop." },
            ]}
          />
        </section>

        {/* ---------- 07 super admin ---------- */}
        <section className="wid-panel wid-dark">
          <span className="wid-glow wid-glow--center" aria-hidden />
          <Head tone="dark" num="07" label="PLATFORM · SUPER ADMIN" title={["Run the whole", "flower shop."]} lead="One panel for the business: live KPIs, orders, a catalogue organised around moments and collections, stock and purchasing, customers, roles and the content customers see." />
          <Reveal className="wid-browser">
            <Image src={wid("admin-dashboard.png")} alt="Super admin dashboard with KPIs, revenue chart, inventory and orders" width={2520} height={1926} sizes="(max-width: 1440px) 100vw, 1260px" />
          </Reveal>
          <Insights
            tone="dark"
            items={[
              { title: "KPIs before detail", text: "Orders, customers, revenue and average delivery time — with period filters — orient the team before they open a record." },
              { title: "A catalogue shaped like the app", text: "Products, categories, collections, moments, care instructions and baskets map directly to what customers browse." },
              { title: "Control what customers see", text: "Home-page sections and ads are managed here, so merchandising can change without a release." },
            ]}
          />
          <Stagger className="wid-excerpts">
            {[
              { title: "Every order, in context.", text: "Order detail brings items, recipient, slot, payment and status together for dispatch.", img: "admin-order.png", alt: "Order detail page" },
              { title: "Stock you can trust.", text: "Inventory with stock status, suppliers and purchases keeps perishable items in check.", img: "admin-inventory.png", alt: "Inventory page" },
            ].map((e) => (
              <StaggerItem key={e.title} className="wid-excerpt">
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                <div className="wid-excerpt-img">
                  <Image src={wid(e.img)} alt={e.alt} width={1116} height={800} sizes="(max-width: 809px) 100vw, 600px" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <ul className="wid-modules">
              {modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ---------- 08 design language ---------- */}
        <section className="wid-panel wid-cream">
          <Head num="08" label="DESIGN LANGUAGE" title={["Quiet luxury,", "loud clarity."]} lead="A deep wine and warm sand palette borrowed from the bouquets themselves, an elegant display face for emotion and Raleway for everything functional." />
          <div className="wid-language">
            <Reveal className="wid-palette">
              <span className="wid-card-label">PALETTE</span>
              <div className="wid-swatch-main">
                <strong>WID Wine</strong>
                <span>#3A0607 · primary</span>
              </div>
              <div className="wid-swatches">
                {swatches.map((s) => (
                  <div key={s.name} className="wid-swatch" style={{ background: s.hex, color: s.fg }}>
                    <strong>{s.name}</strong>
                    <span>{s.hex}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="wid-type">
              <span className="wid-card-label">TYPOGRAPHY</span>
              <span className="wid-type-aa" aria-hidden>Aa</span>
              <strong>Aquavit — brand display face for emotion</strong>
              <p>Raleway — UI, labels, prices and body text. Regular, Medium, SemiBold and Bold keep hierarchy calm.</p>
            </Reveal>
          </div>
          <Insights
            items={[
              { title: "Imagery carries the emotion", text: "Large, warm product photography does the selling; UI chrome stays light and neutral around it." },
              { title: "Wine means action", text: "The primary wine colour is reserved for key actions and selected states across all three apps." },
              { title: "Status is always written", text: "Pending, On going, In stock, Out of stock — colour supports a word, never replaces it." },
            ]}
          />
        </section>

        {/* ---------- 09 validation ---------- */}
        <section className="wid-panel wid-white">
          <Head num="09" label="PROPOSED VALIDATION" title={["Measure the moments", "that matter."]} lead="No research or launch data was supplied, so these are the signals worth tracking to prove the design works — per role." />
          <Reveal>
            <div className="wid-table" role="table">
              <div className="wid-tr wid-tr--head" role="row">
                <span role="columnheader">ROLE</span>
                <span role="columnheader">SCENARIO</span>
                <span role="columnheader">SUCCESS SIGNAL</span>
                <span role="columnheader">METHOD</span>
              </div>
              {validation.map((v, i) => (
                <div key={i} className="wid-tr" role="row">
                  <span role="cell" className="wid-td-role">{v.role}</span>
                  <span role="cell" className="wid-td-scenario">{v.scenario}</span>
                  <span role="cell">{v.signal}</span>
                  <span role="cell">{v.method}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- closing ---------- */}
        <section className="wid-panel wid-dark wid-closing">
          <Image src={wid("wid-logo.svg")} alt="WID" width={121} height={44} />
          <span>UX &amp; UI Case Study</span>
        </section>
      </div>
    </MotionProvider>
  );
}
