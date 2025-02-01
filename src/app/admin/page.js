"use client";
import AddPost from "@/components/admin/AddPost";
import AdPost from "@/components/admin/AdPost";
import { useState } from "react";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("adPost");

  return (
    <div className="p-5 mt-[56px] min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      <div className="w-full max-w-lg p-4 flex justify-center space-x-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <button
          onClick={() => setActiveComponent("adPost")}
          className={
            activeComponent === "adPost"
              ? "bg-blue-600 text-white px-4 py-2 rounded"
              : "bg-blue-300 text-black dark:bg-blue-800 dark:text-white px-4 py-2 rounded"
          }
        >
          Ad Post
        </button>
        <button
          onClick={() => setActiveComponent("addPost")}
          className={
            activeComponent === "addPost"
              ? "bg-green-600 text-white px-4 py-2 rounded"
              : "bg-green-300 text-black dark:bg-green-800 dark:text-white px-4 py-2 rounded"
          }
        >
          Add Post
        </button>
      </div>

      <div className="mt-5 w-full max-w-2xl p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
        {activeComponent === "adPost" && <AdPost />}
        {activeComponent === "addPost" && <AddPost />}
      </div>
    </div>
  );
}

export default Dashboard;
