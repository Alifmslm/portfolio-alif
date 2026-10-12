"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Project } from "@/lib/data";
import { railVelocity } from "@/lib/liquid";
import LiquidImage from "./LiquidImage";
import styles from "./ProjectFeed.module.css";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.figure
      className={className}
      initial={{ opacity: 0, transform: "translateX(16px)" }}
      whileInView={{ opacity: 1, transform: "translateX(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.28, ease: "easeOut", delay }}
    >
      {children}
    </motion.figure>
  );
}

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
      {looped.map((project) => {
        return (
          <motion.article
            key={project.loopKey}
            aria-hidden={project.ghost || undefined}
            className={styles.card}
            initial={{ opacity: 0, transform: "translateX(16px)" }}
            whileInView={{ opacity: 1, transform: "translateX(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {/* Same order every project: title → desc → images */}
            <div className={styles.titleCell}>
              <p className={styles.year}>{project.year}</p>
              <h2 className={styles.title}>{project.title}</h2>
            </div>
            <div className={styles.descCell}>
              <p className={styles.blurb}>{project.blurb}</p>
              <div className={styles.tags}>
                <span className={styles.metaItem}>{project.company}</span>
                <span className={styles.separator} aria-hidden="true" />
                <span className={styles.metaItem}>{project.type}</span>
                <span className={styles.separator} aria-hidden="true" />
                <span
                  className={
                    project.status === "Shipped"
                      ? styles.shippedText
                      : styles.exploringText
                  }
                >
                  {project.status}
                </span>
              </div>
            </div>
            <Reveal className={styles.hero} delay={0}>
              <LiquidImage
                src={project.cover}
                alt={project.title}
                drift={1}
                natural
              />
            </Reveal>
            <Reveal className={styles.tall} delay={0.06}>
              <LiquidImage
                alt={`${project.title} — additional view 1`}
                aspect="3 / 4"
                drift={-0.7}
                placeholder
              />
            </Reveal>
            <Reveal className={styles.small} delay={0.12}>
              <LiquidImage
                alt={`${project.title} — additional view 2`}
                aspect="1 / 1"
                drift={1.35}
                placeholder
                caption={project.smallCaption}
                captionAlign="center"
              />
            </Reveal>
            <Reveal className={styles.wide} delay={0.18}>
              <LiquidImage
                alt={`${project.title} — additional view 3`}
                aspect="16 / 10"
                drift={0.55}
                placeholder
              />
            </Reveal>
          </motion.article>
        );
      })}
    </section>
  );
}
