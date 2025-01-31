import React from "react";

import { formatDistanceToNow } from "date-fns";

export default function Feed(post) {
  return (
    <div key={post._id} className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-3">
        <img
          src={post.profileImg}
          alt={post.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{post.name}</p>
          <p className="text-sm text-gray-500">
            @{post.username} • {formatDistanceToNow(new Date(post.createdAt))}{" "}
            ago
          </p>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{post.text}</p>
      {post.uploadedUrl.includes("video") ? (
        <video
          src={post.uploadedUrl}
          controls
          className="w-full mt-3 rounded-lg"
        ></video>
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
  );
}
