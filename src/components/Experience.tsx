import { experiences } from "@/lib/data";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section className={styles.section} aria-label="Experience">
      <h2 className={styles.heading}>Experience</h2>
      <ul className={styles.list}>
        {experiences.map((exp) => (
          <li key={exp.id} className={styles.item}>
            <span
              className={styles.logo}
              aria-hidden="true"
              style={exp.logoBg ? { background: exp.logoBg } : {}}
            >
              {exp.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={exp.logoSrc}
                  alt=""
                  className={`${styles.logoImg} ${exp.logoFit === "contain" ? styles.logoImgContain : ""}`}
                  style={{
                    ...(exp.logoScale
                      ? { transform: `scale(${exp.logoScale})` }
                      : {}),
                    ...(exp.logoBg ? { background: exp.logoBg } : {}),
                  }}
                  loading="lazy"
                />
              ) : (
                exp.company.charAt(0)
              )}
            </span>
            <span className={styles.text}>
              <span className={styles.title}>
                <span className={styles.role}>{exp.role}</span>
                <span className={styles.at} aria-hidden="true">
                  {" at "}
                </span>
                <span className={styles.company}>{exp.company}</span>
              </span>
              <span className={styles.meta}>
                {exp.location && (
                  <span className={styles.location}>{exp.location}</span>
                )}
                <span>{exp.period}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
