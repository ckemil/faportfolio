import { Reveal } from "@/components/motion";
import Eyebrow from "./Eyebrow";

export type Lead = { muted?: string; text?: string };

/** Lead copy: a muted lead-in sentence followed by the emphasised remainder. */
export function LeadText({ lead, className = "ds-lead" }: { lead: Lead; className?: string }) {
  return (
    <p className={className}>
      {lead.muted && <span className="ds-muted">{lead.muted} </span>}
      {lead.text}
    </p>
  );
}

/** Eyebrow + title (with optional highlighted tail) + lead, in split / center / stack layouts. */
export default function SectionHeader({
  eyebrow,
  eyebrowVariant,
  title,
  highlight,
  lead,
  layout = "split",
  plain,
}: {
  eyebrow?: string;
  eyebrowVariant?: "navy" | "white";
  title?: string;
  highlight?: string;
  lead?: Lead;
  layout?: "split" | "center" | "stack";
  /** Medium-weight title without eyebrow, as in "Design Process". */
  plain?: boolean;
}) {
  if (!eyebrow && !title && !lead) return null;
  return (
    <Reveal className={`ds-header ds-header--${layout}`}>
      {eyebrow && <Eyebrow variant={eyebrowVariant}>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className={`ds-title${plain ? " ds-title--plain" : ""}`}>
          {title}
          {highlight && (
            <>
              {layout === "center" ? <br /> : " "}
              <span className="ds-hl">{highlight}</span>
            </>
          )}
        </h2>
      )}
      {lead && <LeadText lead={lead} />}
    </Reveal>
  );
}
