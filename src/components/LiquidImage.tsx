"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import styles from "./LiquidImage.module.css";
import { railVelocity } from "@/lib/liquid";

interface LiquidImageProps {
  src?: string;
  alt: string;
  /** Drift factor for staggered parallax. Vary per image for liquid lag. */
  drift?: number;
  /** Aspect ratio CSS value, e.g. "4 / 3", "3 / 4" */
  aspect?: string;
  /** Grey placeholder instead of an image */
  placeholder?: boolean;
  placeholderLabel?: string;
  /** Show the real image at its natural ratio — never cropped. */
  natural?: boolean;
  caption?: string;
  captionAlign?: "center" | "left";
  className?: string;
}

/**
 * Velocity-driven liquid frame.
 * Scroll velocity -> spring -> skew + volume-preserving stretch.
 * Only transform animates (GPU cheap).
 */
export default function LiquidImage({
  src,
  alt,
  drift = 1,
  aspect = "4 / 3",
  placeholder = false,
  placeholderLabel = "Additional image — placeholder",
  natural = false,
  caption,
  captionAlign = "center",
  className = "",
}: LiquidImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Global scroll velocity shared conceptually across all frames.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, {
    stiffness: 140,
    damping: 28,
    mass: 0.6,
  });
  // Shared motion value (idle now that the feed scrolls vertically).
  const railSmooth = useSpring(railVelocity, {
    stiffness: 140,
    damping: 28,
    mass: 0.6,
  });
  // Combined drive: vertical page scroll + shared rail value.
  const total = useTransform([smooth, railSmooth], (vs: number[]) => vs[0] + vs[1]);

  // Liquid bend on the horizontal axis: skew against travel direction, clamped.
  const skew = useTransform(total, [-2800, 2800], [-5, 5]);
  // Liquid stretch with volume preservation (Y stretches, X squeezes).
  const stretchY = useTransform(total, (v) => 1 + Math.min(Math.abs(v) / 7000, 0.07));
  const stretchX = useTransform(stretchY, (s) => 1 - (s - 1) * 0.6);

  // Staggered horizontal lag so neighbouring frames drift differently (liquid feel).
  // Vertical page scroll drives lateral offset per frame.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const parallaxX = useTransform(scrollYProgress, [0, 1], [30 * drift, -30 * drift]);

  // Full transform string = hardware accelerated (no x/y/scale shorthands).
  const frameTransform = useMotionTemplate`translate3d(${parallaxX}, 0px, 0px) skewX(${skew}deg) scale(${stretchX}, ${stretchY})`;

  const calm = !!reduce;

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className}`}>
      <motion.div
        className={styles.frame}
        style={
          calm
            ? undefined
            : {
                transform: frameTransform,
              }
        }
      >
        {placeholder || !src ? (
          <div className={styles.placeholder} style={{ aspectRatio: aspect }} aria-label={alt}>
            <span className={styles.placeholderLabel}>{placeholderLabel}</span>
          </div>
        ) : natural ? (
          <span className={styles.bare}>
            <img src={src} alt={alt} className={`${styles.img} ${styles.imgMain}`} draggable={false} />
          </span>
        ) : (
          <div className={styles.media} style={{ aspectRatio: aspect }}>
            <img src={src} alt={alt} className={styles.img} draggable={false} />
          </div>
        )}
      </motion.div>
      {caption && (
        <p
          className={styles.caption}
          style={{ textAlign: captionAlign }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
