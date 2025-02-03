"use client";
import NewsFeed from "@/components/NewsFeed";
import MobileNavbar from "@/components/MobileNavbar";
import Share from "@/components/Share";
import { useUser } from "@clerk/nextjs";

const Homepage = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return (
    <div>
      <MobileNavbar />
      <div className=" bg-white dark:bg-gray-900">
        {isLoaded ? (
          <div className="min-h-[calc(100vh_-_50px)]">
            <Share />
            <NewsFeed />
          </div>
        ) : (
          <div className="min-h-screen pt-[50px]">Loading</div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
