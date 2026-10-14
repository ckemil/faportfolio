import { LINKEDIN, RESUME } from "@/lib/data";
import ArrowUpRight from "./ArrowUpRight";

const links = [
  { label: "Resume", href: RESUME, external: true },
  { label: "Works", href: "/#projects" },
  { label: "Playground", href: "/playground" },
  { label: "LinkedIn", href: LINKEDIN, external: true },
];

export default function Nav() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="/#top" className="topbar-name">
          Fathima Ibrahim
        </a>
        <span className="topbar-status">
          <span className="status-dot" /> Available now
        </span>
        <nav className="topbar-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
              {l.external && <ArrowUpRight />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
