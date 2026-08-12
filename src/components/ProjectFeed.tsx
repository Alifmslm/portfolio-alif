"use client";

import { motion } from "motion/react";
import { Project } from "@/lib/data";
import Pill from "./Pill";
import styles from "./ProjectFeed.module.css";

export default function ProjectFeed({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.feed}>
      {projects.map((project) => (
        <motion.article
          key={project.id}
          className={styles.card}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <motion.div
            className={styles.cover}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <img src={project.cover} alt={project.title} />
          </motion.div>

          <h2 className={styles.title}>{project.title}</h2>

          <div className="pill-row">
            <Pill>{project.company}</Pill>
            <Pill>{project.type}</Pill>
            <Pill>{project.status}</Pill>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
