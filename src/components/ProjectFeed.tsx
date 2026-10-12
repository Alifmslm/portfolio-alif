"use client";

import { motion } from "motion/react";
import { Project } from "@/lib/data";
import LiquidImage from "./LiquidImage";
import styles from "./ProjectFeed.module.css";

export default function ProjectFeed({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.feed}>
      {projects.map((project, i) => (
        <motion.article
          key={project.id}
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <LiquidImage
            src={project.cover}
            alt={project.title}
            aspect="4 / 3"
            drift={i % 2 === 0 ? 1 : -0.7}
          />
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.role}>{project.type}</p>
        </motion.article>
      ))}
    </section>
  );
}
