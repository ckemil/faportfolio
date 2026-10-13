export default function Eyebrow({ children, variant = "navy" }: { children: React.ReactNode; variant?: "navy" | "white" }) {
  return <span className={`ds-eyebrow${variant === "white" ? " ds-eyebrow--white" : ""}`}>{children}</span>;
}
