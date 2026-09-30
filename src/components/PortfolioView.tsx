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
  const [scrolled, setScrolled] = useState(false);

  const updateFadeVisibility = () => {
    const { scrollY, innerHeight } = window;
    const scrollHeight = document.documentElement.scrollHeight;
    setAtBottom(innerHeight + scrollY >= scrollHeight - 24);
    setScrolled(scrollY > 24);
  };

  const handleViewChange = (next: ViewId) => {
    if (next === view) return;
    // Reset scroll so the incoming view always starts at the top instead
    // of inheriting the previous view's scroll position.
    window.scrollTo(0, 0);
    setView(next);
  };

  useEffect(() => {
    updateFadeVisibility();
    window.addEventListener("scroll", updateFadeVisibility, { passive: true });
    window.addEventListener("resize", updateFadeVisibility);
    const ro = new ResizeObserver(updateFadeVisibility);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", updateFadeVisibility);
      window.removeEventListener("resize", updateFadeVisibility);
      ro.disconnect();
    };
  }, [view]);

  return (
    <div className={styles.shell}>
      <div className={styles.toggleRow}>
        <ViewToggle value={view} onChange={handleViewChange} />
      </div>
      <div className={styles.view}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className={styles.viewPanel}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: -6,
              filter: "blur(2px)",
              transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] },
            }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            onAnimationComplete={updateFadeVisibility}
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
        <>
          <div
            className={`${styles.bottomFade} ${atBottom ? styles.bottomFadeHidden : ""}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.topFade} ${scrolled ? "" : styles.topFadeHidden}`}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
