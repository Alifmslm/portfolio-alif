"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { experiences, type Experience as ExperienceData } from "@/lib/data";
import ImageCarousel from "./ImageCarousel";
import styles from "./Experience.module.css";

const PIN_OFFSET = 112;
// Dropdown band (150-250ms): open 220ms, close 160ms (exit faster than
// enter). ease-out both ways — enter/exit, never ease-in-out.
const OPEN_MS = 220;
const CLOSE_MS = 160;
const FADE_IN_MS = 180;
const FADE_OUT_MS = 120;

function ExperienceItem({
  exp,
  open,
  onToggle,
}: {
  exp: ExperienceData;
  open: boolean;
  onToggle: () => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<number | "auto">(0);
  const [height, setHeight] = useState<number | "auto">(0);
  const [rendered, setRendered] = useState(open);

  const setH = (h: number | "auto") => {
    heightRef.current = h;
    setHeight(h);
  };

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (open) {
      setRendered(true);
      // Lock the full content height, then settle to auto so late-loading
      // images can still grow the box after the animation.
      setH(el.scrollHeight);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (boxRef.current) setH(boxRef.current.scrollHeight);
        }),
      );
      const t = setTimeout(() => setH("auto"), OPEN_MS + 50);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(t);
      };
    }
    // Closing: lock the current px height, then animate to exactly 0 —
    // no fractional grid tail, lands directly on the final state.
    const current =
      heightRef.current === "auto" ? el.scrollHeight : heightRef.current;
    setH(current);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setH(0)),
    );
    const t = setTimeout(() => setRendered(false), CLOSE_MS + 50);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [open ]);

  return (
    <div className={styles.item}>
      <button
        type="button"
        id={`${exp.id}-header`}
        className={styles.header}
        aria-expanded={open}
        aria-controls={`${exp.id}-body`}
        onClick={onToggle}
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
        ref={boxRef}
        className={styles.collapse}
        style={{
          height: height === "auto" ? "auto" : `${height}px`,
          visibility: rendered ? "visible" : "hidden",
          // Asymmetric slide within the dropdown band: 220ms open,
          // 160ms close, custom ease-out both ways.
          transition: `height ${open ? OPEN_MS : CLOSE_MS}ms var(--ease-out)`,
        }}
      >
        <div
          className={styles.collapseInner}
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity ${open ? FADE_IN_MS : FADE_OUT_MS}ms ease-out`,
          }}
        >
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
}

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);
  const seqRef = useRef(0);

  const pageTop = (el: HTMLElement) => {
    let y = 0;
    let node: HTMLElement | null = el;
    while (node) {
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return y;
  };

  const handleToggle = (id: string) => {
    const closing = openId === id;
    seqRef.current += 1;
    const seq = seqRef.current;
    if (closing) {
      setOpenId(null);
      return;
    }
    const header = document.getElementById(`${id}-header`);
    if (header) window.scrollTo(0, Math.max(0, pageTop(header) - PIN_OFFSET));
    setOpenId(id);
    const start = performance.now();
    const step = (now: number) => {
      if (seqRef.current !== seq) return;
      const node = document.getElementById(`${id}-header`);
      if (node) {
        const want = Math.max(0, pageTop(node) - PIN_OFFSET);
        if (window.scrollY !== want) window.scrollTo(0, want);
      }
      if (now - start < 500) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section className={styles.section} aria-label="Experience">
      <h2 className={styles.heading}>Experience</h2>
      {experiences.map((exp) => (
        <ExperienceItem
          key={exp.id}
          exp={exp}
          open={exp.id === openId}
          onToggle={() => handleToggle(exp.id)}
        />
      ))}
    </section>
  );
}
