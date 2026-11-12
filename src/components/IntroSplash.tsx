"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import styles from "./IntroSplash.module.css";

const STAGGER_MS = 70;
const HOLD_MS = 1000;
const EXIT_MS = 250;
const STORAGE_KEY = "intro-seen-v1";

const WORDS = ["Engineer", "with", "taste.", "Designer", "who", "ships."];

export default function IntroSplash() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    setLeaving((prev) => {
      if (prev) return prev;
      window.setTimeout(() => {
        setMounted(false);
        try {
          window.localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* storage unavailable — show again next visit */
        }
      }, EXIT_MS);
      return true;
    });
  }, []);

  // Sync check before paint: returning visitors never see the splash,
  // first-timers get it on the very first paint (no content flash).
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted || leaving) return;
    const total = WORDS.length * STAGGER_MS + HOLD_MS;
    const t = window.setTimeout(dismiss, total);
    return () => window.clearTimeout(t);
  }, [mounted, leaving, dismiss]);

  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted || leaving) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, leaving, dismiss]);

  if (!mounted) return null;

  return (
    <div
      className={`${styles.overlay} ${leaving ? styles.leaving : ""}`}
      onClick={dismiss}
      role="status"
      aria-label="Engineer with taste. Designer who ships."
    >
      <p className={styles.pill}>
        {WORDS.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={styles.word}
            style={{ animationDelay: `${i * STAGGER_MS}ms` }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
