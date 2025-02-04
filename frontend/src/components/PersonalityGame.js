// src/components/PersonalityGame.js

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LottieAnimation from './Animation - 1738408332409.lottie';
import './AssessmentGame.css';  // Using single CSS file for all assessments
import { motion } from 'framer-motion';

// Personality questions
const questions = [
  "I don’t believe in gifting someone so that they favor me.",
  "I readily admit my limitations.",
  "I don’t like to make promises that I will not be able to fulfill.",
  "If I make a mistake, I tend to admit it before getting caught.",
  "It is alright to praise someone if that puts you in their good books.",
  "I avoid discussing topics that can give rise to conflicts.",
  "It is alright to ignore some mistakes of others, rather than pointing them out.",
  "When I am angry/upset, I prefer to keep it to myself.",
  "I come straight to the point without beating around the bush."
];

// Likert-scale options
const options = [
  { label: "Strongly disagree 😠", value: 1 },
  { label: "Disagree 🙁", value: 2 },
  { label: "Unsure 😐", value: 3 },
  { label: "Agree 🙂", value: 4 },
  { label: "Strongly agree 😃", value: 5 }
];

function PersonalityGame({ onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestion, setShowQuestion] = useState('');
  const [progress, setProgress] = useState(0);

  // Typing effect: updates showQuestion char-by-char at 25ms intervals
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShowQuestion(questions[currentQuestion].slice(0, i + 1));
      i++;
      if (i === questions[currentQuestion].length) clearInterval(interval);
    }, 25);

    // Cleanup on question change
    return () => clearInterval(interval);
  }, [currentQuestion]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setTimeout(() => {
        // If more questions left, go to next. Otherwise, call onNext()
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowQuestion('');
          setProgress(((currentQuestion + 1) / questions.length) * 100);
        } else {
          onNext();
        }
      }, 500);
    }
  };

  return (
    <div className="full-screen">
      <h1 className="assessment-heading">Understand your personality 🧠</h1>

      {/* 🔵 Left Container for Animation & Question */}
      <div className="left-container">
        <DotLottieReact src={LottieAnimation} loop autoplay className="lottie-animation" />
        <div className="chat-bubble">
          <span>{showQuestion}</span>
        </div>
      </div>

      {/* 🎯 Answer Options */}
      <div className="options-container">
        {options.map(option => (
          <button
            key={option.value}
            className={`option-btn ${selectedAnswer === option.value ? 'selected' : ''}`}
            onClick={() => setSelectedAnswer(option.value)}
          >
            {option.label}
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

export default PersonalityGame;
