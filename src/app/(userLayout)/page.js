import NewsFeed from "@/components/NewsFeed";
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
