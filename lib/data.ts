/** Canonical production URL, used for SEO metadata, sitemap and structured data. */
export const SITE_URL = "https://uixfathima.com";
export const LINKEDIN = "https://www.linkedin.com/in/fathima98/";
export const EMAIL = "fathimap02@gmail.com";
export const RESUME =
  "https://drive.google.com/file/d/11KQFbQY1GVlmrrt5NBVqs6eLLGtZeH4a/view?usp=sharing";

const img = (name: string) => `/images/${name}`;

export const avatar = img("YgxBe7wgNd93XD54nNj4qVCKM.jpeg");

export type Project = {
  slug: string;
  /** Industry shown on the home page card tag, e.g. "Fintech". */
  industry: string;
  title: string;
  cover: string;
  year?: string;
  client?: string;
  company?: string;
  website?: { label: string; href: string };
  tags?: string[];
  /** One- or two-sentence pitch shown on the home page project card. */
  summary?: string;
  /** Case study uses a bespoke Figma-built page instead of the default layout. */
  hero?: "aptyread" | "aicompanion" | "erp" | "wid" | "fpp" | "kitaab" | "duxbe";
};

export const projects: Project[] = [
  {
    slug: "aicompanion",
    industry: "AI Productivity",
    title: "AI Companion",
    cover: img("bqyIQe2x7s3fdCnXGgl707LDcU.png"),
    summary:
      "A personal AI companion app that records meetings and conversations, then turns them into reflections and goals you can act on.",
    hero: "aicompanion",
  },
  {
    slug: "enterprise-erp-sales-force-automation-platform",
    industry: "Enterprise SaaS",
    title: "Enterprise ERP & Sales Force Automation Platform",
    cover: img("kztwhzJ6t6fNmax9g7D5uy9Qw.png"),
    year: "2025",
    client: "Seoul Oasis",
    hero: "erp",
    summary:
      "A web ERP and a mobile sales app designed as one ecosystem, so an order placed in the field reaches the warehouse and finance in seconds.",
  },
  {
    slug: "duxbe",
    industry: "Restaurant SaaS",
    title: "Duxbe – Restaurant Management Platform",
    cover: img("duxbe/card.webp"),
    tags: ["Senior Product Designer", "5 months"],
    summary:
      "A restaurant platform that connects point of sale, inventory, recipes, purchasing and customer loyalty, so owners can move from spotting a problem to acting on it.",
    hero: "duxbe",
  },
  {
    slug: "financial-partner-platform",
    industry: "Fintech",
    title: "Financial Partner Platform",
    cover: img("fpp/cover.png"),
    tags: ["Mobile"],
    summary:
      "A mobile app for financial advisors and distribution partners to manage clients, portfolios, onboarding and business growth in one daily workspace.",
    hero: "fpp",
  },
  {
    slug: "designing-kitaab",
    industry: "Accounting SaaS",
    title: "Kitaab – Cloud Accounting & Bookkeeping Platform",
    cover: img("liBF9nYAE5pGjzrXe3BaFe57IOE.png"),
    summary:
      "A cloud accounting platform that brings bookkeeping, taxation, and on-demand CFO services together for growing businesses.",
    year: "2022",
    client: "Kitaab.ai",
    company: "Zartek Technologies",
    website: { label: "www.kitaab.ai", href: "https://www.kitaab.ai/" },
    hero: "kitaab",
  },
  {
    slug: "aptyread",
    industry: "EdTech",
    title: "AptyRead – AI Learning Platform",
    cover: img("apty/card.webp"),
    tags: ["Education", "AI Tutor", "iOS & Android"],
    summary:
      "An AI reading tutor that helps children build literacy step by step, turning each lesson into a friendly, guided journey.",
    hero: "aptyread",
  },
  {
    slug: "wid",
    industry: "Luxury E-commerce",
    title: "WID – Luxury Gifting App",
    cover: img("wid/cover.png"),
    tags: ["Luxury gifting", "Doha, Qatar"],
    summary:
      "A luxury gifting app based in Qatar: a customer app, a driver app and a super admin panel, designed so every order arrives feeling as personal as the moment it was sent for.",
    hero: "wid",
  },
];

export const aboutPhotos = [
  img("tKTUQQLo4YfFlooGpjTMLvomh3A.jpg"),
  img("FDpVg05OMrYxeKOyQUEpJmqmGU.jpeg"),
  img("mfhIlelMEGPK3QnoB8V0nPUSCY.png"),
  img("5QpAhOzJ4NzmeNztriRfw4HCrHs.jpg"),
];

export const nowPhoto = img("now-polaroid.jpg");

/* ------------------------------------------------------------------ */
/* Design Radar — trends, tools and reads currently on my radar        */
/* ------------------------------------------------------------------ */

export type RadarKind = "Trend" | "Tool" | "Read" | "Inspiration";
export type RadarItem = { kind: RadarKind; title: string; note: string; href: string; source: string };

export const radar: RadarItem[] = [
  { kind: "Trend", title: "AI-native interfaces", note: "Moving from chat boxes to AI woven into the flow — suggestions, summaries and actions where the work already happens.", href: "https://www.nngroup.com/articles/", source: "nngroup.com" },
  { kind: "Trend", title: "Expressive design systems", note: "Systems with more personality — bolder shape, motion and colour — without losing consistency.", href: "https://m3.material.io/", source: "m3.material.io" },
  { kind: "Tool", title: "Figma", note: "Where every project starts and ends: components, variables and prototypes, now with AI in the loop.", href: "https://www.figma.com/", source: "figma.com" },
  { kind: "Tool", title: "Rive", note: "Interactive, state-driven motion that ships to production instead of staying in a prototype.", href: "https://rive.app/", source: "rive.app" },
  { kind: "Read", title: "Apple Human Interface Guidelines", note: "My go-to reference for platform conventions before breaking any of them on mobile.", href: "https://developer.apple.com/design/human-interface-guidelines/", source: "developer.apple.com" },
  { kind: "Read", title: "Laws of UX", note: "A quick, visual refresher on the psychology behind good interface decisions.", href: "https://lawsofux.com/", source: "lawsofux.com" },
  { kind: "Inspiration", title: "Mobbin", note: "Real-world mobile and web flows to benchmark patterns before designing new ones.", href: "https://mobbin.com/", source: "mobbin.com" },
  { kind: "Inspiration", title: "Godly", note: "A steady stream of bold, well-crafted web design to keep the visual eye sharp.", href: "https://godly.website/", source: "godly.website" },
];

export type Tool = { name: string; desc: string; href: string; icon: string };

export const stack: Tool[] = [
  { name: "Figma", desc: "Interface Design & Design Systems", href: "https://www.figma.com/", icon: img("lweqg2qXLxrdatIp2lQAQnvQuVQ.gif") },
  { name: "FigJam", desc: "Whiteboard & User Flows", href: "https://www.figma.com/figjam", icon: img("aY1XowTkftV71g4465WJkOShzo.png") },
  { name: "Spline", desc: "Interactive 3D Design & Spatial UI", href: "https://spline.design/", icon: img("v0K2d7gRHIQWDwOvgUCl1QHEMYM.jpg") },
  { name: "Webflow", desc: "CMS-Driven Web Development", href: "https://webflow.com/", icon: img("CY63VYi8Vtd6DD8CZsnWe0ICKn4.jpg") },
  { name: "Framer", desc: "Production-Ready Web Prototyping", href: "https://framer.com", icon: img("xtClGQnfkFqtTCvku7pHjftc2OA.webp") },
  { name: "Claude AI", desc: "UX Logic & Research Synthesis", href: "https://claude.ai/", icon: img("yzKQmNwlZFQwF1g6kOJiay73vE.png") },
  { name: "UX Pilot", desc: "AI-Powered Wireframing & Mapping", href: "https://uxpilot.ai/", icon: img("xgYTzgAFF6z3iiJD3Z6v9CmXRg.png") },
  { name: "Visily AI", desc: "Rapid Low-Fidelity Prototyping", href: "https://www.visily.ai/", icon: img("a1cc9hfBUeod8l9XaxppHrilE0.webp") },
  { name: "Lovable", desc: "Design-to-Code & Functional MVPs", href: "https://lovable.dev/", icon: img("aEETebWu5UpIPFR17jsBhAHSHI.png") },
  { name: "Adobe Illustrator", desc: "Vector Asset & Icon Creation", href: "https://www.adobe.com/products/illustrator.html", icon: img("h3Y1YA1oEpA9oj8xVgVUeXSX8ig.png") },
  { name: "ProtoPie", desc: "Advanced Logic-Based Interaction", href: "https://www.protopie.io/", icon: img("xykiD9vv5J4lGURieLXpOdOUTE.svg") },
  { name: "After Effects", desc: "Motion Branding & Micro-interactions", href: "https://www.adobe.com/products/aftereffects.html", icon: img("RVgT2urqF64zZmwxg2LMiFwhU.png") },
  { name: "Zeplin", desc: "Structured Developer Handoff", href: "https://zeplin.io/", icon: img("jOGJ47IBau93PRk2AvXPYsHiGs.svg") },
  { name: "Notion", desc: "Project Documentation & Design", href: "https://www.notion.so/", icon: img("y7cu91NaDPWGjDKmuMPUcQXwKS4.png") },
];

/* ------------------------------------------------------------------ */
/* Case study content (default layout)                                 */
/* ------------------------------------------------------------------ */

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "points"; items: { title: string; text: string }[] }
  | { type: "list"; items: string[] }
  | { type: "callout"; label: string; text: string }
  | { type: "image"; src: string; alt: string };

export const caseStudies: Record<string, Block[]> = {
  "designing-kitaab": [
    { type: "image", src: img("WlBr30RDmtYNHuJq1Gf3mCoWwBs.png"), alt: "Kitaab case study" },
  ],

};
