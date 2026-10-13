export type PillVariant = "default" | "navy" | "glass" | "frost" | "blue" | "lime" | "lavender" | "pink" | "yellow";

export default function Pill({
  children,
  variant = "default",
  size,
}: {
  children: React.ReactNode;
  variant?: PillVariant;
  size?: "sm";
}) {
  const cls = ["ds-pill", variant !== "default" && `ds-pill--${variant}`, size && `ds-pill--${size}`].filter(Boolean).join(" ");
  return <span className={cls}>{children}</span>;
}

/** "Your AI | Learning Buddy" style two-part pill. */
export function SplitPill({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <span className="ds-split-pill">
      <span>{left}</span>
      <span>{right}</span>
    </span>
  );
}
