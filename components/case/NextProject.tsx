"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/ui";
import type { Project } from "@/lib/data";

export default function NextProject({ project }: { project: Project }) {
  return (
    <Section tone="primary" rings="b">
      <Link href={`/portfolio/${project.slug}`} className="next-project">
        <div>
          <span className="ds-eyebrow ds-eyebrow--white">Next project</span>
          <h2 className="ds-title" style={{ marginTop: 20 }}>{project.title}</h2>
          <span className="ds-btn ds-btn--white" style={{ marginTop: 28 }}>
            View case study <span className="ds-btn-icon">→</span>
          </span>
        </div>
        <motion.div className="next-project-media" whileHover={{ rotate: -2, scale: 1.03 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
          <Image src={project.cover} alt="" width={1200} height={800} sizes="(max-width: 809px) 100vw, 560px" />
        </motion.div>
      </Link>
    </Section>
  );
}
