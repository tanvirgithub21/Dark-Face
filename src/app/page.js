import NewsFeed from "@/components/Feed";
import MobileNavbar from "@/components/MobileNavbar";
import Share from "@/components/Share";
import Link from "next/link";

const Homepage = () => {
  return (
    <div>
      <MobileNavbar />
      <Share />
      <NewsFeed />
    </div>
  );
};

export default Homepage;
