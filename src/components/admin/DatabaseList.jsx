import React, { useEffect, useState } from "react";

const DatabaseList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/db/all")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          // Data sort করা হচ্ছে: প্রথমে status: true এবং file < 50
          const sortedData = data.data.sort((a, b) => {
            if (a.status === b.status) {
              return a.file - b.file; // File সংখ্যা অনুযায়ী sorting
            }
            return b.status - a.status; // Active status আগে দেখানো
          });
          setData(sortedData);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-900 dark:text-white text-sm">Loading...</div>;
  }

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Database Records</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {data.map((item, index) => {
          const isHighFileCount = item.file >= 50;

          return (
            <div
              key={index}
              className={`border p-4 rounded-lg shadow-md dark:border-gray-700 transition duration-300 ${
                isHighFileCount
                  ? "bg-red-100 dark:bg-red-900 border-red-400"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <h3 className={`text-base font-semibold ${isHighFileCount ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-white"}`}>
                {item.dbName}
              </h3>
              <p className="text-xs">Collection: {item.cloudName}</p>
              <p className="text-xs">Api Secret: {item.apiSecret}</p>
              <p className="text-xs">Api Key: {item.apiKey}</p>
              <p className={`text-xs font-semibold ${isHighFileCount ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-gray-300"}`}>
                Files: {item.file}
              </p>
              <p className="text-xs">Email: {item.email}</p>
              <p
                className={`text-xs font-bold mt-2 ${
                  item.status ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                Status: {item.status ? "✅ Active" : "❌ Inactive"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatabaseList;
