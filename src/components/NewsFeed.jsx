"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";

const NewsFeed = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Function to set a random time interval (5 to 10 minutes)
  const setRandomTimer = () => {
    const randomTime = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60; // Convert minutes to seconds
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

  const [posts, setPosts] = useState([]);
  const [excludeIds, setExcludeIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noDataInServer, setNoDataInServer] = useState(false);

  const fetchPosts = async () => {
    if (loading || noDataInServer) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching posts...");
      const res = await fetch(
        `/api/post/all?excludeIds=${JSON.stringify([...excludeIds])}`
      );

      if (!res.ok) {
        setError("Failed to load posts, please try again later.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data?.posts?.length > 0) {
        const newPosts = data.posts.filter((post) => !excludeIds.has(post._id));

        if (newPosts.length > 0) {
          setPosts((prevPosts) => {
            const updatedPosts = [...prevPosts, ...newPosts];
            return Array.from(
              new Map(updatedPosts.map((post) => [post._id, post])).values()
            );
          });

          setExcludeIds(
            (prevIds) =>
              new Set([...prevIds, ...newPosts.map((post) => post._id)])
          );
        }
      } else {
        setNoDataInServer(true);
      }
    } catch (error) {
      setError("An error occurred while fetching posts.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading &&
        !noDataInServer
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, noDataInServer]);

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
      {error && <p className="text-center text-red-500">{error}</p>}
      {posts.map((post) => {
        const girlFullNames = [
          "Emma Johnson",
          "Olivia Smith",
          "Ava Williams",
          "Sophia Brown",
          "Isabella Jones",
          "Mia Miller",
          "Charlotte Davis",
          "Amelia Wilson",
          "Harper Anderson",
          "Evelyn Thomas",
          "Abigail White",
          "Ella Harris",
          "Scarlett Martin",
          "Grace Thompson",
          "Lily Garcia",
          "Hannah Martinez",
          "Aria Robinson",
          "Madison Clark",
          "Chloe Rodriguez",
          "Aubrey Lewis",
          "Zoey Walker",
          "Nora Hall",
          "Layla Allen",
          "Riley Young",
          "Victoria King",
          "Stella Wright",
          "Lucy Scott",
          "Natalie Green",
          "Penelope Adams",
          "Brooklyn Nelson",
        ];

        const name =
          post.name == (null || "")
            ? girlFullNames[Math.floor(Math.random() * girlFullNames.length)]
            : post.name;

        return (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-sm shadow-md"
          >
            <div className="px-2 pt-2">
              <div className="flex items-center space-x-3">
                <Image
                  src={post.profileImg}
                  alt={name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {name}
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
              <VideoPlayer key={post._id} data={{ ...post, name }} />
            ) : (
              <img
                src={post.uploadedUrl}
                alt="Uploaded media"
                className="w-full max-w-full h-auto max-h-[500px] mt-3 object-cover"
              />
            )}
            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-3 py-1">
              <button className="w-[32%] h-8 cursor-pointer flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
                <BiLike className="mr-1 text-base" /> Like
              </button>
              <button className="w-[32%] h-8 cursor-not-allowed flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
                <FaRegComment className="mr-1 text-base" /> Comment
              </button>
              <button className="w-[32%] h-8 cursor-pointer rounded-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out ">
                <a
                  className="flex justify-center items-center text-sm "
                  href="https://www.profitablecpmrate.com/yj2qyqi6m?key=858396bb68661d53d616ef34fd3ff6ce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BiSolidDonateHeart className="mr-1 text-base" /> Support
                </a>
              </button>
            </div>
          </div>
        );
      })}

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

      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
