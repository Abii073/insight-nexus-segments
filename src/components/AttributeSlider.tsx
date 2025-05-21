
import React from 'react';
import { Slider } from "@/components/ui/slider";

type AttributeSliderProps = {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  color?: string;
};

const AttributeSlider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  description,
  color = 'brand-500'
}: AttributeSliderProps) => {
  return (
    <div className="space-y-3 w-full">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-brand-600">{value[0]}</span>
      </div>
      
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={onChange}
        className={`bg-${color}`}
      />
      
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
};

export default AttributeSlider;
