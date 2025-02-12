"use client";
import { useState, useRef } from "react";

// Modal Component
function AdModal({ isOpen, onClose, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed z-[100] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Update Data</h2>
        <input
          type="text"
          className="w-full mt-3 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          placeholder="Enter new value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => onSubmit(inputValue)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          >
            Submit
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
  );
}