"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Profile, Project } from "@/lib/data";
import Sidebar from "./Sidebar";
import ProjectFeed from "./ProjectFeed";
import AboutPanel from "./AboutPanel";
import SectionTabs, { Section } from "./SectionTabs";
import styles from "../app/page.module.css";

interface PortfolioViewProps {
  profile: Profile;
  projects: Project[];
}

export default function PortfolioView({ profile, projects }: PortfolioViewProps) {
  const [section, setSection] = useState<Section>("work");
  const reduce = useReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  // Entering panel slides in from the side of its tab — no exit
  // animation, so rapid toggles never queue or flash.
  const entering = firstRender.current
    ? false
    : reduce
      ? { opacity: 0 }
      : {
          opacity: 0,
          transform: `translateX(${section === "about" ? 24 : -24}px)`,
        };

  return (
    <main className={styles.layout}>
      <Sidebar profile={profile} />
      <div className={styles.main}>
        <SectionTabs value={section} onChange={setSection} />
        <motion.div
          key={section}
          className={styles.panel}
          initial={entering}
          animate={{ opacity: 1, transform: "translateX(0px)" }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          {section === "work" ? (
            <ProjectFeed projects={projects} />
          ) : (
            <AboutPanel />
          )}
        </motion.div>
      </div>
    </main>
  );
}
