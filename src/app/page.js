import NewsFeed from "@/components/Feed";
import MobileNavbar from "@/components/MobileNavbar";
import Share from "@/components/Share";


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
