"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Apty peeking into a section corner; waves on hover. */
export default function Mascot({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      className={`mascot mascot--${side}`}
      initial={{ opacity: 0, y: 60, rotate: side === "left" ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.3 }}
      whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
      aria-hidden
    >
      <Image src="/images/apty/apty-mascot.png" alt="" width={900} height={825} sizes="200px" className="ds-float ds-float--slow" />
    </motion.div>
  );
}
