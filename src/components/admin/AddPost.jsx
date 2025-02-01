"use client";
import { useUpload } from "@/hooks/fontend/UseUpload";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const [allFilePostLoading, setAllFilePostLoading] = useState(false);

  const { user, isSignedIn, isLoaded } = useUser();
  const { uploadFile, loading, error } = useUpload();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    console.log({ title, files });
    setAllFilePostLoading(true);

    if (!user) {
      console.error("User not authenticated");
      setAllFilePostLoading(false);
      return;
    }

    try {
      const uploadPromises = files.map((file) => uploadFile(file, title, user));
      const results = await Promise.all(uploadPromises);

      console.log("All files uploaded successfully:", results);
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

      <button
        onClick={handleUpload}
        className="w-full bg-green-500 text-white px-4 py-2 rounded"
      >
        {allFilePostLoading ? "Uploading..." : "Upload"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
