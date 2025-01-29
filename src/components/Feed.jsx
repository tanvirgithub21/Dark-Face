"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaRegThumbsUp, FaRegComment, FaReply } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const initialPosts = [
    {
        id: 1,
        user: "John Doe",
        avatar: "/general/avatar.png",
        content: "Hello everyone! This is my first post.",
        image: "/general/avatar.png",
        likes: 10,
        comments: [
          {
            id: 1,
            user: "Alice",
            avatar: "/general/avatar.png",
            text: "Nice post!",
            replies: [],
          },
        ],
      },  {
        id: 2,
        user: "John Doe",
        avatar: "/general/avatar.png",
        content: "Hello everyone! This is my first post.",
        image: "/general/avatar.png",
        likes: 10,
        comments: [
          {
            id: 1,
            user: "Alice",
            avatar: "/general/avatar.png",
            text: "Nice post!",
            replies: [],
          },
        ],
      },  {
        id: 3,
        user: "John Doe",
        avatar: "/general/avatar.png",
        content: "Hello everyone! This is my first post.",
        image: "/general/avatar.png",
        likes: 10,
        comments: [
          {
            id: 1,
            user: "Alice",
            avatar: "/general/avatar.png",
            text: "Nice post!",
            replies: [],
          },
        ],
      },
];

const NewsFeed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [commentText, setCommentText] = useState({});

  const handlePostSubmit = () => {
    if (newPost.trim() === "") return;
    setPosts([
        {
            id: posts.length + 1,
            user: "You",
            avatar: "/general/avatar.png",
            content: newPost,
            likes: 0,
            comments: [],
          },
      ...posts,
    ]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleCommentSubmit = (postId) => {
    if (!commentText[postId]) return;
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  user: "You",
                  avatar: "/general/avatar.png",
                  text: commentText[postId],
                  replies: [],
                },
              ],
            }
          : post
      )
    );
    setCommentText({ ...commentText, [postId]: "" });
  };

  return (
    <div className="w-full mx-auto p-4">
  {/* Posts */}
  {posts.map((post) => (
    <div key={post.id} className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={post.avatar}
          alt={post.user}
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="font-bold">{post.user}</p>
      </div>
      <p className="mb-2">{post.content}</p>
      {post.image && (
        <Image
          src={post.image}
          alt="Post"
          width={500}
          height={300}
          className="rounded-lg w-full"
        />
      )}

      <div className="flex gap-4 mt-2 text-gray-600 dark:text-gray-300">
        <button onClick={() => handleLike(post.id)} className="flex items-center gap-1">
          <FaRegThumbsUp /> {post.likes} Likes
        </button>
        <button className="flex items-center gap-1">
          <FaRegComment /> {post.comments.length} Comments
        </button>
      </div>

      {/* Comments */}
      {post.comments.map((comment) => (
        <div key={comment.id} className="ml-6 mt-2 flex gap-3">
          <Image
            src={comment.avatar}
            alt={comment.user}
            width={30}
            height={30}
            className="rounded-full"
          />
          <div>
            <p className="font-bold text-sm">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}

      {/* Comment Input */}
      <div className="flex gap-3 mt-3 border-t border-gray-300 pt-3">
        <Image
          src="/general/avatar.png"
          alt="Your Avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
        <input
          type="text"
          value={commentText[post.id] || ""}
          onChange={(e) =>
            setCommentText({ ...commentText, [post.id]: e.target.value })
          }
          placeholder="Write a comment..."
          className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={() => handleCommentSubmit(post.id)}
          className="text-blue-500 hover:text-blue-600"
        >
          <IoMdSend size={24} />
        </button>
      </div>
    </div>
  ))}
</div>

  );
};

export default NewsFeed;
