"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Project } from "@/lib/data";
import { railVelocity } from "@/lib/liquid";
import LiquidImage from "./LiquidImage";
import styles from "./ProjectFeed.module.css";

interface LoopProject extends Project {
  loopKey: string;
  ghost: boolean;
}

export default function ProjectFeed({ projects }: { projects: Project[] }) {
  const feedRef = useRef<HTMLElement>(null);
  const lastLeft = useRef(0);
  const lastTime = useRef(0);
  const vel = useRef(0);
  const endTimer = useRef(0);
  const ignoreNext = useRef(false);

  // Tripled track for a seamless infinite loop (middle copy is home).
  const looped: LoopProject[] = [0, 1, 2].flatMap((n) =>
    projects.map((p) => ({ ...p, loopKey: `${p.id}-loop${n}`, ghost: n !== 1 }))
  );

  useEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const center = () => {
      const third = el.scrollWidth / 3;
      if (third > 0) {
        ignoreNext.current = true;
        el.scrollLeft = third;
        lastLeft.current = third;
        lastTime.current = performance.now();
      }
    };
    center();
    // Images load async and resize the track — recenter once settled.
    const settle = window.setTimeout(center, 600);
    window.addEventListener("load", center);

    let raf = 0;
    const onScroll = () => {
      const now = performance.now();
      if (ignoreNext.current) {
        ignoreNext.current = false;
        lastLeft.current = el.scrollLeft;
        lastTime.current = now;
        return;
      }
      const dt = Math.max(now - (lastTime.current || now), 16);
      const v = ((el.scrollLeft - lastLeft.current) / dt) * 1000;
      lastLeft.current = el.scrollLeft;
      lastTime.current = now;
      vel.current += (v - vel.current) * 0.25;
      railVelocity.set(vel.current);
      window.clearTimeout(endTimer.current);
      endTimer.current = window.setTimeout(() => {
        vel.current = 0;
        railVelocity.set(0);
      }, 140);

      // Seamless wrap: jump exactly one set width, invisible (sets identical).
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const third = el.scrollWidth / 3;
        if (third <= 0) return;
        if (el.scrollLeft <= 2) {
          ignoreNext.current = true;
          el.scrollLeft += third;
          lastLeft.current = el.scrollLeft;
          vel.current = 0;
          railVelocity.set(0);
        } else if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          ignoreNext.current = true;
          el.scrollLeft -= third;
          lastLeft.current = el.scrollLeft;
          vel.current = 0;
          railVelocity.set(0);
        }
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(endTimer.current);
      window.removeEventListener("load", center);
      window.clearTimeout(settle);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={feedRef} className={styles.feed}>
      {looped.map((project, i) => (
        <motion.article
          key={project.loopKey}
          aria-hidden={project.ghost || undefined}
          className={styles.card}
          initial={{ opacity: 0, transform: "translateX(16px)" }}
          whileInView={{ opacity: 1, transform: "translateX(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <LiquidImage
            src={project.cover}
            alt={project.title}
            aspect="4 / 3"
            drift={i % 2 === 0 ? 1 : -0.7}
          />
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.role}>{project.type}</p>
        </motion.article>
      ))}
    </section>
  );
}
