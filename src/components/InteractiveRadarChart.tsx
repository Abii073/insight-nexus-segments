
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface InteractiveRadarChartProps {
  data: number[];
  labels: string[];
  onDataChange: (newData: number[]) => void;
}

const subdimensionDescriptions = {
  'Income Stability': 'Consistency and predictability of income sources',
  'Debt Management': 'Ability to manage and service debt obligations',
  'Savings Behavior': 'Frequency and amount of savings deposits',
  'Investment Activity': 'Engagement with investment products and services',
  'Credit Utilization': 'Percentage of available credit being used',
  'Cash Flow Patterns': 'Regular patterns in money flow and spending',
  'Payment History': 'Track record of on-time payments',
  'Credit Age': 'Length of credit history and account age',
  'Credit Mix': 'Variety of credit types (cards, loans, etc.)',
  'New Credit': 'Recent credit inquiries and new accounts',
  'Utilization Rate': 'Credit usage relative to credit limits',
  'Dispute History': 'History of credit disputes and resolutions',
  'Account Diversity': 'Range of different banking products held',
  'Product Usage': 'Frequency and depth of product utilization',
  'Service Frequency': 'How often services are accessed',
  'Feature Adoption': 'Uptake of new features and capabilities',
  'Cross-selling': 'Receptiveness to additional product offers',
  'Product Satisfaction': 'Satisfaction scores across product portfolio',
  'App Usage Frequency': 'How often mobile app is accessed',
  'Web Login Behavior': 'Patterns in online banking usage',
  'Email Engagement': 'Response rates to email communications',
  'Self-Service Preference': 'Preference for automated vs. human assistance',
  'Mobile vs Desktop': 'Channel preference for digital interactions',
  'Channel Switching': 'Tendency to switch between service channels',
  'Age Cohort': 'Generational segment and age group',
  'Family Status': 'Marital status and household composition',
  'Career Stage': 'Professional development and career phase',
  'Life Events': 'Major life changes affecting financial needs',
  'Geographic Mobility': 'Frequency of location changes',
  'Social Connections': 'Network size and social engagement level',
  'Account Age': 'Length of relationship with institution',
  'Service History': 'Track record of service interactions',
  'Loyalty Programs': 'Participation in loyalty and rewards programs',
  'Referral Activity': 'History of referring new customers',
  'Complaint History': 'Past complaints and resolution satisfaction',
  'Relationship Depth': 'Breadth and depth of banking relationship',
  'Transaction Volume': 'Number and frequency of transactions',
  'Payment Methods': 'Preferred payment mechanisms',
  'Spending Categories': 'Primary areas of expenditure',
  'Seasonal Patterns': 'Cyclical changes in spending behavior',
  'Geographic Spread': 'Geographic distribution of transactions',
  'Time Preferences': 'Preferred times for financial activities',
  'Asset Diversification': 'Spread of assets across investment types',
  'Investment Knowledge': 'Sophistication in investment understanding',
  'Risk Tolerance': 'Comfort level with investment risk',
  'Wealth Growth': 'Rate of wealth accumulation over time',
  'Professional Services': 'Use of wealth management services',
  'Luxury Spending': 'Spending on premium and luxury items'
};

const InteractiveRadarChart = ({ data, labels, onDataChange }: InteractiveRadarChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const chartData = labels.map((label, index) => ({
    subject: label,
    value: data[index],
    fullMark: 100
  }));

  const handleSliderChange = (index: number, newValue: number[]) => {
    const newData = [...data];
    newData[index] = newValue[0];
    onDataChange(newData);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Radar Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fontSize: 12, fill: '#64748b' }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickCount={6}
              />
              <Radar
                name="Value"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ r: 4, fill: '#3b82f6' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Adjust Subdimensions</h4>
          <div className="grid gap-3">
            {labels.map((label, index) => (
              <div 
                key={label} 
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  hoveredIndex === index 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p className="text-xs">
                          {subdimensionDescriptions[label] || 'Adjust this dimension to see impact on segments'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-semibold text-brand-600">{data[index]}%</span>
                </div>
                <Slider
                  value={[data[index]]}
                  onValueChange={(newValue) => handleSliderChange(index, newValue)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InteractiveRadarChart;
