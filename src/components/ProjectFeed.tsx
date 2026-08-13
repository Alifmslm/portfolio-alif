"use client";

import { motion } from "motion/react";
import { Project } from "@/lib/data";
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

          <div className={styles.copy}>
            <h2 className={styles.title}>{project.title}</h2>

            <p className={styles.description}>{project.description}</p>
          </div>

          <div className={styles.meta}>
            <span className={styles.metaItem}>{project.company}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span className={styles.metaItem}>{project.type}</span>
            <span className={styles.separator} aria-hidden="true" />
            <span className={styles.status}>
              <span
                className={`${styles.statusDot} ${
                  project.status === "Shipped"
                    ? styles.shippedDot
                    : styles.exploringDot
                }`}
                aria-hidden="true"
              />
              <span
                className={
                  project.status === "Shipped"
                    ? styles.shippedText
                    : styles.exploringText
                }
              >
                {project.status}
              </span>
            </span>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
