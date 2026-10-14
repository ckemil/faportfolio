"use client";

import { useState } from "react";
import { LINKEDIN, RESUME } from "@/lib/data";
import LocalTime from "./LocalTime";
import TicTacToe from "./TicTacToe";

const menu = [
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
];

export default function Footer({ cta }: { cta?: boolean }) {
  const [game, setGame] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-inner">
        {cta && (
          <p className="footer-intro">
            Have a project idea in mind? Let’s chat about how we can bring it to life — virtually, from anywhere
            in the world.
          </p>
        )}

        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="lets-talk">
          Let’s Talk
          <svg viewBox="0 0 48 40" aria-hidden>
            <path d="M0 20h44M26 2l18 18-18 18" fill="none" stroke="currentColor" strokeWidth="5" />
          </svg>
        </a>

        <div className="footer-grid">
          <div className="footer-col footer-about">
            <strong>Fathima Ibrahim</strong>
            <p>
              Ready to bring your ideas to life?
              <br />
              Let’s start the conversation.
            </p>
            <span className="footer-loc">
              UAE <span className="muted"><LocalTime /></span>
            </span>
          </div>

          <div className="footer-col">
            <span className="label">Menu</span>
            <nav className="footer-menu">
              {menu.map((m) => (
                <a key={m.label} href={m.href}>
                  {m.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <span className="label">Elsewhere</span>
            <div className="footer-links">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href={RESUME} target="_blank" rel="noopener noreferrer">
                Resume ↗
              </a>
              <button type="button" onClick={() => setGame(true)}>
                Tic Tac Toe
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fathima Ibrahim</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>

      {game && <TicTacToe onClose={() => setGame(false)} />}
    </footer>
  );
}
