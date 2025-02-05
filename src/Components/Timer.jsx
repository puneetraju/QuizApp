import React, { useState, useEffect } from "react";

/**
 * Timer component displays the remaining time in minutes and seconds.
 * Once the timer reaches zero, the `onTimeUp` callback is called.
 * @param {number} duration - The total duration in minutes.
 * @param {function} onTimeUp - Callback function when the time is up.
 */
const Timer = ({ duration, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState(duration * 60); // Stores the remaining time in seconds

  useEffect(() => {
    if (remainingTime === 0) {
      onTimeUp(); // Call callback when time is up
      return;
    }
    const timer = setTimeout(() => setRemainingTime((prev) => prev - 1), 1000);
    return () => clearTimeout(timer); // Cleanup on unmount or when timer updates
  }, [remainingTime, onTimeUp]);

  const minutes = Math.floor(remainingTime / 60); // Calculate minutes
  const seconds = remainingTime % 60; // Calculate seconds

  return (
    <div className="text-center font-semibold text-lg text-blue-600">
      Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
