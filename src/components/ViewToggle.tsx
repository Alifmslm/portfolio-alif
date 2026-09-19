"use client";

import { motion } from "motion/react";
import styles from "./ViewToggle.module.css";

export type ViewId = "work" | "about";

const SEGMENTS: { id: ViewId; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
];

interface ViewToggleProps {
  value: ViewId;
  onChange: (view: ViewId) => void;
}

export default function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className={styles.toggle} role="group" aria-label="Portfolio view">
      {SEGMENTS.map((segment) => {
        const active = segment.id === value;
        return (
          <button
            key={segment.id}
            type="button"
            className={`${styles.segment} ${active ? styles.active : ""}`}
            aria-pressed={active}
            onClick={() => onChange(segment.id)}
          >
            {active && (
              <motion.span
                layoutId="view-toggle-thumb"
                className={styles.thumb}
                transition={{ type: "spring", damping: 32, stiffness: 420 }}
              />
            )}
            <span className={styles.label}>{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
}
