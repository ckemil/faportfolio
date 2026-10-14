/**
 * External-link arrow (↗) drawn as SVG. The "↗" character renders as a blue emoji on iOS,
 * so every link arrow uses this instead to look identical on every device and follow the text colour.
 */
export default function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow-ur ${className}`} viewBox="0 0 16 16" aria-hidden focusable="false">
      <path d="M4.5 11.5 L11.5 4.5 M5.5 4.5 H11.5 V10.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
