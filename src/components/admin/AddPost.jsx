"use client";
import React, { useState, useEffect } from "react";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    console.log({ title, files });
  };

  return (
    <div>
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
        Upload
      </button>
    </div>
  );
}
