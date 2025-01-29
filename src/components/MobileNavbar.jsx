"use client";
import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaUserFriends,
  FaUserAlt,
  FaBell,
  FaBars,
} from "react-icons/fa";
import Image from "next/image";

const BottomNavbar = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white dark:bg-gray-800 shadow-md border-t flex justify-around items-center py-2 md:py-3">
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
        onClick={() => setActive("friends")}
        className="flex flex-col items-center"
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
      </button>

      {/* Groups Icon */}
      <button
        onClick={() => setActive("groups")}
        className="flex flex-col items-center"
      >
        <FaUserFriends
          size={26}
          className={
            active === "groups"
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-300"
          }
        />
        {active === "groups" && (
          <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
        )}
      </button>

      {/* Profile Icon */}
      <button
        onClick={() => setActive("profile")}
        className="flex flex-col items-center"
      >
        <FaUserAlt
          size={26}
          className={
            active === "profile"
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-300"
          }
        />
        {active === "profile" && (
          <div className="w-6 h-1 bg-blue-600 rounded-full mt-1"></div>
        )}
      </button>

      {/* Notifications Icon */}
      <button
        onClick={() => setActive("notifications")}
        className="flex flex-col items-center"
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
      </button>

      {/* Profile Picture with Menu */}
      <div className="relative">
        <Image
          src="/general/avatar.png"
          alt="Profile"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full">
          <FaBars size={12} />
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
