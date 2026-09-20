"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";
import ImageCarousel from "./ImageCarousel";
import styles from "./Experience.module.css";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={styles.section} aria-label="Experience">
      <h2 className={styles.heading}>Experience</h2>
      {experiences.map((exp) => {
        const open = exp.id === openId;
        return (
          <div key={exp.id} className={styles.item}>
            <button
              type="button"
              className={styles.header}
              aria-expanded={open}
              aria-controls={`${exp.id}-body`}
              onClick={() => setOpenId(open ? null : exp.id)}
            >
              <span className={styles.period}>{exp.period}</span>
              <span className={styles.title}>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.slash} aria-hidden="true">
                  {" / "}
                </span>
                <span className={styles.role}>{exp.role}</span>
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  id={`${exp.id}-body`}
                  className={styles.collapse}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className={styles.body}>
                    <p className={styles.description}>{exp.description}</p>
                    {exp.images.length > 0 && (
                      <ImageCarousel
                        images={exp.images}
                        label={`${exp.company} ${exp.role} images`}
                      />
                    )}
                    <div className={styles.stats}>
                      {exp.stats.map((stat) => (
                        <div key={stat.label + stat.value} className={styles.stat}>
                          <div className={styles.statValue}>{stat.value}</div>
                          <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <h3 className={styles.highlightsLabel}>Highlights</h3>
                    <ul className={styles.highlights}>
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    {exp.caseStudy && (
                      <a href={exp.caseStudy.href} className={styles.caseLink}>
                        <span>{exp.caseStudy.label}</span>
                        <ArrowUpRight
                          size={14}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
