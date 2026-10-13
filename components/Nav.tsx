"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { avatar, RESUME } from "@/lib/data";
import { ease } from "@/components/motion";

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
];

/** Floating pill navigation; hides on scroll down, returns on scroll up. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 24);
  });

  return (
    <motion.nav
      className={`nav${scrolled ? " nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      <Link href="/" className="nav-brand">
        <Image src={avatar} alt="" width={34} height={34} />
        <span>Fathima</span>
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <a href={RESUME} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn--navy nav-cta">
        Resume
      </a>
    </motion.nav>
  );
}
