
import React from 'react';
import { motion } from 'framer-motion';

const OctagonLogoAnimated = ({ progress = 0 }: { progress?: number }) => {
  // Calculate which segments to highlight based on progress
  const highlightSegments = Math.ceil(progress / 12.5); // 8 segments total (100% / 8 = 12.5%)
  
  // SVG polygon points for octagon
  const createOctagonPoints = (size: number, offset: number = 0) => {
    const center = size / 2;
    const radius = (size / 2) - offset;
    const points = [];
    
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i - (Math.PI / 8);
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    return points.join(' ');
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Base octagon */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background octagon */}
        <motion.polygon
          points={createOctagonPoints(100, 2)}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Inner octagon that rotates */}
        <motion.polygon
          points={createOctagonPoints(100, 10)}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Highlighted segments based on progress */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.path
            key={index}
            d={`M 50 50 L ${50 + 40 * Math.cos((Math.PI / 4) * index - (Math.PI / 8))} ${50 + 40 * Math.sin((Math.PI / 4) * index - (Math.PI / 8))} L ${50 + 40 * Math.cos((Math.PI / 4) * (index + 1) - (Math.PI / 8))} ${50 + 40 * Math.sin((Math.PI / 4) * (index + 1) - (Math.PI / 8))} Z`}
            fill={index < highlightSegments ? "#3B82F6" : "none"}
            stroke="#3B82F6"
            strokeWidth="1"
            initial={{ opacity: index < highlightSegments ? 0.8 : 0.1 }}
            animate={{ 
              opacity: index < highlightSegments ? [0.6, 1, 0.6] : 0.1,
              scale: index < highlightSegments ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.1
            }}
          />
        ))}
        
        {/* Center dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="#3B82F6"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default OctagonLogoAnimated;
