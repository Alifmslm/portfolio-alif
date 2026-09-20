"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";
import ImageCarousel from "./ImageCarousel";
import styles from "./Experience.module.css";

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef(0);

  const handleToggle = (id: string) => {
    const closing = openId === id;
    seqRef.current += 1;
    const seq = seqRef.current;
    if (spacerRef.current) spacerRef.current.style.height = "0px";
    setOpenId(closing ? null : id);
    if (!closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Freeze total page height while the row collapses, so the browser
    // never clamps mid-animation and the header stays put.
    const holdH =
      document.getElementById(`${id}-body`)?.offsetHeight ?? 0;
    if (spacerRef.current) spacerRef.current.style.height = `${holdH}px`;

    // Release the hold once collapse finishes. No scrolling, no glide —
    // from here the page simply settles on its own.
    window.setTimeout(() => {
      if (seqRef.current !== seq) return;
      if (spacerRef.current) spacerRef.current.style.height = "0px";
      window.dispatchEvent(new Event("scroll"));
    }, 260);
  };

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
              onClick={() => handleToggle(exp.id)}
            >
              <span className={styles.headerMain}>
                <span className={styles.title}>
                  <span className={styles.company}>{exp.company}</span>
                  <span className={styles.slash} aria-hidden="true">
                    {" / "}
                  </span>
                  <span className={styles.role}>{exp.role}</span>
                </span>
                <span className={styles.period}>{exp.period}</span>
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`${exp.id}-body`}
              className={`${styles.collapse} ${open ? styles.collapseOpen : ""}`}
            >
              <div className={styles.collapseInner}>
                <div className={styles.body}>
                    <p className={styles.description}>{exp.shortDescription}</p>
                    {exp.images.length > 0 && (
                      <ImageCarousel
                        images={exp.images}
                        label={`${exp.company} ${exp.role} images`}
                      />
                    )}
                    <div className={styles.stats}>
                      {exp.metrics.map((metric) => (
                        <div
                          key={metric.label + metric.value}
                          className={styles.stat}
                        >
                          <div className={styles.statValue}>{metric.value}</div>
                          <div className={styles.statLabel}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                    <h3 className={styles.highlightsLabel}>Highlights</h3>
                    <ul className={styles.highlights}>
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    {exp.caseStudies.length > 0 && (
                      <div className={styles.caseLinks}>
                        {exp.caseStudies.map((cs) => (
                          <a
                            key={cs.projectId}
                            href={cs.url}
                            className={styles.caseLink}
                          >
                            <span>{cs.label}</span>
                            <ArrowUpRight
                              size={14}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
          </div>
        );
      })}
      <div ref={spacerRef} style={{ height: 0 }} aria-hidden="true" />
    </section>
  );
}
