"use client";

import Image from "next/image";
import { useState } from "react";
import { avatar, LINKEDIN, RESUME } from "@/lib/data";
import LocalTime from "./LocalTime";
import TicTacToe from "./TicTacToe";

export default function Footer({ cta }: { cta?: boolean }) {
  const [game, setGame] = useState(false);

  return (
    <footer className="footer">
      {cta && (
        <div className="footer-cta">
          <p>
            Have a project idea in mind? Let’s chat about how we can bring it to life— virtually, from anywhere
            in the world!
          </p>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Connect Now
          </a>
        </div>
      )}

      <div className="footer-hero">
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
                <LocalTime />
              </span>
            </div>
          </div>
          <div className="contact-links">
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="chip">
              Resume
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="chip">
              Linkedin
            </a>
            <button type="button" className="chip" onClick={() => setGame(true)}>
              Tic Tac Toe
            </button>
          </div>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-block">
            Connect Now
          </a>
        </div>

        <a href="#top" className="back-to-top">
          Back to top ↑
        </a>
      </div>

      {game && <TicTacToe onClose={() => setGame(false)} />}
    </footer>
  );
}
