"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUpload } from "@/hooks/fontend/UseUpload";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Share = () => {
  const [uplodeRssult, setUplodeRssult] = useState(null);
  const [media, setMedia] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const router = useRouter();

  const { user, isSignedIn, isLoaded } = useUser();

  console.log({ user });

  const { uploadFile, loading, error } = useUpload();

  const handleUpload = async () => {
    console.log("enter");
    if (!user) {
      return router.push("/sign-in");
    }
    if (!media) return alert("Please select a file!");

    const data = await uploadFile(media, text, user);
    if (data) {
      setText("");
      setPreviewURL(null);
      setMedia(null);
      setUplodeRssult(data);
    }
  };

  const handleMediaChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "50px"; // Initial height
      textAreaRef.current.style.height = `${Math.min(
        120,
        textAreaRef.current.scrollHeight
      )}px`; // Auto resize
    }
  }, [text]);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 shadow p-4 w-full max-w-2xl mx-auto text-gray-900 dark:text-gray-100 mt-[50px]">
        <div className="flex items-center gap-3 ">
          <div className="mb-auto">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              {user?.imageUrl ? (
                <Image
                  src={user?.imageUrl}
                  alt="User Avatar"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="10" x2="8" y2="14" />
                    <line x1="16" y1="10" x2="16" y2="14" />
                    <path d="M12 16c2.2 0 4 1.2 4 2.5S14.2 21 12 21s-4-1.2-4-2.5S9.8 16 12 16z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <textarea
            ref={textAreaRef}
            placeholder="What's on your mind?"
            className="flex-1 border-none outline-none text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 resize-none "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {previewURL && (
          <div className="relative mt-4">
            {media.type.startsWith("image") ? (
              <Image
                src={previewURL}
                alt="Preview"
                width={500}
                height={300}
                className="rounded-lg w-full"
              />
            ) : (
              <video src={previewURL} controls className="rounded-lg w-full" />
            )}
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              onClick={() => {
                setMedia(null);
                setPreviewURL(null);
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232a3 3 0 014.536 0 3 3 0 010 4.536l-7.071 7.071a3 3 0 01-4.243 0l-4.243-4.243a3 3 0 010-4.243 3 3 0 014.243 0l3.536 3.536a1 1 0 001.414 0l3.536-3.536z"
              ></path>
            </svg>
            <span>Photo/Video</span>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaChange}
            />
          </label>
          <button
            disabled={loading}
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600"
          >
            {loading ? (
              <div className="relative w-6 h-6 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full"
                    style={{
                      transform: `rotate(${i * 45}deg) translate(9px)`, // ছোট আকারের জন্য কম translate
                      animation: "pulse 1s infinite ease-in-out",
                      animationDelay: `${i * 0.12}s`,
                    }}
                  ></span>
                ))}
                <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Share;
