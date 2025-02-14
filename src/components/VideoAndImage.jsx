"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import ResponsiveImage from "./ResponsiveImage";

const VideoAndImage = ({ post }) => {
  const [isActive, setIsActive] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const setAd = () => setIsActive(false);

  // Function to set a random time interval (5 to 10 minutes)
  const setRandomTimer = () => {
    const randomTime = Math.floor(Math.random() * (6 - 5 + 1) + 5) * 60; // Convert minutes to seconds
    setCountdown(randomTime);

    const timer = setTimeout(() => {
      setIsActive(true);
    }, randomTime * 1000); // Convert seconds to milliseconds

    return () => clearTimeout(timer);
  };

  // Run effect once on mount and whenever isActive becomes false
  useEffect(() => {
    setRandomTimer();
  }, [isActive]); // Re-run when isActive changes to false

  // Countdown Timer
  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  // Function to handle click and open Google in a new tab
  const handleClick = () => {
    if (!isActive) return;
    setIsActive(false);
  };

  const formatTimeShort = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${diffInSeconds}s`;
  };

  return (
    <div className="relative max-w-lg mx-auto space-y-2 bg-white dark:bg-gray-900">
      {isActive && (
        <a
          onClick={setAd}
          href={post.adsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <div className="fixed z-[99999] top-0 left-0 w-screen h-screen bg-[#00000001]"></div>
        </a>
      )}
      {post && (
        <div
          key={post._id}
          className="bg-white dark:bg-gray-800 rounded-sm shadow-md"
        >
          <div className="px-2 pt-2">
            <div className="flex items-center space-x-3">
              <Image
                src={post.profileImg}
                alt={post.name}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {post.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  @ {post.username} • {formatTimeShort(post.createdAt)} ago
                </p>
              </div>
            </div>
            <p className="line-clamp-2 overflow-hidden text-ellipsis mt-2 text-sm text-gray-700 dark:text-gray-300">
              {post.text}
            </p>
          </div>
          {post.uploadedUrl.includes("video") ? (
            <VideoPlayer key={post._id} data={post} isActive={isActive} />
          ) : (
            <ResponsiveImage src={post.uploadedUrl} alt="Uploaded media" />
          )}
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-3 py-1">
            <div className="w-[32%] h-8 cursor-pointer flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
              <BiLike className="mr-1 text-base" /> Like
            </div>
            <div className="w-[32%] h-8 cursor-not-allowed flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
              <FaRegComment className="mr-1 text-base" /> Comment
            </div>
            <div className="w-[32%] flex justify-center items-start h-8 cursor-pointer rounded-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
              <a
                className="flex justify-center items-center my-auto text-sm "
                href="https://www.profitablecpmrate.com/yj2qyqi6m?key=858396bb68661d53d616ef34fd3ff6ce"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiSolidDonateHeart className="mr-1 text-base" /> Support
              </a>
            </div>
          </div>
        </div>
      )}

      {isActive && (
        <a
          onClick={handleClick}
          href="https://www.profitablecpmrate.com/yj2qyqi6m?key=858396bb68661d53d616ef34fd3ff6ce"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-full h-full absolute top-0 left-0 bg-[#00000001]"></div>
        </a>
      )}
    </div>
  );
};

export default VideoAndImage;
