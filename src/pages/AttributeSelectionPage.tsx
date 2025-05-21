
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from '../components/Logo';
import AttributeSlider from '../components/AttributeSlider';

const attributes = [
  {
    id: 'clv',
    label: 'Customer Lifetime Value',
    description: 'The predicted total value of a customer relationship over time.'
  },
  {
    id: 'frequency',
    label: 'Usage Frequency',
    description: 'How often customers engage with your product or service.'
  },
  {
    id: 'risk',
    label: 'Risk Level',
    description: 'Likelihood of customer churn or account default.'
  },
  {
    id: 'channel',
    label: 'Channel Preference',
    description: 'Customer\'s preferred method of communication and engagement.'
  },
  {
    id: 'product',
    label: 'Product Affinity',
    description: 'Customer\'s preference for specific products or categories.'
  }
];

const AttributeSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, number[]>>({
    clv: [50],
    frequency: [65],
    risk: [30],
    channel: [80],
    product: [70]
  });
  
  const handleSliderChange = (id: string, value: number[]) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [id]: value
    });
  };
  
  const handleContinue = () => {
    navigate('/octagon');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-5xl">
        <header className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-gray-500 text-sm">Step 2 of 6</div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Attribute Selection
          </h1>
          <p className="text-gray-600 mt-2">
            Adjust the importance of each attribute to customize your customer segmentation
          </p>
        </motion.div>
        
        <Card className="p-6 md:p-8 bg-white shadow-sm">
          <div className="space-y-6">
            {attributes.map((attribute, index) => (
              <motion.div 
                key={attribute.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AttributeSlider
                  label={attribute.label}
                  value={selectedAttributes[attribute.id] || [50]}
                  onChange={(value) => handleSliderChange(attribute.id, value)}
                  description={attribute.description}
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Checkbox id="advanced" />
              <label
                htmlFor="advanced"
                className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable advanced behavioral analysis
              </label>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-brand-500 hover:bg-brand-600"
              >
                Generate Strategic Map
              </Button>
            </div>
          </motion.div>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Our AI uses these weights to create optimal customer segments that align with your business goals.</p>
        </div>
      </div>
    </div>
  );
};

export default AttributeSelectionPage;
