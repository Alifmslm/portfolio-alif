import Sidebar from "@/components/Sidebar";
import ProjectFeed from "@/components/ProjectFeed";
import { profile, projects } from "@/lib/data";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.layout}>
      <Sidebar profile={profile} />
      <ProjectFeed projects={projects} />
    </main>
  );
}