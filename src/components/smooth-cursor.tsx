"use client";

import { useEffect, useRef, useState } from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const HIDE_SELECTOR =
  "a, button, [role='button'], [data-cursor-hide], input, textarea, select";

const LERP = 0.12;
const LAG_FACTOR = 0.4;
const MAX_OFFSET = 9;

export default function SmoothCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const prevPosRef = useRef({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    targetRef.current = { x: centerX, y: centerY };
    posRef.current = { x: centerX, y: centerY };
    prevPosRef.current = { x: centerX, y: centerY };

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      const el = e.target as Element | null;
      setHidden(el != null && el.closest(HIDE_SELECTOR) != null);
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, LERP);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, LERP);

      const vx = posRef.current.x - prevPosRef.current.x;
      const vy = posRef.current.y - prevPosRef.current.y;

      let ox = -vx * LAG_FACTOR;
      let oy = -vy * LAG_FACTOR;
      const mag = Math.sqrt(ox * ox + oy * oy);
      if (mag > MAX_OFFSET) {
        ox = (ox / mag) * MAX_OFFSET;
        oy = (oy / mag) * MAX_OFFSET;
      }

      ring.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      dot.style.transform = `translate(${ox}px, ${oy}px)`;

      prevPosRef.current = { x: posRef.current.x, y: posRef.current.y };

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className={`smooth-cursor${hidden ? " smooth-cursor--hidden" : ""}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="smooth-cursor-dot" />
    </div>
  );
}