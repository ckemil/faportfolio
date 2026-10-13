export type BadgeTone =
  | "soft" | "primary" | "primary-500" | "navy" | "lime" | "lavender" | "pink" | "teal" | "yellow" | "white" | "success";

export default function Badge({
  children,
  tone = "soft",
  size,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  size?: "sm" | "xs";
}) {
  return <span className={`ds-badge ds-badge--${tone}${size ? ` ds-badge--${size}` : ""}`}>{children}</span>;
}
