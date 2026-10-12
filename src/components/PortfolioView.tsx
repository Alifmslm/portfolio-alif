"use client";

import { Profile } from "@/lib/data";
import Sidebar from "./Sidebar";
import styles from "../app/page.module.css";

interface PortfolioViewProps {
  profile: Profile;
}

export default function PortfolioView({ profile }: PortfolioViewProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.aboutWrap}>
        <Sidebar profile={profile} />
      </div>
    </div>
  );
}
