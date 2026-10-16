import { Project } from "@/lib/data";
import styles from "./ProjectFeed.module.css";

export default function ProjectFeed({ projects }: { projects: Project[] }) {
  return (
    <section className={styles.feed}>
      {projects.map((project) => (
        <article key={project.id} className={styles.card}>
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
