
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
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    //lg: 'w-20 h-20'
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

  // Calculate points for the radar chart with much larger dimensions
  const centerX = 100;
  const centerY = 100;
  const maxRadius = 85; // Increased from 50 to 85
  
  // Define the 4 angles for diamond/rhombus shape (top, right, bottom, left)
  const angles = [0, 90, 180, 270].map(deg => (deg - 90) * Math.PI / 180); // Offset by -90 to start at top
  
  // Calculate grid lines (concentric diamonds)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  
  // Map corner positions to specific attributes with their colors
  const cornerMapping = {
    0: { name: 'Disposable Income', color: '#10b981' }, // Top - Green
    1: { name: 'Credit Usage', color: '#f59e0b' }, // Right - Yellow/Orange  
    2: { name: 'Payment Timeliness', color: '#8b5cf6' }, // Bottom - Purple
    3: { name: 'Account Balance', color: '#f97316' } // Left - Orange
  };
  
  // Calculate data points based on attribute values with dynamic colors
  const dataPoints = breakdown.subAttributes.map((attr, index) => {
    const angle = angles[index];
    const radius = (attr.value / 100) * maxRadius;
    const cornerInfo = cornerMapping[index as keyof typeof cornerMapping];
    
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      ...attr,
      dynamicColor: cornerInfo?.color || attr.color
    };
  });

  // Calculate grid points for each level
  const gridPoints = gridLevels.map(level => 
    angles.map(angle => ({
      x: centerX + Math.cos(angle) * maxRadius * level,
      y: centerY + Math.sin(angle) * maxRadius * level
    }))
  );

  // Create path string for the filled area
  const dataPath = `M ${dataPoints[0].x} ${dataPoints[0].y} ` +
    dataPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';

  return (
    <>
      <div className={`relative ${className}`}>
        <motion.div
          //className={`${sizeClasses[size]} relative cursor-pointer`}
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
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-md"
          >
            {/* Grid lines (concentric diamonds) */}
            {gridPoints.map((points, levelIndex) => (
              <path
                key={levelIndex}
                d={`M ${points[0].x} ${points[0].y} ` +
                    points.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z'}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                opacity={0.7}
              />
            ))}

            {/* Axis lines */}
            {angles.map((angle, index) => (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={centerX + Math.cos(angle) * maxRadius}
                y2={centerY + Math.sin(angle) * maxRadius}
                stroke="#e5e7eb"
                strokeWidth="2"
                opacity={0.7}
              />
            ))}

            {/* Filled data area with gradient */}
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
            </defs>
            
            <motion.path
              d={dataPath}
              fill="url(#radarGradient)"
              stroke="#3b82f6"
              strokeWidth="4"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: isHovered ? 0.8 : 0.6 }}
              transition={{ duration: 0.2 }}
            />

            {/* Data points with dynamic colors and pulsing for high impact */}
            {dataPoints.map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={hoveredIndex === index ? "10" : "8"}
                fill={point.dynamicColor}
                stroke="white"
                strokeWidth="4"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: hoveredIndex === index ? 1.3 : 1,
                  ...(point.impact === 'high' ? {
                    scale: [1, 1.2, 1],
                    transition: { duration: 2, repeat: Infinity }
                  } : {})
                }}
                transition={{ duration: 0.2 }}
              />
            ))}

            {/* Center circle with parent attribute initial */}
            {/* <circle
              cx={centerX}
              cy={centerY}
              r="25"
              fill="white"
              stroke="#3b82f6"
              strokeWidth="4"
            />
            <text
              x={centerX}
              y={centerY + 8}
              textAnchor="middle"
              className={`font-bold fill-blue-600 text-xl`}
            >
              {breakdown.parentAttribute.charAt(0)}
            </text> */}
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
                {breakdown.subAttributes[hoveredIndex].name}: {breakdown.subAttributes[hoveredIndex].value}%
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulsing border on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 border-2 border-blue-500 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                clipPath: 'polygon(50% 12%, 88% 50%, 50% 88%, 12% 50%)'
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
