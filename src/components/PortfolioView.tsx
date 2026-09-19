"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Profile, Project } from "@/lib/data";
import Sidebar from "./Sidebar";
import ProjectFeed from "./ProjectFeed";
import ViewToggle, { ViewId } from "./ViewToggle";
import styles from "../app/page.module.css";

interface PortfolioViewProps {
  profile: Profile;
  projects: Project[];
}

export default function PortfolioView({ profile, projects }: PortfolioViewProps) {
  const [view, setView] = useState<ViewId>("about");
  const [atBottom, setAtBottom] = useState(false);

  const handleChange = (next: ViewId) => {
    if (next === view) return;
    setView(next);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (view !== "work") return;
    const onScroll = () => {
      setAtBottom(
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 24
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [view]);

  return (
    <div className={styles.shell}>
      <div className={styles.toggleRow}>
        <ViewToggle value={view} onChange={handleChange} />
      </div>
      <div className={styles.view}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={view}
            className={styles.viewPanel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {view === "work" ? (
              <ProjectFeed projects={projects} />
            ) : (
              <div className={styles.aboutWrap}>
                <Sidebar profile={profile} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {view === "work" && (
        <div
          className={`${styles.bottomFade} ${atBottom ? styles.bottomFadeHidden : ""}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
