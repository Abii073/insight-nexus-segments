
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import Logo from '../Logo';

interface StepWrapperProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepDescription?: string;
}

const StepWrapper = ({ children, currentStep, totalSteps, stepTitle, stepDescription }: StepWrapperProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo and Progress */}
        <div className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-brand-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <span className="ml-4 text-sm font-medium text-gray-600">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{stepTitle}</h1>
            {stepDescription && (
              <p className="text-lg text-gray-600">{stepDescription}</p>
            )}
          </div>

          <Card className="rounded-xl shadow-lg p-6">
            {children}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StepWrapper;
