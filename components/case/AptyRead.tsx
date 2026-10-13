"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Pill, Sparkle, SplitPill } from "@/components/ui";
import { ease } from "@/components/motion";

const A = (n: string) => `/images/apty/${n}`;

/** Animated wordmark: each letter rises out of a clip mask. */
export function Wordmark({ text, delay = 0.2 }: { text: string; delay?: number }) {
  return (
    <h1 className="ds-display" aria-label={text}>
      <span className="ds-display-clip" aria-hidden>
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="ds-letter"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

/** Hero rebuilt from Figma node "Hero" (34488:7705). */
export function AptyHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <div ref={ref} className="apty-hero">
      <Sparkle size={22} style={{ left: "56%", top: 52 }} />
      <Sparkle size={14} delay={0.8} style={{ left: "46.5%", top: 128 }} />
      <Sparkle size={32} delay={1.4} style={{ left: "5%", top: "44%" }} />
      <Sparkle size={26} delay={0.4} style={{ right: "7%", top: "27%" }} />
      <Sparkle size={22} delay={2} style={{ right: "25%", bottom: "12%" }} />

      <motion.div className="apty-hero-avatar" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
        <Image src={A("apty-avatar.png")} alt="Apty" width={96} height={96} priority />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease }}>
        <SplitPill left="Your AI" right="Learning Buddy" />
      </motion.div>

      <Wordmark text="AptyRead" />

      <motion.div className="apty-hero-phone" style={{ y: phoneY }} initial={{ opacity: 0, y: 160 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }}>
        <Image src={A("phone-courses.png")} alt="AptyRead My Courses screen" width={852} height={1226} priority sizes="420px" />
      </motion.div>

      <motion.div className="apty-hero-chip" style={{ y: chipY }} initial={{ opacity: 0, x: 40, rotate: 0 }} animate={{ opacity: 1, x: 0, rotate: 4 }} transition={{ delay: 0.9, duration: 0.8, ease }}>
        <span className="ds-float">
          AI Learning App <span className="apty-hero-play">▶</span>
        </span>
      </motion.div>

      <motion.div className="apty-hero-aa" style={{ y: chipY }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 14 }}>
        <span className="ds-float ds-float--delay">Aa</span>
      </motion.div>
    </div>
  );
}

/** Intro section (Figma node "Intro"): statement, problem bubble, floating product cards. */
export function AptyIntro() {
  return (
    <div className="apty-intro">
      <motion.div className="apty-intro-statement" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
        <p>
          <span className="apty-intro-brand">AptyRead</span> <span className="ds-muted">is an AI reading tutor that helps</span>{" "}
          <span className="ds-muted">kids aged 5–10</span> read, write and speak <span className="ds-muted">English with</span> Apty
          <span className="ds-muted">, a friendly AI buddy.</span>
        </p>
        <motion.div className="apty-intro-mascot" animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <Image src={A("apty-mascot.png")} alt="" width={900} height={825} sizes="200px" />
        </motion.div>
      </motion.div>

      <div className="ds-note" style={{ marginTop: 56 }}>
        <div className="ds-note-avatar">
          <Image src={A("apty-avatar.png")} alt="" width={88} height={88} />
          <Sparkle size={18} />
        </div>
        <motion.div className="ds-note-bubble" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
          <p style={{ fontSize: "var(--fs-body)", lineHeight: 1.6 }}>
            Children aged 5–10 learn to read by listening, repeating and trying — yet most reading apps expect them to read the
            instructions first. And parents can’t easily tell whether screen time is turning into real progress.
          </p>
          <Sparkle size={36} delay={1.2} />
        </motion.div>
      </div>

      <div className="apty-intro-board">
        <motion.div className="apty-card apty-card--course" initial={{ opacity: 0, y: 40, rotate: -6 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 120, damping: 14 }}>
          <small>English · Level 1</small>
          <strong>I am Learning Letters</strong>
          <small>146 lessons</small>
          <span className="apty-join">Join course <span>▶</span></span>
        </motion.div>

        <motion.div className="apty-card apty-card--done ds-float" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 14 }}>
          <strong>Lesson Completed</strong>
          <div className="apty-done-stats">
            <span style={{ background: "var(--primary)" }}><small>Time</small>2:25</span>
            <span style={{ background: "var(--accent-yellow)" }}><small>Rewards</small>40</span>
          </div>
        </motion.div>

        <motion.div className="apty-card apty-card--says" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, ease }}>
          <Image src={A("apty-avatar.png")} alt="" width={36} height={36} />
          <span>
            <small>Apty says</small>
            <strong>Fantastic! You’re so good at this!</strong>
          </span>
        </motion.div>

        <div className="apty-intro-phone">
          <div className="apty-intro-tags">
            <Pill variant="navy">Education</Pill>
            <Pill>AI Tutor</Pill>
            <Pill>iOS &amp; Android</Pill>
          </div>
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }}>
            <Image src={A("intro-visual.png")} alt="AptyRead My Courses screen on a phone" width={1012} height={784} sizes="(max-width: 809px) 100vw, 506px" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Closing section (Figma node "Closing"). */
export function AptyClosing() {
  const phones = [
    { src: "phone-splash.png", w: 609, h: 1085, r: -8, y: 40 },
    { src: "phone-home.png", w: 670, h: 1205, r: 0, y: 0 },
    { src: "phone-complete.png", w: 609, h: 1085, r: 8, y: 40 },
  ];
  return (
    <div className="apty-closing">
      <motion.h2 className="ds-title" style={{ fontSize: "var(--fs-h1)" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
        Learning that feels like play.
      </motion.h2>
      <motion.p className="ds-lead" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease }}>
        AptyRead turns reading practice into a short, voice-led adventure for children — and gives parents a clear, calm view of
        the progress behind it.
      </motion.p>
      <div className="apty-closing-phones">
        {phones.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 120, rotate: 0 }}
            whileInView={{ opacity: 1, y: p.y, rotate: p.r }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 90, damping: 16 }}
            whileHover={{ y: p.y - 16, rotate: 0 }}
          >
            <Image src={A(p.src)} alt="" width={p.w} height={p.h} sizes="330px" />
          </motion.div>
        ))}
      </div>
      <motion.span className="ds-pill ds-pill--navy apty-thanks" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9, type: "spring", stiffness: 220, damping: 12 }}>
        Thank you
      </motion.span>
    </div>
  );
}
