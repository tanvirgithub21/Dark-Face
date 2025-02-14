"use client";  // Add this line

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ResponsiveImage from "./ResponsiveImage";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image"; // ✅ Correct Image Import
import { BiLike } from "react-icons/bi";
import { FaRegComment, FaClipboard } from "react-icons/fa";

const UserPosts = ({ userId }) => {
  const [copyStatus, setCopyStatus] = useState("Copy")
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [excludeIds, setExcludeIds] = useState([]);
  const [isClient, setIsClient] = useState(false); // ✅ Fix Hydration Issue

// 📌 📌 `handleCopyClick` অপ্টিমাইজ করা
  const handleCopyClick = async (id) => {
    try {
      await navigator.clipboard.writeText(
        `https://dark-face.vercel.app/content/${id}`
      );
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    } catch (err) {
      setCopyStatus("Failed to copy!");
      console.error("Copy failed: ", err);
    }
  };
  
  useEffect(() => {
    setIsClient(true); // ✅ Ensure component runs only on the client
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `/api/post/profile?userId=${userId}&excludeIds=${JSON.stringify(excludeIds)}`
      );
      const data = await res.json();

      if (data.posts.length === 0) {
        setHasMore(false);
        return;
      }

      setPosts((prev) => [...prev, ...data.posts]);
      setExcludeIds((prev) => [...prev, ...data.posts.map((post) => post._id)]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  if (!isClient) return null; // ✅ Prevents hydration mismatch

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<p className="text-center text-gray-500">Loading...</p>}
      endMessage={<p className="text-center text-gray-500">No more posts</p>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white dark:bg-gray-800 rounded-sm shadow-md">
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
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{post.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    @ {post.username} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{post.text}</p>
            </div>

            {post.uploadedUrl.includes("video") ? (
              <VideoPlayer key={post._id} data={post} />
            ) : (
              <ResponsiveImage src={post.uploadedUrl} alt="Uploaded media" />
            )}

            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-3 py-1">
              <div className="w-[32%] h-8 cursor-pointer flex justify-center items-center rounded-sm hover:bg-gray-700">
                <BiLike className="mr-1 text-base" /> Like
              </div>
              <div className="w-[32%] h-8 flex justify-center items-center rounded-sm hover:bg-gray-700">
                <FaRegComment className="mr-1 text-base" /> Comment
              </div>
              <div
              onClick={() => handleCopyClick(post._id)}
              className="w-[32%] h-8 flex justify-center items-center rounded-sm text-sm hover:bg-gray-700"
            >
              {copyStatus === "Copied!" ? (
                <p className="flex justify-center items-center">
                  Copied! <FaClipboard className="ml-1 text-base" />
                </p>
              ) : (
                <p className="flex justify-center items-center">
                  Share <FaClipboard className="ml-1 text-base" />
                </p>
              )}
            </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default UserPosts;
