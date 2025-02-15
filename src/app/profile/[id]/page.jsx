"use client";
import Loader from "@/components/Loader";
import UserPosts from "@/components/UserPosts";
import { useEffect, useState } from "react";
import { FaCamera, FaCommentDots, FaUserPlus } from "react-icons/fa";

function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyle =
    "px-3 py-1 sm:px-4 sm:py-2 rounded font-medium text-xs sm:text-sm w-full sm:w-auto";
  const variantStyles = {
    default: "bg-blue-600 text-white dark:bg-blue-500",
    outline:
      "border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
  };
  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Tabs({ children }) {
  return <div className="mt-3 sm:mt-4">{children}</div>;
}

function TabsList({ children }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-300 dark:border-gray-600">
      {children}
    </div>
  );
}

function TabsTrigger({ value, activeTab, setActiveTab, children }) {
  return (
    <button
      className={`px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium sm:w-auto text-center ${
        activeTab === value
          ? "border-b-2 border-blue-600 dark:border-blue-400"
          : "text-gray-600 dark:text-gray-300"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? (
    <div className="py-3 sm:p-4 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
      {children}
    </div>
  ) : null;
}

// ✅ ইউজারের তথ্য ফেচ করার ফাংশন (API Call)
const fetchUserById = async (userId) => {
  try {
    const res = await fetch(`/api/user/get?userId=${userId}`);

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;
  }
};

export default function ProfilePage({ params }) {
  const [id, setId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (params?.id) {
      setId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (id) {
      fetchUserById(id).then((data) => {
        if (data) {
          setUserInfo(data);
        }
      });
    }
  }, [id]);

  console.log({ userInfo });

  if (!userInfo?._id) {
    return <Loader />;
  }

  return (
    <div className=" mt-[57px] w-full min-h-screen mx-auto p-3 sm:p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      {/* Cover Photo */}
      <div className="relative h-32 sm:h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={userInfo?.avatar}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <button className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-full shadow">
          <FaCamera className="text-xs sm:text-lg text-gray-800 dark:text-gray-200" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-[-30px] sm:mt-[-40px] p-3 sm:p-4 text-center sm:text-left">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 sm:border-4 border-white dark:border-gray-700 overflow-hidden">
          <img
            src={userInfo?.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-full shadow">
            <FaCamera className="text-xs sm:text-lg text-gray-800 dark:text-gray-200" />
          </button>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            {userInfo?.firstName + " " + userInfo?.lastName || "Unknown User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            {userInfo?.bio || "No bio available"}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            {userInfo?.adsLink || "No ads available"}
          </p>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2">
            <Button className="flex items-center justify-center gap-1">
              <FaUserPlus className="text-xs sm:text-lg" /> Follow
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-1"
            >
              <FaCommentDots className="text-xs sm:text-lg" /> Message
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs>
        <TabsList>
          <TabsTrigger
            value="posts"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="photos"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            Photos
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            Videos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" activeTab={activeTab}>
          {id && <UserPosts userId={id} />}
        </TabsContent>
        <TabsContent value="photos" activeTab={activeTab}>
          <p>All photos appear here...</p>
        </TabsContent>
        <TabsContent value="videos" activeTab={activeTab}>
          <p>All videos appear here...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
