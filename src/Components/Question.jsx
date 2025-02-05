// import React, { useState, useEffect } from "react";

// const Question = ({ questionData, selectedOption, onSelect, topic }) => {

//   const handleOptionChange = (option) => {
//     onSelect(option); 
//   };

//   const isCorrectAnswer =
//     selectedOption &&
//     questionData.options.find((option) => option.id === selectedOption)
//       ?.is_correct;

//   useEffect(() => {
    
//   }, [questionData]);

//   return (
//     <div className="question-container">
//       <h1 className="p-2 text-2xl text-center font-bold" >{topic}</h1>
//       <h2 className="question-title py-2 px-3 ">{questionData.description}</h2>

//       <div className="options-container flex flex-col gap-2 p-[1rem] ">
//         {questionData.options.map((option) => {
//           const isSelected = selectedOption === option.id;
//           const isOptionCorrect = option.is_correct;

//           return (
//             <label
//               key={option.id}
//               className={`option flex items-center p-2.5 rounded-lg cursor-pointer border border-gray-300 
//                 ${isSelected ? (isOptionCorrect ? "bg-emerald-400" : "bg-red-300") : "bg-white"} 
//                 ${selectedOption ? "pointer-events-none" : "hover:bg-green-300"} 
//                 relative`}
//             >
//               <input
//                 type="radio"
//                 name={`question_${questionData.id}`}
//                 value={option.id}
//                 checked={isSelected}
//                 onChange={() => handleOptionChange(option.id)}
//                 className="hidden peer"
//                 disabled={selectedOption} 
//               />
//               <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center peer-checked:border-blue-500"></div>
//               <span className="text-gray-700 px-2">{option.description}</span>

              
//               {(isOptionCorrect && (isSelected || selectedOption)) && (
//                 <span className="absolute bottom-2 right-2 text-sm text-green-700 font-semibold">
//                   Correct Answer
//                 </span>
//               )}

//             </label>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Question;


import React, { useState, useEffect } from "react";

/**
 * Question component renders a multiple-choice question and its options.
 * It allows users to select an answer and provides feedback on whether the selected
 * option is correct or not. The component also visually distinguishes selected 
 * and correct answers.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.questionData - Contains the question description and options.
 * @param {string} props.selectedOption - The ID of the currently selected option.
 * @param {Function} props.onSelect - Function to handle option selection.
 * @param {string} props.topic - The topic of the question.
 *
 * @returns {JSX.Element} The Question component.
 */
const Question = ({ questionData, selectedOption, onSelect, topic }) => {
  
  /**
   * Handles the change in the selected option.
   * 
   * @param {string} option - The ID of the selected option.
   */
  const handleOptionChange = (option) => {
    onSelect(option); // Passes the selected option ID to the parent component.
  };

  /**
   * Determines whether the selected option is the correct answer.
   * 
   * @returns {boolean} True if the selected option is correct, false otherwise.
   */
  const isCorrectAnswer =
    selectedOption &&
    questionData.options.find((option) => option.id === selectedOption)
      ?.is_correct;

  /**
   * useEffect hook to perform side effects when questionData changes.
   * Can be used for any future enhancements.
   */
  useEffect(() => {
    // Future side effects related to questionData can be handled here
  }, [questionData]);

  return (
    <div className="question-container">
      {/* Displays the topic of the question */}
      <h1 className="p-2 text-2xl text-center font-bold">{topic}</h1>

      {/* Displays the question description */}
      <h2 className="question-title py-2 px-3">{questionData.description}</h2>

      {/* Container for options */}
      <div className="options-container flex flex-col gap-2 p-[1rem]">
        {/* Maps through each option to display it */}
        {questionData.options.map((option) => {
          const isSelected = selectedOption === option.id; // Check if the option is selected
          const isOptionCorrect = option.is_correct; // Check if the option is correct

          return (
            <label
              key={option.id}
              className={`option flex items-center p-2.5 rounded-lg cursor-pointer border border-gray-300 
                ${isSelected ? (isOptionCorrect ? "bg-emerald-400" : "bg-red-300") : "bg-white"} 
                ${selectedOption ? "pointer-events-none" : "hover:bg-green-300"} 
                relative`}
            >
              {/* Radio input for selecting an option */}
              <input
                type="radio"
                name={`question_${questionData.id}`}
                value={option.id}
                checked={isSelected}
                onChange={() => handleOptionChange(option.id)} // Trigger the option change
                className="hidden peer"
                disabled={selectedOption} // Disable further selection once answered
              />
              <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center peer-checked:border-blue-500"></div>
              {/* Displays the option description */}
              <span className="text-gray-700 px-2">{option.description}</span>

              {/* Displays feedback if the answer is correct */}
              {(isOptionCorrect && (isSelected || selectedOption)) && (
                <span className="absolute bottom-2 right-2 text-sm text-green-700 font-semibold">
                  Correct Answer
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
