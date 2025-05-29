
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import OctagonView from '../components/OctagonView';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const attributes = [
  {
    id: 'financial-capacity',
    name: 'Financial Capacity',
    description: 'Income level, debt-to-income ratio, and free cash flow patterns',
    overview: 'Your customer base shows diverse financial capacity ranging from high-income maximizers to budget-conscious planners. 40% demonstrate strong disposable income with low debt ratios.',
    segments: ['High-Income Maximizers', 'Middle-Income Planners', 'Financially At-Risk']
  },
  {
    id: 'credit-profile',
    name: 'Credit Profile', 
    description: 'Credit score distributions, payment history, and utilization rates',
    overview: 'Strong overall credit health with 65% of customers maintaining excellent scores above 750. Payment history shows consistent reliability across most segments.',
    segments: ['Prime Credit', 'Near-Prime', 'Credit Building']
  },
  {
    id: 'product-portfolio',
    name: 'Product Portfolio',
    description: 'Current product holdings and usage patterns across services',
    overview: 'Multi-product relationships are common, with 70% holding 3+ products. Savings and checking accounts anchor most relationships, with growing investment adoption.',
    segments: ['Multi-Product Users', 'Single-Product Focused', 'Investment-Heavy']
  },
  {
    id: 'digital-engagement',
    name: 'Digital Engagement',
    description: 'App usage frequency and digital transaction percentage',
    overview: 'Digital adoption accelerating with 80% using mobile banking monthly. Younger segments drive innovation adoption while older segments prefer hybrid approaches.',
    segments: ['Tech-Savvy', 'Multichannel', 'Offline First']
  },
  {
    id: 'life-stage',
    name: 'Life Stage',
    description: 'Age demographics, family status, and major life events',
    overview: 'Balanced distribution across life stages with growing millennial segment (35%) and stable Gen X presence (40%). Family formation driving product needs.',
    segments: ['Young Professionals', 'Family Builders', 'Empty Nesters']
  },
  {
    id: 'relationship-tenure',
    name: 'Relationship Tenure',
    description: 'Years as customer and account stability metrics',
    overview: 'Strong customer loyalty with average tenure of 8.5 years. Long-term customers (10+ years) represent 45% of the base and drive highest profitability.',
    segments: ['New Customers', 'Established', 'Long-Term Loyal']
  },
  {
    id: 'transaction-behavior',
    name: 'Transaction Behavior',
    description: 'Spending patterns, deposit frequency, and withdrawal habits',
    overview: 'Predictable transaction patterns with monthly direct deposits (75%) and regular bill pay usage. Spending shows seasonal variations with travel and holiday peaks.',
    segments: ['High Frequency', 'Steady Savers', 'Occasional Users']
  },
  {
    id: 'wealth-indicators',
    name: 'Wealth Indicators',
    description: 'Investable assets, property ownership, and investment activity',
    overview: 'Growing wealth concentration with 25% holding significant investable assets. Property ownership correlates strongly with long-term banking relationships.',
    segments: ['High Net Worth', 'Emerging Affluent', 'Asset Building']
  }
];

const OctagonViewPage = () => {
  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);
  const navigate = useNavigate();

  const handleAttributeSelect = (attribute: typeof attributes[0]) => {
    setSelectedAttribute(attribute);
  };

  const handleViewProfiles = () => {
    navigate(`/profiles/${selectedAttribute.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-gray-500 text-sm">Step 3 of 6</div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Customer Segmentation Map
          </h1>
          <p className="text-gray-600 mt-2">
            Our AI has identified 8 key attributes that define your customer landscape
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Octagon Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">Customer Segmentation Octagon</h2>
              <OctagonView selectedAttribute={selectedAttribute.id} />
            </div>
            
            {/* Attribute Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {attributes.map((attribute) => (
                <Button
                  key={attribute.id}
                  onClick={() => handleAttributeSelect(attribute)}
                  variant={selectedAttribute.id === attribute.id ? "default" : "outline"}
                  className={`p-3 h-auto text-xs ${
                    selectedAttribute.id === attribute.id 
                      ? 'bg-brand-500 hover:bg-brand-600 text-white' 
                      : 'hover:bg-brand-50 hover:border-brand-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{attribute.name}</div>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
          
          {/* Attribute Insight Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-fit p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">Attribute Insight</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-brand-600 mb-2">
                    {selectedAttribute.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedAttribute.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">General Overview</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedAttribute.overview}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Related Customer Segments</h4>
                  <div className="space-y-2">
                    {selectedAttribute.segments.map((segment, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-brand-500 rounded-full mr-2"></div>
                        <span className="text-gray-700">{segment}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleViewProfiles}
                  className="w-full mt-6 bg-brand-500 hover:bg-brand-600"
                >
                  See Related Customer Profiles
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Click the attribute buttons below the octagon to explore different customer dimensions. 
                  Each attribute reveals unique insights about your customer base.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OctagonViewPage;
