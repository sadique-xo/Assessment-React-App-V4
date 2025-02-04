// src/App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import InterestGame from './components/InterestGame';
import PersonalityGame from './components/PersonalityGame';
import VerbalGame from './components/VerbalGame';
import './App.css';

const randomCareers = [
  { name: "Software Engineer 💻", traits: "Analytical, Problem Solver" },
  { name: "Marketing Manager 📈", traits: "Creative, Communicative" },
  { name: "Psychologist 🧠", traits: "Empathetic, Insightful" }
];

function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [finalResults, setFinalResults] = useState(null);

  const goToNextStage = () => {
    setCurrentStage((prev) => prev + 1);
  };

  const handleAssessmentComplete = (results) => {
    setFinalResults(results);
    setCurrentStage(4); // Move to results screen
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/* === Intro Screen === */}
        {currentStage === 0 && (
          <motion.div 
            className="intro-screen"
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <DotLottieReact
              src="https://lottie.host/89939cda-eee2-44ae-a20d-22cf10195151/olFSS6VAcg.lottie"
              style={{ width: '300px', height: '300px' }}
              loop
              autoplay
            />
            <h1>👋 Hey there! Ready to find your best career?</h1>
            <p>Let's have a chat and discover your strengths.</p>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setCurrentStage(1)}
              className="start-button"
            >
              Start Chat 💬
            </motion.button>
          </motion.div>
        )}

        {/* === Game Stages === */}
        {currentStage === 1 && <InterestGame onNext={goToNextStage} />}
        {currentStage === 2 && <PersonalityGame onNext={goToNextStage} />}
        {currentStage === 3 && <VerbalGame onComplete={handleAssessmentComplete} />}

        {/* 🎯 Final Results Screen */}
        {currentStage === 4 && finalResults && (
          <motion.div
            key="results"
            className="dashboard-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="dashboard-heading">🎉 Your Career Insights</h1>
            
            <div className="dashboard-grid">
              {/* 🔹 Career Recommendations */}
              <div className="dashboard-card">
                <h3>🚀 Top Careers for You</h3>
                <ul>
                  {randomCareers.map((career, index) => (
                    <li key={index}>{career.name} - <span>{career.traits}</span></li>
                  ))}
                </ul>
              </div>

              {/* 🔹 Personality Type */}
              <div className="dashboard-card">
                <h3>🧩 Personality Type</h3>
                <p>Creative & Analytical</p>
                <p>🌟 Strengths: Problem-solving, adaptability, curiosity</p>
                <p>⚡ Weaknesses: Overthinking, perfectionism</p>
              </div>

              {/* 🔹 Communication Strength */}
              <div className="dashboard-card">
                <h3>🗣 Communication Strength</h3>
                <p>Strong verbal & written skills</p>
                <p>📢 Best suited for leadership & public-facing roles</p>
              </div>

              {/* 🔹 Additional Recommendations */}
              <div className="dashboard-card">
                <h3>📚 Recommended Learning Paths</h3>
                <ul>
                  <li>📖 Books: "Atomic Habits", "Deep Work"</li>
                  <li>🎧 Podcasts: "The Daily Stoic", "How I Built This"</li>
                  <li>🖥 Online Courses: Coursera, Udemy, Skillshare</li>
                </ul>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              onClick={() => setCurrentStage(0)}
              className="restart-button"
            >
              Restart Assessment 🔄
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
