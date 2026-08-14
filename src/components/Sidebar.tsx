"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Profile } from "@/lib/data";
import UnderlineToBackground from "./UnderlineToBackground";
import TextType from "./TextType";
import styles from "./Sidebar.module.css";

const greetings = [
  "Nice to Meet You",
  "Senang Bertemu denganmu",
  "आपसे मिलकर खुशी हुई",
  "Schön, dich kennenzulernen",
  "سعيد بلقائك",
  "很高兴认识你",
  "Приятно познакомиться",
  "はじめまして",
];

export default function Sidebar({ profile }: { profile: Profile }) {
  return (
    <motion.aside
      className={styles.sidebar}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.avatar}>
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={767}
          height={767}
          priority
        />
      </div>

<div className={styles.identity}>
        <TextType
          className={styles.text_animate}
          text={greetings}
          as="h1"
          aria-label={greetings[0]}
          typingSpeed={60}
          deletingSpeed={28}
          pauseDuration={2600}
          cursorCharacter="..."
        />
        <h1 className={styles.tagline}>{profile.tagline}</h1>
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
    </motion.aside>
  );
}
