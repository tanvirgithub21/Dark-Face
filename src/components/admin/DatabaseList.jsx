import React, { useEffect, useState } from "react";

const DatabaseList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/db/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data?.data); // Debugging
        if (Array.isArray(data?.data)) {
          setData(data?.data);
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
    return <div className="p-6 text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Database Records</h2>
      <div className="flex justify-center gap-4">
        {(Array.isArray(data) ? data : []).map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.dbName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Collection: {item.cloudName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Api Secret: {item.apiSecret}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Api Key: {item.apiKey}</p>
            <p className="text-sm text-gray-900 dark:text-gray-300">Files: {item.file}</p>
            <p className="text-sm text-gray-900 dark:text-gray-300">Email: {item.email}</p>
            <p
              className={`text-sm font-bold mt-2 ${
                item.status ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              Status: {item.status ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseList;