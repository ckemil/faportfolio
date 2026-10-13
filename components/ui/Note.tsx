import Image from "next/image";
import { Reveal } from "@/components/motion";
import Sparkle from "./Sparkle";

/**
 * Speech-bubble note: avatar + rounded bubble with a highlighted label,
 * the main text and an optional muted tail.
 */
export function SpeechNote({
  avatar,
  label,
  text,
  tail,
  children,
}: {
  avatar: string;
  label?: string;
  text: string;
  tail?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="ds-note">
      <div className="ds-note-avatar">
        <Image src={avatar} alt="" width={88} height={88} />
        <Sparkle size={18} />
      </div>
      <div className="ds-note-bubble">
        <p>
          {label && <span className="ds-hl">{label} </span>}
          {text}
          {tail && <span className="ds-muted"> {tail}</span>}
        </p>
        {children}
        <Sparkle size={36} delay={1.2} />
      </div>
    </Reveal>
  );
}

/** Yellow "!" callout used for caveats. */
export function WarningNote({ label, text }: { label: string; text: string }) {
  return (
    <Reveal>
      <div className="ds-warning">
        <span className="ds-badge ds-badge--yellow" style={{ width: 36, height: 36 }}>!</span>
        <p>
          <strong>{label}</strong> {text}
        </p>
      </div>
    </Reveal>
  );
}
