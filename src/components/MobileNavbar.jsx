"use client";
import React, { useState } from "react";
import { FaHome, FaUsers, FaBell } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const BottomNavbar = () => {
  const [active, setActive] = useState("home");
  

  return (
    <div className="fixed top-0 left-0 w-full md:hidden bg-white dark:bg-gray-800 shadow-md border-b border-[#0000001d] dark:border-[#ffffff14] flex justify-around items-center py-2 md:py-3 z-50">
      {/* Home Icon */}
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
      </button>

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
         <p className="absolute top-0 ring-0 text-[10px] px-0.5 py-0 bg-yellow-300 rounded-2xl text-gray-950">Hold</p>
      </button>

      {/* Notifications Icon */}
      <button
        // onClick={() => setActive("notifications")}
        className="flex flex-col items-center relative"
      >
        <FaBell
          size={26}
          className={
            active === "notifications"
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-300"
          }
        />
        {active === "notifications" && (
          <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
        )}
        <p className="absolute top-0 ring-0 text-[10px] px-0.5 py-0 bg-yellow-300 rounded-2xl text-gray-950">Hold</p>
      </button>

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
  );
};

export default BottomNavbar;
