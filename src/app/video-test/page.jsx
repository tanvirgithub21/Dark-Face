"use client";
import { useEffect, useState } from "react";
import TestVideoPlayer from "./TestVideoPlayer";

export default function Posts() {
  const [posts, setPosts] = useState([
   
  ]);

  useEffect(() => {
    setPosts([
      {
        id: 1,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 2,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 3,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 4,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 5,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 6,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
      {
        id: 7,
        videoUrl:
          "https://res.cloudinary.com/dyjecllja/video/upload/sp_auto/v1738354074/Dark-Face/yfmnmrogjlsyysgha5y8.m3u8",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 max-w-lg mx-auto">
      {posts.map((post) => (
        <TestVideoPlayer key={post.id} videoUrl={post.videoUrl} />
      ))}
    </div>
  );
}
