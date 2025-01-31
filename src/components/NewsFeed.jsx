"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import VideoPlayer from "./VideoPlayer";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      console.log("Fetching posts...");
      const res = await fetch(
        `/api/post/all?excludeIds=${JSON.stringify(excludeIds)}`
      );
      console.log("API Response Status:", res.status); // Check if we get a response

      if (!res.ok) {
        console.error("Failed to fetch posts:", res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("Fetched Data:", data); // Check the actual data returned

      if (data?.posts?.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setExcludeIds((prevIds) => [
          ...prevIds,
          ...data.posts.map((post) => post._id),
        ]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []); // Trigger on excludeIds and loading change

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is near the bottom
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        fetchPosts();
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, excludeIds]); // Trigger on excludeIds and loading change

  return (
    <div className="max-w-lg mx-auto p-1 space-y-2">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-sm shadow-md p-2">
          <div className="flex items-center space-x-3">
            <img
              src={post.profileImg}
              alt={post.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-sm text-gray-500">
                @{post.username} •{" "}
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>
          </div>
          <p className="mt-3 text-gray-700">{post.text}</p>
          {post.uploadedUrl.includes("video") ? (
           <VideoPlayer data={post} />
          ) : (
            <img
              src={post.uploadedUrl}
              alt="Uploaded media"
              className="w-full mt-3 rounded-lg"
            />
          )}
          <div className="flex justify-between items-center mt-3 text-gray-500 text-sm">
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

      {loading && <p className="text-center">Loading more posts...</p>}
    </div>
  );
};

export default NewsFeed;
