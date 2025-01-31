"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useUpload } from "@/hooks/fontend/UseUpload";
import { useUser } from "@clerk/nextjs";
import UploadStatus from "./UploadStatus";

const Share = () => {
  const [uplodeRssult, setUplodeRssult] = useState(null);
  const [media, setMedia] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const { user, isSignedIn, isLoaded } = useUser();

  const { uploadFile, loading, error } = useUpload();

  const handleUpload = async () => {
    console.log("post");
    if (!media) return alert("Please select a file!");

    const data = await uploadFile(media, text, user);
    if (data) {
      setUplodeRssult(data);
      console.log({ data: data });
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
              <Image
                src="/general/avatar.png"
                alt="User Avatar"
                width={48}
                height={48}
              />
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
            disabled={!isSignedIn}
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Share;
