"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { avatar, EMAIL, LINKEDIN, RESUME } from "@/lib/data";
import LocalTime from "./LocalTime";
import ArrowUpRight from "./ArrowUpRight";

const VIDEO = "/video/footer.mp4";

function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-card-head">
        <Image src={avatar} alt="" width={56} height={56} className="contact-card-avatar" />
        <div>
          <strong>Fathima Ibrahim</strong>
          <span>Senior Product Designer</span>
        </div>
      </div>

      <div className="contact-card-email">
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <button type="button" onClick={copy} aria-live="polite">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="contact-card-actions">
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
          LinkedIn <ArrowUpRight />
        </a>
        <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-soft">
          Resume <ArrowUpRight />
        </a>
      </div>

      <p className="contact-card-loc">
        UAE <span className="muted"><LocalTime /></span>
      </p>
    </div>
  );
}

/**
 * Home page footer: a rounded full-screen panel with a looping flower video
 * behind a contact card. The 22 MB video only loads as the footer nears the viewport.
 */
export default function HomeFooter() {
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <footer ref={ref} className="home-footer" id="contact">
      {near && <video className="home-footer-video" src={VIDEO} autoPlay muted loop playsInline aria-hidden />}
      <ContactCard />
      <a href="#top" className="home-footer-top">
        Back to top
      </a>
    </footer>
  );
}
