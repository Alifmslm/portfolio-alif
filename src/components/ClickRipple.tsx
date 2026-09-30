"use client";

import { useEffect, useRef } from "react";
import styles from "./ClickRipple.module.css";

export default function ClickRipple() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spawn = (e: PointerEvent) => {
      // Left-click / primary touch only — no ripple on right-click.
      if (e.pointerType === "mouse" && e.button !== 0) return;
      const dot = document.createElement("span");
      dot.className = styles.ripple;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.addEventListener("animationend", () => dot.remove());
      // Safety net in case animationend never fires.
      setTimeout(() => dot.remove(), 500);
      layer.appendChild(dot);
    };

    window.addEventListener("pointerdown", spawn, { passive: true });
    return () => window.removeEventListener("pointerdown", spawn);
  }, []);

  return <div ref={layerRef} className={styles.layer} aria-hidden="true" />;
}
