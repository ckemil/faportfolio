import Badge, { type BadgeTone } from "./Badge";

export type CardTone =
  | "white" | "frost" | "navy" | "blue" | "lime" | "lavender" | "pink" | "yellow" | "surface" | "glass" | "header";

/** Default badge colour for each card tone, matching the Figma pairings. */
const badgeFor: Record<CardTone, BadgeTone> = {
  white: "soft",
  frost: "primary",
  navy: "primary-500",
  blue: "primary",
  lime: "lime",
  lavender: "lavender",
  pink: "pink",
  yellow: "yellow",
  surface: "soft",
  glass: "white",
  header: "navy",
};

export default function Card({
  tone = "white",
  badge,
  badgeTone,
  title,
  children,
  visual,
  inlineBadge,
  className = "",
}: {
  tone?: CardTone;
  badge?: React.ReactNode;
  badgeTone?: BadgeTone;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Illustration panel at the top of the card. */
  visual?: React.ReactNode;
  /** Badge sits beside the title instead of above it. */
  inlineBadge?: boolean;
  className?: string;
}) {
  const b = badge !== undefined && (
    <Badge tone={badgeTone ?? badgeFor[tone]} size={inlineBadge || tone === "frost" ? "sm" : undefined}>
      {badge}
    </Badge>
  );
  const inline = inlineBadge || tone === "header";
  return (
    <div className={`ds-card ds-card--${tone} ${className}`}>
      {visual && <div className="ds-card-visual">{visual}</div>}
      {inline ? (
        <div className="ds-card-head">
          {b}
          {title && <h3 className="ds-card-title">{title}</h3>}
        </div>
      ) : (
        <>
          {b}
          {title && <h3 className="ds-card-title">{title}</h3>}
        </>
      )}
      {children && <div className="ds-card-text">{children}</div>}
    </div>
  );
}
