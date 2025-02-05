# React Quiz Application

A simple and interactive React-based quiz application with gamification features like a progress bar, timer, and confetti effects. The app allows users to take quizzes, track their scores, and see visual feedback for correct and incorrect answers.

## Features

- **Multiple Question Types**: Supports multiple-choice format.  
- **Dynamic Progress Bar**: Updates in real-time as the user progresses through the quiz.  
- **Timer-Based Challenges**: Each quiz has a countdown timer to add a challenge.  
- **Instant Feedback**: Shows whether an answer is correct or incorrect immediately.  
- **Confetti Animation**: A celebratory effect for correct answers.  
- **Sound Effects**: Plays different sounds for correct and incorrect answers.  
- **Score Tracking**: Keeps track of correct answers and displays final results.  
- **Responsive UI**: Works seamlessly on desktops, tablets, and mobile devices.   
- **Modular & Scalable Code**: Clean architecture with reusable components.  


## Setup Instructions

### 1. Clone the repository

    git clone https://github.com/your-username/quiz-app.git

### 2. Navigate to the project directory

    cd quiz-app


### 3. Install dependencies

Make sure you have `Node.js` and `npm` installed. Then install the required dependencies using the following command.
   
    npm install

### 4. Start the development server

After the installation is complete, you can run the development server.

    npm run dev


### 5. Adding Sound Effects

To add custom sounds, place your `.mp3` sound files in the `public/Sounds/` directory.  
Update the paths in the `QuizContainer` component to point to your new sound files.

    const correctAudio = new Audio('/Sounds/correct.mp3');
    const wrongAudio = new Audio('/Sounds/wrong.mp3');


### 7. Build the Project for Production

To create a production-ready build, run:

    npm run build

This will generate a `build` folder containing the optimized version of your app.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **React Confetti**: For displaying celebratory confetti animations.
- **React Hooks**: For managing component state and lifecycle methods.
