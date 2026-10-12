"use client";

import { Profile, Project } from "@/lib/data";
import Sidebar from "./Sidebar";
import ProjectFeed from "./ProjectFeed";
import styles from "../app/page.module.css";

interface PortfolioViewProps {
  profile: Profile;
  projects: Project[];
}

export default function PortfolioView({ profile, projects }: PortfolioViewProps) {
  return (
    <main className={styles.layout}>
      <Sidebar profile={profile} />
      <ProjectFeed projects={projects} />
    </main>
  );
}
