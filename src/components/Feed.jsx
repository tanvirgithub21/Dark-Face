"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import Script from "next/script";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ডাটাবেজ থেকে ডাটা ফেচ করুন (উদাহরণস্বরূপ লোকাল ডাটা নিচ্ছি)
    const fetchedPosts = [
      { id: 1, title: "First Post", content: "This is the first post" },
      { id: 2, title: "Second Post", content: "This is the second post" },
      { id: 3, title: "Third Post", content: "This is the third post" },
      { id: 4, title: "Fourth Post", content: "This is the fourth post" },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          {/* প্রতিটি পোস্ট কম্পোনেন্ট */}
          <Post title={post.title} content={post.content} />

          {/* প্রতিটি পোস্টের নিচে অ্যাড দেখাবে */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Script
              id={`ad-script-${post.id}`}
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  atOptions = {
                    'key' : '843552e92a2ecbaaf106eb13fde6c909',
                    'format' : 'iframe',
                    'height' : 60,
                    'width' : 468,
                    'params' : {}
                  };
                `,
              }}
            />
            <Script
              id={`ad-script-js-${post.id}`}
              strategy="afterInteractive"
              src="//www.highperformanceformat.com/843552e92a2ecbaaf106eb13fde6c909/invoke.js"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
