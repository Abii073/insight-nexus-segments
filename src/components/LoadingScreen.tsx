
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OctagonLogoAnimated from './OctagonLogoAnimated';

const loadingTexts = [
  "Analyzing customer database...",
  "Identifying behavioral patterns...",
  "Processing demographic clusters...",
  "Evaluating purchase history...",
  "Mapping customer journeys...",
  "Calculating lifetime value...",
  "Segmenting by engagement level...",
  "Extracting preference insights...",
];

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(loadingTexts[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / 60); // 60 increments over 6 seconds
        return Math.min(newProgress, 100);
      });
      
      const textIndex = Math.floor(Math.random() * loadingTexts.length);
      setCurrentText(loadingTexts[textIndex]);
    }, 100);
    
    const timeout = setTimeout(() => {
      navigate('/attributes');
    }, 6000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-tr from-gray-50 to-gray-100">
      <motion.div 
        className="w-full max-w-2xl space-y-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Octagon Logo */}
        <div className="flex flex-col items-center justify-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <OctagonLogoAnimated progress={progress} />
          </motion.div>
          
          <motion.div 
            className="text-center space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-800">Octagon AI</h1>
            <h2 className="text-xl text-brand-600">Processing data</h2>
          </motion.div>
        </div>
        
        <div className="relative pt-8">
          <div className="flex items-center justify-center pb-6">
            <motion.div 
              className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
          
          <motion.p
            key={currentText}
            className="text-lg text-gray-600 h-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentText}
          </motion.p>
          
          <div className="mt-8 w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-brand-500 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          <p className="mt-2 text-sm text-gray-500">
            {Math.round(progress)}% complete
          </p>
        </div>
      </motion.div>
      
      <div className="mt-16 text-center text-gray-400 text-sm">
        <p>Using proprietary AI algorithms to segment your customer base</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
