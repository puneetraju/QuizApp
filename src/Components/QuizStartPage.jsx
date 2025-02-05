import React, { useState, useEffect } from "react";
import QuizContainer from "./QuizContainer";

/**
 * QuizStartPage component fetches quiz data from an API and displays the start page.
 * Once the user clicks "Start Quiz", it navigates to the QuizContainer with the quiz questions.
 */
const QuizStartPage = () => {
  const [quizData, setQuizData] = useState(null); // Stores the fetched quiz data
  const [isStarted, setIsStarted] = useState(false); // Tracks whether the quiz has started
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores error messages if any occur

  /**
   * Fetches quiz data from an API.
   */
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          `https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data || !data.questions || data.questions.length === 0) {
          throw new Error("No data found");
        }
        setQuizData(data); // Set the fetched quiz data
      } catch (error) {
        setError(error.message); // Set error if fetching fails
      } finally {
        setLoading(false); // Stop loading once fetch is done
      }
    };
    fetchQuizData();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="text-center m-10 border border-red text-red-500">{error}</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-10 bg-white text-black rounded-xl shadow-md overflow-hidden">
      {isStarted ? (
        <QuizContainer
          questions={quizData.questions}
          duration={quizData.duration}
          topic={quizData.topic}
        />
      ) : (
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold">{quizData.title}</h1>
          <p className="text-lg text-gray-700 mt-2">Topic: {quizData.topic}</p>
          <p className="text-md text-green-800 font-semibold mt-1">Time Limit: {quizData.duration} minutes</p>
          <p className="text-md text-gray-600 mt-1">Total Questions: <span className="text-blue-500">{quizData.questions.length}</span></p>
          <button
            onClick={() => setIsStarted(true)} // Starts the quiz when clicked
            className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizStartPage;
