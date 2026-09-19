import PortfolioView from "@/components/PortfolioView";
import { profile, projects } from "@/lib/data";

export default function Page() {
  return <PortfolioView profile={profile} projects={projects} />;
}
