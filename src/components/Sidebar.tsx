"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Profile } from "@/lib/data";
import UnderlineToBackground from "./UnderlineToBackground";
import Experience from "./Experience";
import styles from "./Sidebar.module.css";

export default function Sidebar({ profile }: { profile: Profile }) {
  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.identity}>
        <div className={styles.orb} aria-hidden="true" />
        <h1 className={styles.name}>Alif Muslim</h1>
        <p className={styles.roleTitle}>Product Engineer</p>
      </div>
      
      <div style={{whiteSpace: "pre-line"}}>
        <p className={styles.bio}>{profile.bio}</p>
      </div>

      <p className={styles.socials}>
        Find me on{" "}
        {profile.socials.map((social, i) => (
          <Fragment key={social.label}>
            {i > 0 && <span aria-hidden="true">, </span>}
            <UnderlineToBackground
              as="a"
              href={social.href}
              targetTextColor="#ffffff"
              underlineHeightRatio={0.14}
              className={styles.socialLink}
            >
              {social.label.toLowerCase()}
            </UnderlineToBackground>
          </Fragment>
        ))}
      </p>

      <Experience />
    </motion.aside>
  );
}
