import React from "react";

/**
 * ProgressBar component displays a visual progress bar based on the current progress.
 * @param {number} progress - The current progress percentage (0-100).
 */
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
      <div
        className="h-4 bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }} // Dynamically adjusts width based on progress
      ></div>
    </div>
  );
};

export default ProgressBar;
