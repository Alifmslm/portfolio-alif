"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { experiences, projects } from "@/lib/data";
import styles from "./Experience.module.css";

const PREVIEW_W = 340;
const PREVIEW_GAP = 24;

function getPreviewSrcs(expId: string): string[] {
  const exp = experiences.find((e) => e.id === expId);
  if (!exp || exp.caseStudies.length === 0) return [];
  // All project covers linked to this organization.
  // e.g. Momentree → project-one + project-three.
  return exp.caseStudies
    .map((cs) => projects.find((p) => p.id === cs.projectId)?.cover)
    .filter((src): src is string => Boolean(src));
}

function hasPreview(expId: string) {
  return getPreviewSrcs(expId).length > 0;
}

export default function Experience() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const [canHover, setCanHover] = useState(false);
  const reduceMotion = useReducedMotion();

  const placeBesideOrg = (id: string) => {
    const el = document.querySelector(`[data-hover-preview="${id}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(
      r.right + PREVIEW_GAP,
      window.innerWidth - PREVIEW_W - 16,
    );
    // Vertically centered on the org name; the panel offsets itself
    // upward by half its own height via translateY(-50%).
    const center = r.top + r.height / 2;
    const edge = 170;
    const y = Math.min(
      Math.max(center, edge),
      Math.max(edge, window.innerHeight - edge),
    );
    setAnchor({ x, y });
  };

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!canHover) return;
    experiences.forEach((exp) => {
      getPreviewSrcs(exp.id).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [canHover]);

  // Reset cycle whenever the hovered org changes.
  useEffect(() => {
    setPreviewIndex(0);
    if (activeId) placeBesideOrg(activeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Keep it glued beside the org name on scroll / resize.
  useEffect(() => {
    if (!canHover || !activeId) return;
    const update = () => placeBesideOrg(activeId);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canHover, activeId]);

  const activeSrcs = activeId ? getPreviewSrcs(activeId) : [];
  const activeSrc = activeSrcs[previewIndex] ?? activeSrcs[0] ?? "";

  // Auto-cycle through every linked project while hovering.
  useEffect(() => {
    if (!canHover || !activeId || activeSrcs.length < 2 || reduceMotion)
      return;
    const t = setInterval(() => {
      setPreviewIndex((i) => (i + 1) % activeSrcs.length);
    }, 1500);
    return () => clearInterval(t);
  }, [canHover, activeId, activeSrcs.length, reduceMotion]);

  const clearIfActive = (id: string) =>
    setActiveId((cur) => (cur === id ? null : cur));

  const anchorBeside = (target: HTMLElement) => {
    const r = target.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const edge = 170;
    setAnchor({
      x: Math.min(
        r.right + PREVIEW_GAP,
        window.innerWidth - PREVIEW_W - 16,
      ),
      y: Math.min(
        Math.max(center, edge),
        Math.max(edge, window.innerHeight - edge),
      ),
    });
  };

  return (
    <section className={styles.section} aria-label="Experience">
      <h2 className={styles.heading}>Experience</h2>
      <ul className={styles.list}>
        {experiences.map((exp) => {
          const previewable = hasPreview(exp.id);
          return (
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
                  <span
                    className={`${styles.company} ${previewable ? "" : styles.companyNoPreview}`}
                    data-hover-preview={previewable ? exp.id : undefined}
                    onMouseEnter={(e) => {
                      if (!(canHover && previewable)) return;
                      setActiveId(exp.id);
                      anchorBeside(e.currentTarget);
                    }}
                    onMouseLeave={() => clearIfActive(exp.id)}
                    onFocus={(e) => {
                      if (!(canHover && previewable)) return;
                      setActiveId(exp.id);
                      anchorBeside(e.currentTarget);
                    }}
                    onBlur={() => clearIfActive(exp.id)}
                    tabIndex={previewable ? 0 : -1}
                  >
                    {exp.company}
                  </span>
                </span>
                <span className={styles.meta}>
                  {exp.location && (
                    <span className={styles.location}>{exp.location}</span>
                  )}
                  <span>{exp.period}</span>
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      {canHover &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeId && activeSrc && anchor && (
              <div
                key={activeId}
                className={styles.preview}
                style={{ left: anchor.x, top: anchor.y }}
                aria-hidden="true"
              >
                <motion.div
                  className={styles.previewMedia}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "scale(0.97)" }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, transform: "scale(1)" }
                  }
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "scale(0.97)" }
                  }
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                      key={activeSrc}
                      src={activeSrc}
                      alt=""
                      className={styles.previewImg}
                      draggable={false}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
