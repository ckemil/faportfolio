// AptyRead case study — the only page using the Figma design system (components/ui, styles/aptyread/*).
import type { SectionTone, CardTone, Lead, BadgeTone } from "@/components/ui";

const apty = (name: string) => `/images/apty/${name}`;

export type FlowTone = "lime" | "blue" | "lavender" | "pink" | "yellow" | "navy";
export type Visual = "now-next" | "bars" | "parent-toggle" | "states";

export type Block =
  | { type: "p"; text: string }
  | { type: "quote"; lead: Lead }
  | {
      type: "cards";
      columns?: 2 | 3;
      framed?: boolean;
      items: { title: string; text?: string; tone?: CardTone; badge?: string; badgeTone?: BadgeTone; visual?: Visual }[];
    }
  | { type: "flow"; items: { title: string; text?: string; tone: FlowTone; chips?: string[] }[]; loop?: string }
  | { type: "process"; items: { title: string; tone: FlowTone }[] }
  | { type: "table"; head: [string, string]; rows: { label: string; tone: FlowTone; text: string }[] }
  | { type: "metrics"; items: { dir: "up" | "down"; label: string; value: string }[] }
  | { type: "checklist"; items: string[] }
  | { type: "image"; src: string; alt: string; width: number; height: number; bare?: boolean; caption?: string }
  | { type: "images"; items: { src: string; alt: string; width: number; height: number }[] }
  | { type: "speech"; avatar?: string; label?: string; text: string; tail?: string }
  | { type: "warning"; label: string; text: string }
  | { type: "apty-intro" }
  | { type: "apty-closing" };

export type CaseSection = {
  tone: SectionTone;
  rings?: boolean | "a" | "b";
  /** Apty mascot peeking from a corner. */
  mascot?: "left" | "right";
  eyebrow?: string;
  title?: string;
  highlight?: string;
  lead?: Lead;
  layout?: "split" | "center" | "stack";
  plain?: boolean;
  blocks?: Block[];
};

const aptyAvatar = apty("apty-avatar.png");

export const aptyreadSections: CaseSection[] = [
    { tone: "surface", blocks: [{ type: "apty-intro" }] },

    {
      tone: "blue",
      rings: true,
      mascot: "right",
      eyebrow: "The Challenge",
      title: "How might we make learning to read feel",
      highlight: "clear, achievable, and rewarding?",
      layout: "center",
      blocks: [
        {
          type: "cards",
          columns: 3,
          items: [
            { badge: "1", tone: "white", title: "Learning is cumulative", text: "Early literacy is a cumulative process. Children must master foundational skills before they can confidently move on to more complex reading — so the interface must simplify the experience without oversimplifying the learning." },
            { badge: "2", tone: "white", title: "Parents need visibility", text: "Parents need to understand what their children are learning, where they are in the journey and how to support them — without becoming full-time instructors." },
            { badge: "3", tone: "navy", title: "The real challenge", text: "Not simply to make the app visually engaging, but to design an experience that supports learning progression, learner confidence and parent trust." },
          ],
        },
      ],
    },

    {
      tone: "surface",
      eyebrow: "Product Strategy",
      title: "Progress over engagement.",
      lead: { muted: "Rather than treating engagement as the primary measure of success,", text: "the design direction prioritises meaningful learning progress." },
      blocks: [
        {
          type: "cards",
          columns: 3,
          items: [
            { badge: "1", tone: "lime", visual: "now-next", title: "Learning clarity", text: "Make the current task, learning objective and next step immediately understandable." },
            { badge: "2", tone: "blue", visual: "bars", title: "Structured progression", text: "Organise content around prerequisite skills so that advancement feels logical rather than arbitrary." },
            { badge: "3", tone: "lavender", visual: "parent-toggle", title: "Parent confidence", text: "Make learning progress and parental controls accessible without disrupting the child’s experience." },
          ],
        },
      ],
    },

    {
      tone: "periwinkle",
      mascot: "left",
      title: "Project Goals",
      layout: "center",
      plain: true,
      blocks: [
        {
          type: "cards",
          columns: 2,
          framed: true,
          items: [
            { badge: "1", tone: "header", badgeTone: "navy", title: "Voice-first learning", text: "Kids listen, repeat and trace. The app records and responds, so pre-readers never get stuck on written instructions." },
            { badge: "2", tone: "header", badgeTone: "pink", title: "A tutor, not a textbook", text: "An AI tutor and Apty the mascot guide every step, cheer each win and offer a retry on mistakes." },
            { badge: "3", tone: "header", badgeTone: "teal", title: "Progress kids can feel", text: "Stars, rewards, badges and certificates turn every short lesson into a small win." },
            { badge: "4", tone: "header", badgeTone: "primary", title: "Parents stay in control", text: "One PIN-protected parent mode for progress, screen-time limits, courses and payments." },
          ],
        },
      ],
    },

    {
      tone: "surface",
      eyebrow: "Understanding the Users",
      title: "Two users, one learning model.",
      lead: { muted: "Early-reader children and the parents behind them.", text: "Their needs below are initial hypotheses to validate — not findings from documented interviews." },
      blocks: [
        {
          type: "images",
          items: [
            { src: apty("persona-child.png"), width: 1248, height: 1400, alt: "Child learner — learns by doing: needs clear instructions and minimal cognitive overload, benefits from predictable interactions and immediate feedback, and needs to feel safe making mistakes and repeating activities." },
            { src: apty("persona-parent.png"), width: 1248, height: 1400, alt: "Parent or caregiver — wants proof it works: needs confidence in the learning method, wants to understand progression without interpreting complex educational data, and needs a practical way to manage practice time and support consistency." },
          ],
        },
        {
          type: "speech",
          avatar: aptyAvatar,
          label: "Design implication:",
          text: "the child-facing experience and the parent-facing controls serve different purposes.",
          tail: "They are connected through the same learning model, but they should never compete for attention on the same screen.",
        },
      ],
    },

    {
      tone: "soft",
      eyebrow: "Information Architecture",
      title: "One clear path through every lesson.",
      lead: { muted: "Learning is organised around a clear progression.", text: "Each lesson supports a specific skill, and the next step emerges naturally from completion." },
      blocks: [
        {
          type: "flow",
          loop: "↺  Each completion unlocks the next lesson",
          items: [
            { tone: "lime", title: "Learning home", text: "Current level · Continue learning" },
            { tone: "blue", title: "Lesson introduction", text: "Set expectations and explain the task" },
            { tone: "lavender", title: "Guided practice", text: "Listen · Speak · Write", chips: ["Listen", "Speak", "Write"] },
            { tone: "pink", title: "Completion & feedback", text: "Reinforce learning and give the next step" },
            { tone: "navy", title: "Progression", text: "Continue, practise again or review progress" },
          ],
        },
      ],
    },

    {
      tone: "soft",
      title: "Design Process",
      plain: true,
      lead: { muted: "Five stages took AptyRead from a lesson idea to finished screens.", text: "Each one answered a single question and produced something the next stage could build on." },
      blocks: [
        {
          type: "process",
          items: [
            { tone: "lime", title: "Learning flow" },
            { tone: "blue", title: "Structure" },
            { tone: "lavender", title: "Character & voice" },
            { tone: "pink", title: "UI design" },
            { tone: "navy", title: "Refinement" },
          ],
        },
      ],
    },

    {
      tone: "surface",
      title: "Low Fidelity Design",
      plain: true,
      lead: { muted: "For low fidelity,", text: "we shaped each screen with simple blocks, mapped the interactions without distraction and checked the navigation before moving into visuals." },
      blocks: [
        { type: "image", bare: true, src: apty("wireframes.png"), width: 2528, height: 1080, alt: "Wireframes: Who's learning, My Courses, Level 1, Classroom, My Progress", caption: "Wireframes re-drawn from the final screens to show structure." },
      ],
    },

    {
      tone: "surface",
      title: "Turning Wireframes Into",
      highlight: "Wow Moments",
      plain: true,
      lead: { text: "What began as simple layouts grew into bright, character-led screens with Apty, the AI tutor and rewards that make young learners want to come back." },
      blocks: [
        { type: "image", bare: true, src: apty("hifi.png"), width: 2656, height: 1112, alt: "High fidelity screens: profile picker, course library, lesson list, AI tutor lesson, streaks and stats" },
      ],
    },

    {
      tone: "surface",
      eyebrow: "Key Design Decisions",
      title: "Four decisions that shaped the experience.",
      lead: { muted: "Each decision traces back to the strategy:", text: "clarity for the child, visible progression, and a parent area that never interrupts learning." },
      blocks: [
        {
          type: "images",
          items: [
            { src: apty("decision-1.png"), width: 1248, height: 1200, alt: "01 Reduce cognitive load — keep the primary learning action visually dominant. Rationale: young learners should spend their attention on the learning task, not on understanding the interface." },
            { src: apty("decision-2.png"), width: 1248, height: 1200, alt: "02 Make progression visible — present the learning journey as a sequence of achievable steps. Rationale: visible progression helps children orient themselves and gives parents a clearer understanding of the programme structure." },
            { src: apty("decision-3.png"), width: 1248, height: 1200, alt: "03 Connect instruction with practice — keep demonstrations and practice within a coherent lesson flow. Rationale: consistent interaction patterns reduce the effort needed to move between learning activities." },
            { src: apty("decision-4.png"), width: 1248, height: 1200, alt: "04 Separate parent controls from learning — place settings, practice limits and progress in a distinct, PIN-protected parent area. Rationale: this preserves the child’s focus while giving caregivers appropriate oversight." },
          ],
        },
      ],
    },

    {
      tone: "blue",
      rings: "b",
      eyebrow: "Design System & Accessibility",
      title: "Built to scale across letters, levels and learners.",
      lead: { muted: "A scalable learning product needs more than a consistent visual style.", text: "Its system must support repeated lesson patterns, multiple levels, accessibility and future content." },
      blocks: [
        {
          type: "cards",
          columns: 3,
          items: [
            { badge: "1", tone: "frost", title: "Interaction consistency", text: "Reuse patterns for audio playback, answering, practising and completing lessons." },
            { badge: "2", tone: "frost", title: "Visual hierarchy", text: "Prioritise the learning instruction and primary action over supporting information." },
            { badge: "3", tone: "frost", title: "Accessible feedback", text: "Use text, icons and clear states alongside colour to communicate progress." },
            { badge: "4", tone: "frost", title: "Touch usability", text: "Design controls with young users’ motor skills in mind." },
            { badge: "5", tone: "frost", title: "Content scalability", text: "Build reusable components that fit different letters, words, exercises and lesson states." },
            { tone: "navy", visual: "states", title: "" },
          ],
        },
      ],
    },

    {
      tone: "surface",
      eyebrow: "Validation & Measurement",
      title: "Define success before claiming it.",
      lead: { muted: "How the design will be evaluated,", text: "set out before any claim that it improved outcomes." },
      blocks: [
        {
          type: "table",
          head: ["Evaluation area", "What to measure"],
          rows: [
            { label: "Learnability", tone: "lime", text: "Can a child start and complete a lesson with minimal assistance?" },
            { label: "Task success", tone: "blue", text: "Can the learner perform the required activity correctly?" },
            { label: "Progression", tone: "lavender", text: "Where do learners repeat, pause or abandon lessons?" },
            { label: "Parent experience", tone: "pink", text: "Can parents find progress and manage practice settings?" },
            { label: "Accessibility", tone: "yellow", text: "Can users understand instructions, feedback and controls?" },
          ],
        },
        {
          type: "speech",
          avatar: aptyAvatar,
          label: "Next step:",
          text: "usability testing with children and caregivers, using age-appropriate research methods and parental consent.",
          tail: "Baseline and post-design measurements would then show whether the experience improves usability and supports learning.",
        },
      ],
    },

    {
      tone: "primary",
      rings: true,
      mascot: "right",
      eyebrow: "Impact",
      title: "Evidence, not assumptions.",
      lead: { text: "Success will be judged on evidence from real use. These are the measures the design is set up to move:" },
      blocks: [
        {
          type: "metrics",
          items: [
            { dir: "up", label: "Lesson completion rate", value: "To be measured" },
            { dir: "down", label: "Navigation errors and requests for help", value: "To be measured" },
            { dir: "up", label: "Successful completion of key learning tasks", value: "To be measured" },
            { dir: "up", label: "Parent understanding of learning progress", value: "To be measured" },
            { dir: "down", label: "Lesson abandonment", value: "To be measured" },
          ],
        },
        { type: "warning", label: "Results:", text: "to be added from analytics, usability tests or stakeholder feedback. No numerical improvements have been assumed." },
      ],
    },

    {
      tone: "surface",
      eyebrow: "Reflection",
      title: "Simplicity with educational depth.",
      layout: "stack",
      blocks: [
        {
          type: "quote",
          lead: { muted: "Designing for early literacy means balancing simplicity with educational depth.", text: "The most important question is not how to make every lesson more entertaining, but how to make each learning step understandable, purposeful and achievable." },
        },
        {
          type: "speech",
          avatar: aptyAvatar,
          label: "The broader lesson:",
          text: "educational UX should be evaluated through both usability and learning outcomes.",
          tail: "A clear interface is valuable, but its real contribution is helping learners engage with the content and move forward with confidence.",
        },
      ],
    },

    { tone: "blue", rings: true, blocks: [{ type: "apty-closing" }] },
  ];
