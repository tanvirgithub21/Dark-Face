import NewsFeed from "@/components/NewsFeed";
import MobileNavbar from "@/components/MobileNavbar";
import Share from "@/components/Share";
import VideoPlayer from "@/components/VideoPlayer";
import DemoVideo from "@/components/demoVideo";


const Homepage = () => {
  return (
    <div>
      <MobileNavbar />
      <Share />
      {/* <VideoPlayer/> */}
      <NewsFeed />
      {/* <DemoVideo/> */}
    </div>
  );
};

export default Homepage;
