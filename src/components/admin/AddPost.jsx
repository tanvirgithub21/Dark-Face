"use client";
import { useUpload } from "@/hooks/fontend/UseUpload";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [allFilePostLoading, setAllFilePostLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Progress state

  const { user, isSignedIn, isLoaded } = useUser();
  const { uploadFile, loading, error } = useUpload();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    setAllFilePostLoading(true);
    setProgress(0);

    if (!user) {
      console.error("User not authenticated");
      setAllFilePostLoading(false);
      return;
    }

    try {
      let uploadedCount = 0; // Track uploaded files count

      for (const file of files) {
        await uploadFile(file, title, user);
        uploadedCount++;

        // Calculate progress
        const newProgress = Math.round((uploadedCount / files.length) * 100);
        setProgress(newProgress); // Update progress


        // Wait for 5 seconds before uploading next file
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      setAllFilePostLoading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setAllFilePostLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Upload Files
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-3 w-full mb-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm"
        placeholder="Enter title"
      />

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border p-3 w-full mb-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg shadow-sm"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {isClient &&
          files.length > 0 &&
          files.map((file, index) => (
            <div
              key={index}
              className="border p-2 bg-gray-200 dark:bg-gray-600 rounded-lg shadow-sm flex flex-col items-center"
            >
              {file.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <p className="text-xs truncate mt-1 text-center">{file.name}</p>
            </div>
          ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-4 mb-3">
        <div
          className="bg-green-500 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-600">{progress}% Uploaded</p>

      <button
        onClick={handleUpload}
        className="w-full bg-green-500 text-white px-4 py-2 rounded"
        disabled={allFilePostLoading}
      >
        {allFilePostLoading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
