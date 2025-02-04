import React, { useState } from "react";

const PasswordCheck = ({isAuthenticated, setIsAuthenticated}) => {

  const [password, setPassword] = useState("");

  const handleCheckPassword = () => {
    if (password === "@@Tiktok321@@") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      {!isAuthenticated ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Enter Password"
          />
          <button
            onClick={handleCheckPassword}
            className="ml-2 p-2 bg-blue-600 text-white rounded dark:bg-blue-500"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="text-green-500 text-2xl font-bold">Access Granted!</div>
      )}
    </div>
  );
};

export default PasswordCheck;
