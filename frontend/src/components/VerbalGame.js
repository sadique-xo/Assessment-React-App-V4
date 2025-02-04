// src/components/VerbalGame.js
import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LottieAnimation from './Animation - 1738408332409.lottie';
import './AssessmentGame.css';
import { motion } from 'framer-motion';

function VerbalGame({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestion, setShowQuestion] = useState('');
  const [progress, setProgress] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    { id: 1, text: "What is the synonym of 'Supremacy'?", options: ["Choice", "Authority", "Profit", "Subordination"], correct: 2 },
    { id: 2, text: "Which of the following words would you associate with 'Cry over spilt milk'?", options: ["Content", "Sad", "Complain", "Disorderly"], correct: 3 },
    { id: 3, text: "The public are cautioned _______ pickpockets in the local trains.", options: ["against", "to", "at", "by"], correct: 1 },
    { id: 4, text: "The project suffered ______ the team leader's neglect.", options: ["to", "since", "at", "from"], correct: 1 },
    { id: 5, text: "Complete the sentence: When is he coming? I ________ for over an hour.", options: ["am waiting", "waited", "was waiting", "have been waiting"], correct: 4 }
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShowQuestion(questions[currentQuestion].text.slice(0, i + 1));
      i++;
      if (i === questions[currentQuestion].text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [currentQuestion]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const question = questions[currentQuestion];
      const isCorrect = question.correct === selectedAnswer + 1;

      setResponses((prev) => ({
        ...prev,
        [question.id]: isCorrect ? 10 : 0
      }));

      setTimeout(() => {
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowQuestion('');
          setProgress(((currentQuestion + 1) / questions.length) * 100);
        } else {
          if (typeof onComplete === 'function') {
            onComplete(responses);
          } else {
            console.error("Error: onComplete is not a function");
          }
        }
      }, 500);
    }
  };

  return (
    <div className="full-screen">
      <h1 className="assessment-heading">Test your verbal ability 📝</h1>

      {/* 🔵 Left Container for Animation & Question */}
      <div className="left-container">
        <DotLottieReact src={LottieAnimation} loop autoplay className="lottie-animation" />
        <div className="chat-bubble">
          <span>{showQuestion}</span>
        </div>
      </div>

      {/* 🎯 Answer Options */}
      <div className="options-container">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => setSelectedAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* 🟢 Next Button */}
      <button className="next-btn" onClick={handleNext} disabled={selectedAnswer === null}>
        Next →
      </button>

      {/* 🔵 Progress Bar with Adjusted Spacing */}
      <div className="progress-container">
        <motion.div 
          className="progress-bar" 
          initial={{ width: "0%" }} 
          animate={{ width: `${progress}%` }} 
          transition={{ duration: 0.5, ease: "easeInOut" }} 
        />
      </div>
    </div>
  );
}

export default VerbalGame;
