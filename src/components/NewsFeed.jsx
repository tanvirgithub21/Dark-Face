"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import ResponsiveImage from "./ResponsiveImage";
import SkeletonContent from "./loading/SkeletonContent";
import { FaClipboard } from "react-icons/fa";

const NewsFeed = ({ adFalse }) => {
  const [isActive, setIsActive] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy");
  const [posts, setPosts] = useState([]);
  const [excludeIds, setExcludeIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noDataInServer, setNoDataInServer] = useState(false);

  // 📌 📌 `isActive` কে `useMemo` দিয়ে অপ্টিমাইজ করা
  const isActiveMemo = useMemo(() => countdown === 0, [countdown]);

  useEffect(() => {
    console.log(adFalse);
    if (!adFalse) {
      setIsActive(false);
    }
  }, [adFalse]);

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

  // 📌 📌 র‍্যান্ডম টাইমার সেট করা
  useEffect(() => {
    const randomTime = Math.floor(Math.random() * (6 - 5 + 1) + 5) * 60; // 5-10 মিনিট
    setCountdown(randomTime);

    const timer = setTimeout(() => setIsActive(true), randomTime * 1000);
    return () => clearTimeout(timer);
  }, [isActive]);

  const setAd = () => setIsActive(false);

  // 📌 📌 Countdown Timer অপ্টিমাইজ করা
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  // 📌 📌 ফিড ডেটা লোড করার অপ্টিমাইজ করা ফাংশন
  const fetchPosts = useCallback(async () => {
    if (loading || noDataInServer) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching posts...");
      const res = await fetch(
        `/api/post/all?excludeIds=${JSON.stringify([...excludeIds])}`
      );

      if (!res.ok) throw new Error("Failed to load posts");

      const data = await res.json();
      if (!data?.posts?.length) {
        setNoDataInServer(true);
        return;
      }

      setPosts((prev) => [
        ...new Map([...prev, ...data.posts].map((p) => [p._id, p])).values(),
      ]);
      setExcludeIds(
        (prev) => new Set([...prev, ...data.posts.map((p) => p._id)])
      );
    } catch (error) {
      setError("An error occurred while fetching posts.");
    } finally {
      setLoading(false);
    }
  }, [loading, noDataInServer, excludeIds]);

  // 📌 📌 প্রথমবার পোস্ট লোড করা
  useEffect(() => {
    fetchPosts();
  }, []);

  // 📌 📌 স্ক্রলিং হ্যান্ডলার অপ্টিমাইজ করা
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
  }, [fetchPosts, loading, noDataInServer]);

  // 📌 📌 সময় ফরম্যাট করা
  const formatTimeShort = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return days > 0
      ? `${days}d`
      : hours > 0
      ? `${hours}h`
      : minutes > 0
      ? `${minutes}m`
      : `${diffInSeconds}s`;
  };

  return (
    <div className="relative max-w-lg mx-auto space-y-2 bg-white dark:bg-gray-900">
      {error && <p className="text-center text-red-500">{error}</p>}
      {isActive && (
        <a
          onClick={setAd}
          href="https://www.effectiveratecpm.com/yj2qyqi6m?key=858396bb68661d53d616ef34fd3ff6ce"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <div className="fixed z-[9999] top-0 left-0 w-screen h-screen bg-[#00000003]"></div>
        </a>
      )}
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
            <p className="line-clamp-2 overflow-hidden text-ellipsis mt-2 text-sm text-gray-700 dark:text-gray-300">
              {post.text}
            </p>
          </div>

          {post.uploadedUrl.includes("video") ? (
            <VideoPlayer key={post._id} data={post} isActive={isActiveMemo} />
          ) : (
            <ResponsiveImage src={post.uploadedUrl} alt="Uploaded media" />
          )}

          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-3 py-1">
            <div className="w-[32%] h-8 cursor-pointer flex justify-center items-center rounded-sm text-sm hover:bg-gray-700">
              <BiLike className="mr-1 text-base" /> Like
            </div>
            <div className="w-[32%] h-8 flex justify-center items-center rounded-sm text-sm hover:bg-gray-700">
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

      {loading &&
        [...Array(5)].map((_, index) => <SkeletonContent key={index} />)}
    </div>
  );
};

export default NewsFeed;
