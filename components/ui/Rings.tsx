/** Large translucent ellipse strokes in the panel corners. Colour comes from the section tone. */
export default function Rings({ only }: { only?: "a" | "b" }) {
  return (
    <div className="ds-rings" aria-hidden>
      {only !== "b" && (
        <div className="ds-ring ds-ring--a">
          <svg viewBox="0 0 700 600" preserveAspectRatio="none">
            <ellipse cx="350" cy="300" rx="333" ry="283" fill="none" stroke="currentColor" strokeWidth="34" />
          </svg>
        </div>
      )}
      {only !== "a" && (
        <div className="ds-ring ds-ring--b">
          <svg viewBox="0 0 560 640" preserveAspectRatio="none">
            <ellipse cx="280" cy="320" rx="263" ry="303" fill="none" stroke="currentColor" strokeWidth="34" />
          </svg>
        </div>
      )}
    </div>
  );
}
