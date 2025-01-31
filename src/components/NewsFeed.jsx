"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    if (loading) return; // Prevent multiple requests

    setLoading(true);
    setError(null); // Reset error state on new fetch

    try {
      console.log("Fetching posts...");
      const res = await fetch(
        `/api/post/all?excludeIds=${JSON.stringify(excludeIds)}`
      );
      console.log("API Response Status:", res.status);

      if (!res.ok) {
        console.error("Failed to fetch posts:", res.statusText);
        setError("Failed to load posts, please try again later.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Fetched Data:", data);

      if (data?.posts?.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setExcludeIds((prevIds) => [
          ...prevIds,
          ...data.posts.map((post) => post._id),
        ]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("An error occurred while fetching posts.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Initial fetch when the component mounts

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is near the bottom
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [loading]); // Only depend on loading to prevent unnecessary calls

  const formatTimeShort = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const seconds = diffInSeconds % 60;
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const hours = Math.floor((diffInSeconds % 86400) / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (days > 0) {
      return `${days}d`;
    }
    if (hours > 0) {
      return `${hours}h`;
    }
    if (minutes > 0) {
      return `${minutes}m`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="max-w-lg mx-auto p-1 space-y-2 bg-white dark:bg-gray-900">
      {error && <p className="text-center text-red-500">{error}</p>}{" "}
      {/* Display error message if any */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white dark:bg-gray-800 rounded-sm shadow-md p-2"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={post.profileImg} // The source of the image
              alt={post.name} // Alt text for the image
              className="w-10 h-10 rounded-full" // Tailwind classes for styling
              width={40} // Set the width of the image
              height={40} // Set the height of the image
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
          <p className="mt-3 text-gray-700 dark:text-gray-300">{post.text}</p>
          {post.uploadedUrl.includes("video") ? (
            <VideoPlayer data={post} />
          ) : (
            <img
            src={post.uploadedUrl}
            alt="Uploaded media"
            className="w-full max-w-full h-auto max-h-[500px] mt-3 rounded-lg object-cover"
          />
          
          )}
          <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-gray-400 text-sm">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span>👍</span>
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span>💬</span>
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span>🔄</span>
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
