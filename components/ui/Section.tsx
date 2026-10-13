"use client";

import { motion } from "framer-motion";
import { ease } from "@/components/motion";
import Rings from "./Rings";

export type SectionTone = "white" | "surface" | "soft" | "blue" | "periwinkle" | "primary" | "navy";

/** Rounded 48px panel — the base layout unit of every page. */
export default function Section({
  tone = "surface",
  rings = false,
  id,
  className = "",
  children,
  decor,
}: {
  tone?: SectionTone;
  rings?: boolean | "a" | "b";
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Absolutely-positioned decoration (sparkles, mascot) rendered above the rings. */
  decor?: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={`ds-section ds-section--${tone} ${className}`}
      initial={{ opacity: 0, y: 48, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
    >
      {rings && <Rings only={rings === true ? undefined : rings} />}
      {decor}
      <div className="ds-section-inner">{children}</div>
    </motion.section>
  );
}
