
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Info } from 'lucide-react';

export interface SubAttribute {
  name: string;
  value: number;
  color: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface AttributeBreakdown {
  parentAttribute: string;
  subAttributes: SubAttribute[];
}

interface AttributeRhombusProps {
  breakdown: AttributeBreakdown;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AttributeRhombus = ({ breakdown, size = 'md', className = '' }: AttributeRhombusProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getImpactBadgeColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className={`relative ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} relative cursor-pointer`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoveredIndex(null);
          }}
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-sm"
          >
            {/* Define rhombus paths for each quadrant */}
            {breakdown.subAttributes.map((attr, index) => {
              const paths = [
                "M 50 10 L 90 50 L 50 50 Z", // Top
                "M 90 50 L 50 90 L 50 50 Z", // Right
                "M 50 90 L 10 50 L 50 50 Z", // Bottom
                "M 10 50 L 50 10 L 50 50 Z"  // Left
              ];

              return (
                <motion.path
                  key={index}
                  d={paths[index]}
                  fill={attr.color}
                  stroke="white"
                  strokeWidth="1"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : (isHovered ? 0.9 : 0.8),
                    scale: hoveredIndex === index ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                />
              );
            })}
            
            {/* Center circle with parent attribute initial */}
            <circle
              cx="50"
              cy="50"
              r="8"
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x="50"
              y="55"
              textAnchor="middle"
              className={`font-bold fill-gray-700 ${textSizeClasses[size]}`}
            >
              {breakdown.parentAttribute.charAt(0)}
            </text>
          </svg>

          {/* Hover tooltip */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
              >
                {breakdown.subAttributes[hoveredIndex].name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing border on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 border-2 border-brand-500 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
            >
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{breakdown.parentAttribute} Breakdown</CardTitle>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {breakdown.subAttributes.map((attr, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: attr.color }}
                            />
                            <span className="font-medium">{attr.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactBadgeColor(attr.impact)}>
                              {attr.impact} impact
                            </Badge>
                            <span className="font-bold text-brand-600">{attr.value}%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{attr.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AttributeRhombus;
