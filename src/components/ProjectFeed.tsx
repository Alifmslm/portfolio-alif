import { useEffect } from "react";
import { Project } from "@/lib/data";
import styles from "./ProjectFeed.module.css";

// Entrance stagger plays once per session (first site open) — tab
// switches reuse the panel slide instead of replaying the stagger.
let feedEntered = false;

export default function ProjectFeed({ projects }: { projects: Project[] }) {
  const playEntrance = !feedEntered;

  useEffect(() => {
    feedEntered = true;
  }, []);

  return (
    <section className={styles.feed}>
      {projects.map((project, i) => (
        <article
          key={project.id}
          className={`${styles.card} ${playEntrance ? styles.cardEnter : ""}`}
          style={playEntrance ? { animationDelay: `${300 + i * 50}ms` } : undefined}
        >
          <span className={styles.media}>
            <img
              src={project.cover}
              alt={project.title}
              className={styles.cover}
              draggable={false}
            />
          </span>
          <div className={styles.info}>
            <h2 className={styles.title}>{project.title}</h2>
            <p className={styles.role}>{project.type}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
