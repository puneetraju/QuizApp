import React, { useState, useEffect } from "react";
import Question from "./Question";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import Results from "./Results";
import Confetti from "react-confetti";
import correctSound from "../Sounds/correct.mp3";
import wrongSound from "../Sounds/wrong.mp3";

/**
 * QuizContainer component is responsible for rendering the quiz UI and handling quiz logic.
 * It tracks user selections, handles timer, shows confetti for correct answers, and displays results at the end.
 *
 * @param {Object} props - Component properties
 * @param {Array} props.questions - List of question objects for the quiz
 * @param {number} props.duration - Total quiz duration (in seconds)
 * @param {string} props.topic - The topic of the quiz
 * @param {number} props.initialProgress - Initial progress for the progress bar
 */
const QuizContainer = ({ questions, duration, topic, initialProgress }) => {
  // State hooks
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCross, setShowCross] = useState(false);

  // Preload audio files for correct and wrong answers
  const correctAudio = new Audio(correctSound);
  const wrongAudio = new Audio(wrongSound);

  /**
   * Handles the selection of an answer option by the user.
   * It updates the score and shows appropriate feedback.
   * 
   * @param {string} optionId - The ID of the selected answer option
   */
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);

    // Find the selected option object from the current question's options
    const selectedOptionObj = questions[currentQuestionIndex].options.find(
      (option) => option.id === optionId
    );

    // Check if the selected option is correct
    if (selectedOptionObj.is_correct) {
      setScore((prevScore) => prevScore + 1); // Increment score
      setShowConfetti(true); // Show confetti animation
      correctAudio.play(); // Play correct answer sound
      setTimeout(() => setShowConfetti(false), 1000); // Hide confetti after 1 second
    } else {
      setShowCross(true); // Show cross icon for wrong answer
      wrongAudio.play(); // Play wrong answer sound
      setTimeout(() => setShowCross(false), 1000); // Hide cross icon after 1 second
    }

    // Store the user's answer for this question
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: questions[currentQuestionIndex].id, answer: optionId },
    ]);
  };

  /**
   * Handles moving to the next question or completing the quiz if it's the last question.
   */
  const handleNextQuestion = () => {
    setSelectedOption(null); // Reset selected option

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      setIsQuizCompleted(true); // Mark quiz as completed
    }
  };

  /**
   * Handles the case when the time is up (e.g., the timer reaches zero).
   */
  const handleTimeUp = () => {
    setIsQuizCompleted(true); // Complete the quiz when time is up
  };

  return (
    <div className="relative w-full max-w-xl mx-auto  p-8 bg-white text-black rounded-xl shadow-md overflow-hidden">
      {/* Render results if quiz is completed */}
      {isQuizCompleted ? (
        <Results score={score} totalQuestions={questions.length} questions={questions} userAnswers={userAnswers} />
      ) : (
        <>
          {/* Progress bar showing quiz completion percentage */}
          <ProgressBar progress = { 8 + (currentQuestionIndex / (questions.length - 1)) * 92 } />

          {/* Timer for quiz duration */}
          {duration && <Timer duration={duration} onTimeUp={handleTimeUp} />}

          {/* Display the current question */}
          {questions.length > 0 && (
            <Question
              topic={topic}
              questionData={questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
            />
          )}

          {/* Next/Finish button */}
          <button
            onClick={handleNextQuestion}
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 border-0 transition-none"
            disabled={!selectedOption} // Disable button if no option is selected
          >
            {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>

          {/* Confetti animation for correct answers */}
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={100}
              initialVelocityX={{ min: -20, max: 20 }}
              initialVelocityY={{ min: -10, max: 10 }}
              opacity={0.8}
              colors={['magenta', 'cyan', 'gold', 'white', 'orange', 'olivedrab', 'silver', 'yellow', 'red']}
              confettiSource={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 1.8,
                w: 0,
                h: 0,
              }}
              className="absolute top-0 left-0 w-full h-full"
            />
          )}

          {/* Cross icon animation for wrong answers */}
          {showCross && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-red-600 text-6xl font-bold animate-ping">✖</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizContainer;
