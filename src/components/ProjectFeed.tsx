import { useEffect } from "react";
import { ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { Project } from "@/lib/data";
import styles from "./ProjectFeed.module.css";

const SLIDE_VIEWS = 3;

// Projects with a live case-study page behind the button.
const OPENABLE_IDS = new Set(["project-one", "project-two", "project-four"]);

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
          <div className={styles.row}>
            <div className={styles.textBlock}>
              <header className={styles.header}>
                <p className={styles.statusRow}>
                  <span
                    className={`${styles.status} ${
                      project.status === "Shipped"
                        ? styles.shipped
                        : styles.exploration
                    }`}
                  >
                    <span className={styles.statusDot} aria-hidden="true" />
                    {project.status}
                  </span>
                </p>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.subheading}>
                  {project.company} · {project.type}
                </p>
              </header>
              <p className={styles.blurb}>{project.blurb}</p>
              {OPENABLE_IDS.has(project.id) && (
                <p className={styles.openRow}>
                  <a
                    className={styles.openButton}
                    href={`/projects/${project.id}`}
                  >
                    open project
                    <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                  </a>
                </p>
              )}
            </div>
            <div
              className={styles.carousel}
              role="region"
              aria-roledescription="carousel"
              aria-label={`${project.title} media`}
            >
              <div className={styles.track}>
                {Array.from({ length: SLIDE_VIEWS }, (_, s) => (
                  <div key={`view-${s}`} className={styles.slidePlaceholder}>
                    <ImageIcon
                      size={24}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className={styles.placeholderIcon}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
