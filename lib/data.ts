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
  /** Card tint on the home page. */
  tone: "blue" | "lime" | "lavender" | "pink";
  /** Bespoke hero on the case-study page. */
  hero?: "aptyread";
};

export const projects: Project[] = [
  {
    slug: "aptyread",
    title: "AptyRead – AI Reading Tutor for Kids",
    cover: img("apty/hero.png"),
    tags: ["Education", "AI Tutor", "iOS & Android"],
    tone: "blue",
    hero: "aptyread",
  },
  {
    slug: "aicompanion",
    title: "AI Companion",
    cover: img("bqyIQe2x7s3fdCnXGgl707LDcU.png"),
    tone: "lavender",
  },
  {
    slug: "enterprise-erp-sales-force-automation-platform",
    title: "Enterprise ERP & Sales Force Automation Platform",
    cover: img("kztwhzJ6t6fNmax9g7D5uy9Qw.png"),
    year: "2025",
    client: "Seoul Oasis",
    tags: ["Web ERP", "Mobile SFA", "Design System"],
    tone: "lime",
  },
  {
    slug: "designing-kitaab",
    title: "Kitaab – Cloud Accounting & Bookkeeping Platform",
    cover: img("liBF9nYAE5pGjzrXe3BaFe57IOE.png"),
    year: "2022",
    client: "Kitaab.ai",
    company: "Zartek Technologies",
    website: { label: "www.kitaab.ai", href: "https://www.kitaab.ai/" },
    tone: "pink",
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
