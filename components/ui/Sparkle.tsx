/** Four-point star used as decoration throughout the design. */
export default function Sparkle({
  size = 28,
  style,
  delay = 0,
}: {
  size?: number;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <svg
      className="ds-sparkle"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      <path d="M14 0L17.76 10.24L28 14L17.76 17.76L14 28L10.24 17.76L0 14L10.24 10.24L14 0Z" fill="currentColor" />
    </svg>
  );
}
