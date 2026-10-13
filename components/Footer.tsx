"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { avatar, LINKEDIN, RESUME } from "@/lib/data";
import { Button, Section, SpeechNote } from "@/components/ui";
import LocalTime from "./LocalTime";
import TicTacToe from "./TicTacToe";

export default function Footer() {
  const [game, setGame] = useState(false);

  return (
    <>
      <Section tone="navy" rings>
        <SpeechNote
          avatar={avatar}
          label="Have a project idea in mind?"
          text="Let’s chat about how we can bring it to life—"
          tail="virtually, from anywhere in the world!"
        >
          <div style={{ marginTop: 24 }}>
            <Button href={LINKEDIN} variant="white" icon="↗">
              Connect Now
            </Button>
          </div>
        </SpeechNote>
      </Section>

      <footer className="footer">
        <video className="footer-video" src="/video/footer.mp4" autoPlay muted loop playsInline preload="metadata" />
        <div className="footer-overlay" />
        <h2 className="footer-name" lang="ar" dir="rtl">
          فاطمة
        </h2>

        <div className="contact-card">
          <div className="contact-head">
            <Image src={avatar} alt="Fathima Ebrahim" width={44} height={44} className="contact-avatar" />
            <div>
              <strong>Fathima Ebrahim</strong>
              <span className="contact-time">
                <span className="now-dot" /> <LocalTime />
              </span>
            </div>
          </div>
          <div className="contact-links">
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="ds-pill ds-pill--glass">Resume</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="ds-pill ds-pill--glass">Linkedin</a>
            <button type="button" className="ds-pill ds-pill--glass" onClick={() => setGame(true)}>Tic Tac Toe</button>
          </div>
          <Button href={LINKEDIN} variant="white" block icon="↗">
            Connect Now
          </Button>
        </div>

        <div className="footer-bottom">
          <a href="#top">Back to top ↑</a>
          <Link href="/design-system">Design system</Link>
        </div>

        {game && <TicTacToe onClose={() => setGame(false)} />}
      </footer>
    </>
  );
}
