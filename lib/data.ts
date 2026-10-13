export const LINKEDIN = "https://www.linkedin.com/in/fathima98/";
export const RESUME =
  "https://drive.google.com/file/d/11KQFbQY1GVlmrrt5NBVqs6eLLGtZeH4a/view?usp=sharing";

const img = (name: string) => `/images/${name}`;

export const avatar = img("YgxBe7wgNd93XD54nNj4qVCKM.jpeg");

/** Floating icons around the hero headline. */
export const heroIcons = [
  { src: img("2HMfPlrEPEf3gVNa3So7SSXsM.jpg"), alt: "Creative Cloud" },
  { src: img("KNDBQgO9SSkq40okizEwxHnaWX0.png"), alt: "Figma" },
  { src: img("slVBMmaAk8fSLZNzpk3balStRo.png"), alt: "Framer" },
  { src: avatar, alt: "Fathima" },
];

export type Project = {
  slug: string;
  title: string;
  cover: string;
  year?: string;
  client?: string;
  company?: string;
  website?: { label: string; href: string };
  tags?: string[];
  /** Case study uses the AptyRead (Figma) design instead of the default layout. */
  hero?: "aptyread";
};

export const projects: Project[] = [
  {
    slug: "aptyread",
    title: "AptyRead – AI Reading Tutor for Kids",
    cover: img("apty/hero.png"),
    tags: ["Education", "AI Tutor", "iOS & Android"],
    hero: "aptyread",
  },
  {
    slug: "aicompanion",
    title: "AI Companion",
    cover: img("bqyIQe2x7s3fdCnXGgl707LDcU.png"),
  },
  {
    slug: "enterprise-erp-sales-force-automation-platform",
    title: "Enterprise ERP & Sales Force Automation Platform",
    cover: img("kztwhzJ6t6fNmax9g7D5uy9Qw.png"),
    year: "2025",
    client: "Seoul Oasis",
  },
  {
    slug: "designing-kitaab",
    title: "Kitaab – Cloud Accounting & Bookkeeping Platform",
    cover: img("liBF9nYAE5pGjzrXe3BaFe57IOE.png"),
    year: "2022",
    client: "Kitaab.ai",
    company: "Zartek Technologies",
    website: { label: "www.kitaab.ai", href: "https://www.kitaab.ai/" },
  },
];

export const aboutPhotos = [
  img("tKTUQQLo4YfFlooGpjTMLvomh3A.jpg"),
  img("FDpVg05OMrYxeKOyQUEpJmqmGU.jpeg"),
  img("mfhIlelMEGPK3QnoB8V0nPUSCY.png"),
  img("5QpAhOzJ4NzmeNztriRfw4HCrHs.jpg"),
];

export const nowPhotos = [
  img("ZKJTz8Re9xhQ4TIbGqIKq1McUk.jpeg"),
  img("Gj2Z8JW6pfXBlGna0BYg6Ki0UA.jpeg"),
  img("LPnrXn7fgt8tYXN6elqVcunM.jpeg"),
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
  aicompanion: [
    { type: "image", src: img("pRGcMvYhnVeige0wst2v4sAXAc.png"), alt: "AI Companion" },
  ],

  "designing-kitaab": [
    { type: "image", src: img("WlBr30RDmtYNHuJq1Gf3mCoWwBs.png"), alt: "Kitaab case study" },
  ],

  "enterprise-erp-sales-force-automation-platform": [
    { type: "h2", text: "Overview" },
    {
      type: "p",
      text: "This project connected two products into one business: a web-based ERP that runs internal operations, and a mobile Sales Force Automation (SFA) app that puts the same operational intelligence into the hands of field sales reps. Instead of designing them as separate tools, I approached them as one ecosystem — a rep's order placed at a customer's door should be visible to a warehouse manager and a finance controller within seconds, not by end of day.",
    },
    {
      type: "p",
      text: "My role spanned the full process: stakeholder research, information architecture, user flows, wireframes, high-fidelity UI, a shared design system across web and mobile, prototyping, and developer handoff.",
    },
    { type: "h2", text: "Core problem" },
    {
      type: "p",
      text: "The organization was running on multiple disconnected third-party systems layered on top of manual processes — separate tools for sales, inventory, accounting, and customer management that didn't talk to each other. Field sales reps recorded orders by hand, then re-entered them later, which meant delays, duplicate data entry, inventory mismatches, and management flying blind on what was actually happening outside the office.",
    },
    {
      type: "callout",
      label: "Goal:",
      text: "Replace the patchwork with one connected ecosystem — a web ERP for internal operations and a mobile SFA app for the field — sharing the same real-time data, so every department is working off the same picture.",
    },
    { type: "h3", text: "Research Highlights" },
    {
      type: "p",
      text: "I had detailed meetings with stakeholders across the business — from sales and warehouse to finance and management — to understand how each team's existing workflow actually worked. A few findings came up repeatedly and shaped most of the decisions that followed:",
    },
    {
      type: "points",
      items: [
        { title: "Speed in the field is non-negotiable.", text: "Reps needed to place an order in minutes, standing in front of a customer — not after driving back to the office." },
        { title: "Visibility beats reporting.", text: "Managers didn't want another report; they wanted to see field activity as it happened." },
        { title: "Reconciliation was eating finance's week.", text: "Manual matching of records across systems was the single biggest time sink for finance." },
        { title: "Stock data had to be trustworthy.", text: "Warehouse teams needed one accurate number, not three conflicting ones." },
        { title: "Executives wanted answers, not spreadsheets.", text: "A dashboard that surfaced insight, not just data." },
      ],
    },
    { type: "h3", text: "Design Process" },
    {
      type: "callout",
      label: "",
      text: "Discover → Research → Information Architecture → User Flows → Low-Fidelity Wireframes → High-Fidelity UI → Interactive Prototypes → Usability Testing → Iterate → Developer Handoff",
    },
    {
      type: "p",
      text: "A single, shared design system carried color, typography, grid, and components across both the web and mobile products — buttons, cards, tables, forms, modals, status indicators, and charts — so the experience felt like one product family, not two separately built apps, while also speeding up development.",
    },
    { type: "image", src: img("EmFVWl1XOUIpOmZBShccs9Je7gY.png"), alt: "Shared design system" },
    { type: "h2", text: "The Solution - Two Products, One Ecosystem" },
    { type: "image", src: img("xGCZQ7ajlAxUsbDQn7bCbJ1y8d0.png"), alt: "ERP and SFA screens" },
    {
      type: "points",
      items: [
        {
          title: "ERP (Web)",
          text: "— Dashboard with AI-powered analytics, CRM, Sales, Purchase, Inventory/Warehouse, Accounting, HRMS, Payroll, Assets, Approvals, Reports, Admin. The dashboard surfaces AI-driven insights — trends, anomalies, and forecasts — so executives get a head start on decisions instead of a pile of spreadsheets to interpret themselves.",
        },
        {
          title: "SFA (Mobile)",
          text: "— Visit planning, GPS check-in, route optimization, order taking, live stock visibility, collections, customer history, promotions, and offline mode with automatic sync. Access is role-based across Warehouse Gatekeeper, Manager, and Sales Person — each sees a tailored view built around their day, not a one-size-fits-all app.",
        },
      ],
    },
    {
      type: "callout",
      label: "The core loop:",
      text: "A rep checks in at a customer site → places an order on the spot → it syncs to the ERP → a manager sees it live, and the warehouse sees updated stock. What used to be a next-day report becomes a real-time event.",
    },
    { type: "h2", text: "Key UX Decisions" },
    { type: "image", src: img("1twxqXaFnUtoI1ev5hocexwaFU.png"), alt: "Key UX decisions" },
    { type: "h2", text: "Business Impact" },
    {
      type: "list",
      items: [
        "Executives moved from raw reports to AI-generated insights and forecasts",
        "Faster order processing and less manual data entry",
        "More accurate, trustworthy inventory data across warehouse and sales",
        "Real-time visibility into field sales activity for managers",
        "Faster approval cycles with clear status tracking",
        "Significantly reduced manual reconciliation time for finance",
        "One consistent experience across desktop and mobile — no relearning between platforms",
      ],
    },
    { type: "h2", text: "Key Takeaway" },
    {
      type: "p",
      text: "Enterprise complexity and usability aren't in conflict when research stays continuous and the design system is shared. Connecting ERP and SFA into a single ecosystem — instead of treating them as separate products — turned scattered, delayed, third-party-fragmented data into one real-time, organization-wide view. That's the difference between a tool people tolerate and a system they actually run their business on.",
    },
    { type: "image", src: img("WOZPKWx8kur4QnHS2bis2czPAZY.png"), alt: "Final screens" },
  ],
};
