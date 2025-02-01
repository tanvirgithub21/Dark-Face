"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]);
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
        `/api/post/all?excludeIds=${JSON.stringify(excludeIds)}`
      );

      if (!res.ok) {
        setError("Failed to load posts, please try again later.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data?.posts?.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setExcludeIds((prevIds) => [
          ...prevIds,
          ...data.posts.map((post) => post._id),
        ]);
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
    <div className="max-w-lg mx-auto space-y-2 bg-white dark:bg-gray-900">
      {error && <p className="text-center text-red-500">{error}</p>}
      {posts.map((post) => (
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
            <p className="line-clamp-2 overflow-hidden text-ellipsis mt-2 text-sm text-gray-700 dark:text-gray-300">{post.text}</p>
          </div>
          {post.uploadedUrl.includes("video") ? (
            <VideoPlayer key={post._id} data={post} />
          ) : (
            <img
              src={post.uploadedUrl}
              alt="Uploaded media"
              className="w-full max-w-full h-auto max-h-[500px] mt-3 object-cover"
            />
          )}
          <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-gray-400 text-sm px-2 pb-2">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              👍 Like
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              💬 Comment
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              🔄 Share
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
