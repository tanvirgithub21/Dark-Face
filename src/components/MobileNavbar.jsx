"use client";
import React, { useRef, useState } from "react";
import { FaHome, FaUsers, FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const BottomNavbar = () => {
  const [active, setActive] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);

  const { user } = useUser();

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000); // 3s delay
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    if (!data && user?.publicMetadata?.userMongoId) return;

    setLoading(true); // লোডিং শুরু

    fetch("/api/user/ad-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.publicMetadata?.userMongoId,
        adsLink: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInputValue("");
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // লোডিং শেষ
  };

  return (
    <div className="fixed  top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-md bg-white dark:bg-gray-800 shadow-md border-b border-[#0000001d] dark:border-[#ffffff14]  py-2 md:py-3 z-50">
      {isModalOpen && (
        <div className="fixed mt-[150px] z-[100] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full mx-2 text-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Update Data
            </h2>
            <input
              type="text"
              className="w-full mt-3 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter new value"
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => handleSubmit(inputValue)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-around items-center">
        {/* Home Icon */}
        <Link href="/">
          <button
            onClick={() => setActive("home")}
            className="flex flex-col items-center"
          >
            <FaHome
              size={26}
              className={
                active === "home"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300"
              }
            />
            {active === "home" && (
              <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
            )}
          </button>{" "}
        </Link>

        {/* Friends Icon */}
        <button
          // onClick={() => setActive("friends")}
          className="flex flex-col items-center relative"
        >
          <FaUsers
            size={26}
            className={
              active === "friends"
                ? "text-blue-600"
                : "text-gray-700 dark:text-gray-300"
            }
          />
          {active === "friends" && (
            <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
          )}
          <p className="absolute top-0 ring-0 text-[10px] px-0.5 py-0 bg-yellow-300 rounded-2xl text-gray-950">
            Hold
          </p>
        </button>

        {/* Notifications Icon */}
        <SignedIn>
          <Link href={`/profile/${user?.publicMetadata?.userMongoId}`}>
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onClick={() => setActive("profile")}
              className="flex flex-col items-center relative"
            >
              <CgProfile
                size={26}
                className={
                  active === "notifications"
                    ? "text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }
              />
              {active === "profile" && (
                <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
              )}
            </button>
          </Link>
        </SignedIn>

        {/* Profile Section */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default BottomNavbar;
