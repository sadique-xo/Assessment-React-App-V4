import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LottieAnimation from './Animation - 1738408332409.lottie';
import './AssessmentGame.css';
import { motion } from 'framer-motion';

const questions = [
  "I like fixing or repairing broken items.",
  "I find it interesting to assist or accompany someone in any type of repairs.",
  "I enjoy working with tools like a hammer, screwdriver, spanner, wrench etc.",
  "I enjoy assisting someone who is repairing a bike or a car.",
  "I enjoy being a part of a sports team.",
  "I enjoy participating in outdoor games, sports and camps.",
  "I look forward to spending time playing or practicing sports.",
  "I look forward to learning any new sport.",
  "I like to watch birds of different species in their natural habitat.",
  "It would be interesting to observe marine plants and animals in their natural habitat."
];

const options = [
  { label: "Strongly disagree 😠", value: 1 },
  { label: "Disagree 🙁", value: 2 },
  { label: "Unsure 😐", value: 3 },
  { label: "Agree 🙂", value: 4 },
  { label: "Strongly agree 😃", value: 5 }
];

function InterestGame({ onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestion, setShowQuestion] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setShowQuestion(questions[currentQuestion].slice(0, i + 1));
      i++;
      if (i === questions[currentQuestion].length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [currentQuestion]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setTimeout(() => {
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
      <h1 className="assessment-heading">Know about your interests 🧐 </h1>

      {/* 🔵 Left Container for Animation & Question */}
      <div className="left-container">
        <DotLottieReact src={LottieAnimation} loop autoplay className="lottie-animation" />
        <div className="chat-bubble">
          <span>{showQuestion}</span>
        </div>
      </div>

      {/* 🎯 Options */}
      <div className="options-container">
        {options.map((option) => (
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

export default InterestGame;
