"use client";

import { motion } from "motion/react";
import { Profile } from "@/lib/data";
import Pill from "./Pill";
import styles from "./Sidebar.module.css";

export default function Sidebar({ profile }: { profile: Profile }) {
  return (
    <aside className={styles.sidebar}>
      <motion.div
        className={styles.avatar}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
      >
        <img src={profile.avatar} alt={profile.name} />
      </motion.div>

      <div className={styles.identity}>
        <h1>{profile.name}</h1>
        <p>{profile.tagline}</p>
      </div>

      <p className={styles.bio}>{profile.bio}</p>

      <div className="pill-row">
        {profile.socials.map((social) => (
          <Pill key={social.label} href={social.href} asLink>
            {social.label}
          </Pill>
        ))}
      </div>
    </aside>
  );
}
