"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import styles from "./SectionTabs.module.css";

export type Section = "work" | "about";

const OPTIONS: { value: Section; label: string }[] = [
  { value: "work", label: "Work" },
  { value: "about", label: "About" },
];

interface SectionTabsProps {
  value: Section;
  onChange: (section: Section) => void;
}

export default function SectionTabs({ value, onChange }: SectionTabsProps) {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const mounted = useRef(false);
  const index = Math.max(
    0,
    OPTIONS.findIndex((option) => option.value === value),
  );

  useEffect(() => {
    // Skip the entrance — the thumb starts in place.
    if (!mounted.current) {
      mounted.current = true;
      controls.set({ x: index === 0 ? "0%" : "100%", scaleX: 1 });
      return;
    }
    if (reduce) {
      controls.set({ x: index === 0 ? "0%" : "100%", scaleX: 1 });
      return;
    }
    // Jelly travel: springed slide with a mid-flight stretch pulse.
    controls.start({
      x: index === 0 ? "0%" : "100%",
      scaleX: [1, 1.28, 1],
      transition: {
        x: { type: "spring", stiffness: 480, damping: 34 },
        scaleX: { duration: 0.36, times: [0, 0.45, 1], ease: "easeInOut" },
      },
    });
  }, [index, reduce, controls]);

  return (
    <div className={styles.track} role="tablist" aria-label="Sections">
      <motion.span
        className={styles.thumb}
        initial={false}
        animate={controls}
        aria-hidden="true"
      />
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          className={`${styles.option} ${
            value === option.value ? styles.optionActive : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
