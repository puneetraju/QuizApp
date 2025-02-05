import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

/**
 * Results component displays the user's score and provides the option to view answers and solutions.
 * It allows toggling visibility of answers and detailed solutions for each question.
 */
const Results = ({ score, totalQuestions, userAnswers, questions }) => {
  const [visibleSolutions, setVisibleSolutions] = useState({}); // Tracks which solutions are visible
  const [showAnswers, setShowAnswers] = useState(false); // Controls visibility of the answers section

  /**
   * Parses text to convert markdown-like syntax (**bold** and *new lines*) to HTML.
   * @param {string} text - The raw text to be parsed
   * @returns {string} - The parsed HTML string
   */
  const parseText = (text) => {
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*/g, "<br />");
    return text;
  };

  /**
   * Toggles the visibility of the solution for a particular question.
   * @param {string} questionId - The ID of the question to toggle
   */
  const toggleSolution = (questionId) => {
    setVisibleSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  /**
   * Toggles visibility of the answers section.
   */
  const toggleAnswersSection = () => {
    setShowAnswers((prev) => !prev);
  };

  return (
    <div className="text-center relative">
      <h2 className="text-2xl font-bold">Quiz Completed!</h2>
      <p className="text-lg mt-2">
        Your Score: <span className="text-blue-600 text-xl">{score}</span> / {totalQuestions}
      </p>

      {/* Toggle answers section */}
      <div>
        <h3
          className="text-xl font-semibold cursor-pointer my-6 py-1 flex items-center justify-center rounded-md bg-blue-200"
          onClick={toggleAnswersSection}
        >
          Your Answers
          {showAnswers ? (
            <MdArrowDropUp size={24} className="ml-2" />
          ) : (
            <MdArrowDropDown size={24} className="ml-2" />
          )}
        </h3>

        {showAnswers && (
          <div className="my-4 space-y-4 max-h-[50vh] overflow-y-auto custom-scroll rounded-md border">
            {questions.map((question) => {
              const userAnswer = userAnswers.find(
                (answer) => answer.questionId === question.id
              );
              const correctAnswer = question.options.find(
                (option) => option.is_correct === true
              );

              if (!userAnswer || !correctAnswer) return null;

              return (
                <div key={question.id} className="question-result p-4 border rounded-lg">
                  <h4 className="text-lg font-medium">{question.description}</h4>

                  {/* Display user answer */}
                  <div
                    className={`option p-2 mt-2 rounded-lg border ${
                      userAnswer.answer === correctAnswer.id ? 'bg-green-200' : 'bg-red-200'
                    }`}
                  >
                    <strong>Your Answer: </strong>
                    {question.options.find(option => option.id === userAnswer.answer)?.description}
                  </div>

                  {/* Display correct answer */}
                  <div className="option p-2 mt-2 rounded-lg border bg-green-400">
                    <strong>Correct Answer: </strong>
                    {correctAnswer.description}
                  </div>

                  {/* Solution toggle */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleSolution(question.id)}
                      className="text-sm text-blue-600"
                    >
                      {visibleSolutions[question.id] ? "Hide Solution" : "Show Solution"}
                    </button>
                    {visibleSolutions[question.id] && (
                      <div className="detailed-solution mt-4 text-left">
                        <strong>Solution:</strong>
                        <div
                          className="text-sm text-left text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: parseText(question.detailed_solution),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Restart Quiz button */}
      <button
        onClick={() => window.location.reload()}
        className="py-2 px-6 bg-blue-500 text-white rounded-lg"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
