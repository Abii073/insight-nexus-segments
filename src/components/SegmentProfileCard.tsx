
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type SegmentProfileCardProps = {
  id: string;
  title: string;
  description: string;
  traits: string[];
  color: string;
  delay?: number;
};

const SegmentProfileCard = ({
  id,
  title,
  description,
  traits = [],
  color,
  delay = 0
}: SegmentProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="segment-card rounded-lg border bg-white shadow-sm p-5 flex flex-col h-full"
      onClick={() => navigate(`/campaigns/${id}`)}
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
        style={{ backgroundColor: color }}
      >
        <div className="w-6 h-6 bg-white/30 rounded-md" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-4 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <p className="text-xs uppercase font-medium text-gray-400 mb-2">Key traits</p>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 text-xs rounded-full text-gray-700 bg-gray-100"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>
      
      <button 
        className="mt-4 text-sm text-brand-500 font-medium hover:text-brand-600 flex items-center justify-center"
        onClick={() => navigate(`/campaigns/${id}`)}
      >
        View campaigns
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
};

export default SegmentProfileCard;
