
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import AttributeRhombus from './AttributeRhombus';
import { getAttributeBreakdown } from '../data/attributeBreakdowns';

type CampaignCardProps = {
  title: string;
  description: string;
  channel: string;
  impact: string;
  objective: string;
  index: number;
  targetSegment?: string;
};

const CampaignCard = ({
  title,
  description,
  channel,
  impact,
  objective,
  index,
  targetSegment = 'Tech-Savvy Millennials'
}: CampaignCardProps) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

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

  // Get attribute breakdown for financial capacity
  const attributeBreakdown = getAttributeBreakdown(targetSegment);

  return (
    <>
      <motion.div 
        className="border rounded-lg bg-white shadow-sm p-5 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <div className="flex gap-6">
          {/* Left Side - Enhanced Rhombus */}
          <div className="flex-shrink-0 relative">
            <motion.div
              className="cursor-pointer"
              onMouseEnter={() => setShowBreakdown(true)}
              onMouseLeave={() => setShowBreakdown(false)}
              onClick={() => setShowBreakdown(!showBreakdown)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <AttributeRhombus 
                breakdown={attributeBreakdown}
                size="lg"
                className="w-20 h-20"
              />
            </motion.div>

            {/* Hover tooltip with fade-in animation */}
            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-xs whitespace-nowrap z-20"
                >
                  Financial Capacity Breakdown
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Content displaced to maintain balance */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 leading-tight">{title}</h3>
              <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getImpactColor()}`}>
                {impact} impact
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
            
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
          </div>
        </div>
      </motion.div>

      {/* Financial Capacity Breakdown Modal */}
      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBreakdown(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Financial Capacity Breakdown</h3>
                  <button
                    onClick={() => setShowBreakdown(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {attributeBreakdown.subAttributes.map((attr, index) => (
                    <motion.div 
                      key={index} 
                      className="p-4 rounded-lg border bg-gray-50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: attr.color }}
                            animate={attr.impact === 'high' ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="font-medium text-gray-800">{attr.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            attr.impact === 'high' ? 'bg-red-100 text-red-700' :
                            attr.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {attr.impact} impact
                          </div>
                          <span className="font-bold text-brand-600 text-lg">{attr.value}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{attr.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampaignCard;
