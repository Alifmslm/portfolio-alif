import PortfolioView from "@/components/PortfolioView";
import { profile } from "@/lib/data";

export default function Page() {
  return <PortfolioView profile={profile} />;
}
