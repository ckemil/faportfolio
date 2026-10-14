import Link from "next/link";

type Variant = "primary" | "navy" | "white" | "ghost";

export default function Button({
  href,
  children,
  variant = "navy",
  icon,
  block,
  external,
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  /** Trailing icon in a circle (e.g. an arrow). */
  icon?: React.ReactNode;
  block?: boolean;
  external?: boolean;
  onClick?: () => void;
}) {
  const cls = `ds-btn ds-btn--${variant}${block ? " ds-btn--block" : ""}`;
  const inner = (
    <>
      {children}
      {icon && <span className="ds-btn-icon" aria-hidden>{icon}</span>}
    </>
  );
  if (!href)
    return (
      <button type="button" className={cls} onClick={onClick}>
        {inner}
      </button>
    );
  if (external || href.startsWith("http"))
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
