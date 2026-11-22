"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./IntroSplash.module.css";

const STAGGER_MS = 70;
const WORD_MS = 300;
const HOLD_MS = 2500;
const EXIT_MS = 250;
const STORAGE_KEY = "intro-seen-v1";

const WORDS = ["Engineer", "with", "taste.", "Designer", "who", "ships."];

export default function IntroSplash() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const shownAtRef = useRef(0);

  const dismiss = useCallback(() => {
    setLeaving((prev) => (prev ? prev : true));
  }, []);

  const handleOverlayClick = useCallback(() => {
    // Ignore clicks while words are still rising. The most common one is the
    // user clicking the window to focus it right after reload — otherwise the
    // splash vanishes instantly and reads as the animation "crashing".
    const entranceMs = (WORDS.length - 1) * STAGGER_MS + WORD_MS;
    if (Date.now() - shownAtRef.current < entranceMs) return;
    dismiss();
  }, [dismiss]);

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
    if (mounted) shownAtRef.current = Date.now();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || leaving) return;
    const total = (WORDS.length - 1) * STAGGER_MS + WORD_MS + HOLD_MS;
    const t = window.setTimeout(dismiss, total);
    return () => window.clearTimeout(t);
  }, [mounted, leaving, dismiss]);

  // Unmount only after the fade-out finishes. Kept as its own effect so the
  // timeout never lives inside a state updater (impure there, and StrictMode
  // double-invokes updaters in dev, scheduling duplicate timeouts).
  useEffect(() => {
    if (!mounted || !leaving) return;
    const t = window.setTimeout(() => {
      setMounted(false);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable — show again next visit */
      }
    }, EXIT_MS);
    return () => window.clearTimeout(t);
  }, [mounted, leaving]);

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
      onClick={handleOverlayClick}
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
