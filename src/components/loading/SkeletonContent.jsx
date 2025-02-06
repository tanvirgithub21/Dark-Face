const SkeletonContent = () => {
  return (
    <div className="relative max-w-lg mx-auto space-y-2 bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-sm shadow-md animate-pulse">
        <div className="px-2 pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
              <div className="h-3 w-40 bg-gray-300 dark:bg-gray-600 mt-1 rounded-sm"></div>
            </div>
          </div>
          <div className="h-6 w-4/5 mt-2 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
        </div>
        <div className="h-64 w-full bg-gray-300 dark:bg-gray-600 rounded-sm mt-2"></div>
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm px-3 py-1">
          <div className="w-[32%] h-8 cursor-pointer flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
          </div>
          <div className="w-[32%] h-8 cursor-not-allowed flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
          </div>
          <div className="w-[32%] h-8 cursor-not-allowed flex justify-center items-center rounded-sm text-sm space-x-1 hover:bg-gray-700 transition duration-300 ease-in-out">
            <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonContent;
