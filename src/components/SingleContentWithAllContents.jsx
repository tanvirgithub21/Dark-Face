"use client";
import NewsFeed from "@/components/NewsFeed";
import MobileNavbar from "@/components/MobileNavbar";
import Share from "@/components/Share";
import { useUser } from "@clerk/nextjs";

const SingleContentWithAllContents = () => {
  const {isLoaded } = useUser();

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
          <div className="min-h-screen w-full pt-[50px]">
            <div className="w-full pb-10 h-full mx-auto flex justify-center items-center ">
              <svg
                width="300"
                height="200"
                viewBox="0 0 300 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="glowing-svg"
              >
                <text
                  x="50%"
                  y="50%"
                  className="typing-text"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  Dark
                </text>

                <circle cx="150" cy="150" r="20" fill="none" stroke="#0ff" />

                <circle className="eye" cx="140" cy="145" r="4" />
                <circle className="eye" cx="160" cy="145" r="4" />

                <path className="smile" d="M230 60 Q235 65, 40 60" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleContentWithAllContents;
