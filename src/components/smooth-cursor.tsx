"use client";

import { useEffect, useRef, useState } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const HIDE_SELECTOR =
  "a, button, [role='button'], [data-cursor-hide], input, textarea, select";

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const prevRef = useRef({ x: 0, y: 0 });
  const velocityScaleRef = useRef(1);
  const clickScaleRef = useRef(1);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetRef.current = { x: centerX, y: centerY };
    posRef.current = { x: centerX, y: centerY };
    prevRef.current = { x: centerX, y: centerY };

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      const el = e.target as Element | null;
      setHidden(el != null && el.closest(HIDE_SELECTOR) != null);
    };

    const onDown = () => {
      clickScaleRef.current = 0.75;
    };

    const onUp = () => {
      clickScaleRef.current = 1.3;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

      const dx = posRef.current.x - prevRef.current.x;
      const dy = posRef.current.y - prevRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      const targetVelocityScale = 1 + Math.min(velocity / 40, 0.45);
      velocityScaleRef.current = lerp(
        velocityScaleRef.current,
        targetVelocityScale,
        0.22
      );
      clickScaleRef.current = lerp(clickScaleRef.current, 1, 0.18);

      const scale = velocityScaleRef.current * clickScaleRef.current;

      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) scale(${scale})`;

      prevRef.current = { x: posRef.current.x, y: posRef.current.y };

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`smooth-cursor${hidden ? " smooth-cursor--hidden" : ""}`}
      aria-hidden="true"
    />
  );
}