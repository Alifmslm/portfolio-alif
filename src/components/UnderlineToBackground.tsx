"use client";

import { ElementType, useEffect, useMemo, useRef } from "react";
import { motion, ValueAnimationTransition } from "motion/react";
import styles from "./UnderlineToBackground.module.css";

interface UnderlineToBackgroundProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  transition?: ValueAnimationTransition;
  targetTextColor?: string;
  underlineHeightRatio?: number;
  underlinePaddingRatio?: number;
}

const UnderlineToBackground = ({
  children,
  as,
  className,
  transition = { type: "spring", damping: 30, stiffness: 300 },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  targetTextColor = "#ffffff",
  ...props
}: UnderlineToBackgroundProps) => {
  const textRef = useRef<HTMLElement | null>(null);

  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as]);

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize);
        const underlineHeight = fontSize * underlineHeightRatio;
        const underlinePadding = fontSize * underlinePaddingRatio;
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        );
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        );
      }
    };

    updateUnderlineStyles();
    window.addEventListener("resize", updateUnderlineStyles);

    return () => window.removeEventListener("resize", updateUnderlineStyles);
  }, [underlineHeightRatio, underlinePaddingRatio]);

  const underlineVariants = {
    initial: {
      height: "var(--underline-height)",
    },
    target: {
      height: "100%",
      transition,
    },
  };

  const textVariants = {
    initial: {
      color: "currentColor",
    },
    target: {
      color: targetTextColor,
      transition,
    },
  };

  return (
    <MotionComponent
      className={`${styles.root} ${className ?? ""}`}
      whileHover="target"
      ref={textRef}
      {...props}
    >
      <motion.div
        className={styles.underline}
        style={{
          height: "var(--underline-height)",
          bottom: "calc(-1 * var(--underline-padding))",
        }}
        variants={underlineVariants}
        aria-hidden="true"
      />
      <motion.span variants={textVariants} className={styles.text}>
        {children}
      </motion.span>
    </MotionComponent>
  );
};

UnderlineToBackground.displayName = "UnderlineToBackground";

export default UnderlineToBackground;