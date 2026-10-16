"use client";

import Link from "next/link";
import { motion } from "motion/react";
import styles from "./Pill.module.css";

type PillProps = {
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
  onClick?: () => void;
  active?: boolean;
};

export default function Pill({ children, asLink, href, onClick, active }: PillProps) {
  const motionProps = {
    className: active ? `${styles.pill} ${styles.active}` : styles.pill,
    whileHover: {
      scale: 1.04,
      backgroundColor: "var(--pill-hover-bg)",
      color: "var(--pill-hover-fg)",
      borderColor: "var(--pill-hover-bg)",
    },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.18 },
  } as const;

  if (asLink && href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a {...motionProps}>{children}</motion.a>
      </Link>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} aria-pressed={active} {...motionProps}>
      {children}
    </motion.button>
  );
}
