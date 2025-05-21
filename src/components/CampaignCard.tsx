
import React from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner";

type CampaignCardProps = {
  title: string;
  description: string;
  channel: string;
  impact: string;
  objective: string;
  index: number;
};

const CampaignCard = ({
  title,
  description,
  channel,
  impact,
  objective,
  index
}: CampaignCardProps) => {
  const handleActivate = () => {
    toast.success(`Campaign "${title}" activated successfully!`);
  };

  const getChannelIcon = () => {
    switch (channel.toLowerCase()) {
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'social':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'sms':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'app':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  const getImpactColor = () => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getObjectiveColor = () => {
    switch (objective.toLowerCase()) {
      case 'retention':
        return 'bg-purple-100 text-purple-700';
      case 'conversion':
        return 'bg-blue-100 text-blue-700';
      case 'acquisition':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div 
      className="border rounded-lg bg-white shadow-sm p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor()}`}>
          {impact} impact
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center px-2.5 py-1 rounded-md bg-gray-100">
          {getChannelIcon()}
          <span className="ml-1 text-xs font-medium text-gray-700">{channel}</span>
        </div>
        
        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getObjectiveColor()}`}>
          {objective}
        </div>
      </div>
      
      <button
        onClick={handleActivate}
        className="w-full mt-2 px-4 py-2 rounded-md bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
      >
        Activate Campaign
      </button>
    </motion.div>
  );
};

export default CampaignCard;
