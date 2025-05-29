
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Slider } from "@/components/ui/slider";

interface InteractiveRadarChartProps {
  data: number[];
  labels: string[];
  onDataChange: (newData: number[]) => void;
}

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
    <div className="space-y-6">
      {/* Radar Chart */}
      <div className="h-96 w-full">
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
        <div className="grid gap-4">
          {labels.map((label, index) => (
            <div 
              key={label} 
              className={`p-3 rounded-lg border transition-colors ${
                hoveredIndex === index ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">{label}</label>
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
  );
};

export default InteractiveRadarChart;
