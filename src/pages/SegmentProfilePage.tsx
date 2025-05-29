
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InteractiveRadarChart from '../components/InteractiveRadarChart';
import CustomerSegmentCard from '../components/CustomerSegmentCard';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';

// Subdimensions for each octagon attribute
const attributeSubdimensions = {
  'financial-capacity': [
    'Income Stability',
    'Debt Management',
    'Savings Behavior',
    'Investment Activity',
    'Credit Utilization',
    'Cash Flow Patterns'
  ],
  'credit-profile': [
    'Payment History',
    'Credit Age',
    'Credit Mix',
    'New Credit',
    'Utilization Rate',
    'Dispute History'
  ],
  'product-portfolio': [
    'Account Diversity',
    'Product Usage',
    'Service Frequency',
    'Feature Adoption',
    'Cross-selling',
    'Product Satisfaction'
  ],
  'digital-engagement': [
    'App Usage Frequency',
    'Web Login Behavior',
    'Email Engagement',
    'Self-Service Preference',
    'Mobile vs Desktop',
    'Channel Switching'
  ],
  'life-stage': [
    'Age Cohort',
    'Family Status',
    'Career Stage',
    'Life Events',
    'Geographic Mobility',
    'Social Connections'
  ],
  'relationship-tenure': [
    'Account Age',
    'Service History',
    'Loyalty Programs',
    'Referral Activity',
    'Complaint History',
    'Relationship Depth'
  ],
  'transaction-behavior': [
    'Transaction Volume',
    'Payment Methods',
    'Spending Categories',
    'Seasonal Patterns',
    'Geographic Spread',
    'Time Preferences'
  ],
  'wealth-indicators': [
    'Asset Diversification',
    'Investment Knowledge',
    'Risk Tolerance',
    'Wealth Growth',
    'Professional Services',
    'Luxury Spending'
  ]
};

const attributeNames = {
  'financial-capacity': 'Financial Capacity',
  'credit-profile': 'Credit Profile',
  'product-portfolio': 'Product Portfolio',
  'digital-engagement': 'Digital Engagement',
  'life-stage': 'Life Stage',
  'relationship-tenure': 'Relationship Tenure',
  'transaction-behavior': 'Transaction Behavior',
  'wealth-indicators': 'Wealth Indicators'
};

const presetConfigurations = {
  'aggressive-growth': 'Aggressive Growth Focus',
  'retention-focused': 'Customer Retention Focus',
  'digital-first': 'Digital-First Strategy',
  'risk-conservative': 'Risk Conservative Approach'
};

const SegmentProfilePage = () => {
  const { segmentId } = useParams();
  const navigate = useNavigate();
  const [radarData, setRadarData] = useState([40, 60, 80, 70, 50, 90]);
  const [selectedPreset, setSelectedPreset] = useState('digital-first');
  const [segments, setSegments] = useState([]);

  const attributeName = attributeNames[segmentId as keyof typeof attributeNames] || 'Unknown Attribute';
  const subdimensions = attributeSubdimensions[segmentId as keyof typeof attributeSubdimensions] || [];

  useEffect(() => {
    // Generate segments based on radar configuration
    generateSegments();
  }, [radarData, segmentId]);

  const generateSegments = () => {
    // Dynamic segment generation based on radar values
    const avgValue = radarData.reduce((sum, val) => sum + val, 0) / radarData.length;
    
    let generatedSegments = [];
    
    if (segmentId === 'digital-engagement') {
      if (avgValue > 70) {
        generatedSegments = [
          {
            name: 'Digital Natives',
            traits: ['High App Usage', 'Multi-channel', 'Early Adopters'],
            engagement: 85,
            risk: 15,
            strategies: ['Premium digital features', 'Beta testing programs', 'Mobile-first campaigns']
          },
          {
            name: 'Tech-Savvy Professionals',
            traits: ['Web-focused', 'Efficient', 'Business Tools'],
            engagement: 75,
            risk: 20,
            strategies: ['Business banking tools', 'API integrations', 'Professional services']
          }
        ];
      } else if (avgValue > 40) {
        generatedSegments = [
          {
            name: 'Selective Digital Users',
            traits: ['Basic Features', 'Cautious Adoption', 'Hybrid Preference'],
            engagement: 60,
            risk: 35,
            strategies: ['Educational content', 'Guided tutorials', 'Support-heavy onboarding']
          },
          {
            name: 'Emerging Digital',
            traits: ['Learning Phase', 'Mobile-first', 'Support Needed'],
            engagement: 55,
            risk: 40,
            strategies: ['Step-by-step guides', 'Customer support', 'Incentive programs']
          }
        ];
      } else {
        generatedSegments = [
          {
            name: 'Traditional Bankers',
            traits: ['Branch Preference', 'Phone Support', 'Paper Statements'],
            engagement: 30,
            risk: 60,
            strategies: ['Branch experiences', 'Personal relationship building', 'Print marketing']
          }
        ];
      }
    } else {
      // Default segments for other attributes
      generatedSegments = [
        {
          name: 'High Performers',
          traits: ['Strong Metrics', 'Low Risk', 'High Value'],
          engagement: Math.max(70, avgValue),
          risk: Math.max(10, 100 - avgValue),
          strategies: ['Premium services', 'Loyalty programs', 'Cross-selling opportunities']
        },
        {
          name: 'Developing Segment',
          traits: ['Growth Potential', 'Moderate Risk', 'Emerging Value'],
          engagement: Math.max(50, avgValue - 20),
          risk: Math.min(50, avgValue),
          strategies: ['Education programs', 'Targeted offers', 'Relationship building']
        }
      ];
    }
    
    setSegments(generatedSegments);
  };

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    // Update radar data based on preset
    switch (preset) {
      case 'aggressive-growth':
        setRadarData([90, 85, 80, 75, 70, 95]);
        break;
      case 'retention-focused':
        setRadarData([60, 90, 95, 85, 80, 70]);
        break;
      case 'digital-first':
        setRadarData([95, 90, 85, 80, 75, 85]);
        break;
      case 'risk-conservative':
        setRadarData([50, 60, 70, 65, 55, 60]);
        break;
      default:
        setRadarData([40, 60, 80, 70, 50, 90]);
    }
  };

  const handleViewCampaigns = (segmentName: string) => {
    navigate(`/campaigns/${segmentId}?segment=${encodeURIComponent(segmentName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/octagon')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="md" />
          </div>
          <div className="text-gray-500 text-sm">Step 4 of 6</div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            {attributeName} – Deep Segmentation View
          </h1>
          <p className="text-gray-600 mt-2">
            Explore key behavioral and contextual drivers that define this attribute. Adjust the subdimensions to refine customer segmentation insights.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Hexagon Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Interactive Radar Analysis</h2>
                <Select value={selectedPreset} onValueChange={handlePresetChange}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select configuration preset" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(presetConfigurations).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <InteractiveRadarChart
                data={radarData}
                labels={subdimensions}
                onDataChange={setRadarData}
              />
            </Card>
            
            {/* Customer Segments Output */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Customer Segments</h3>
              <div className="grid gap-4">
                {segments.map((segment, index) => (
                  <CustomerSegmentCard
                    key={index}
                    segment={segment}
                    onViewCampaigns={() => handleViewCampaigns(segment.name)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Configuration Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Configuration Controls</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Attribute Subdimensions</h4>
                  <div className="space-y-2">
                    {subdimensions.map((dimension, index) => (
                      <div key={dimension} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{dimension}</span>
                        <span className="font-medium text-brand-600">{radarData[index]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Adjust the radar chart by dragging the points or use preset configurations above. 
                    The customer segments will update automatically based on your configuration.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-md">
                  <p className="text-sm text-green-800">
                    <strong>Next Step:</strong> Review the generated segments below and click "View Suggested Campaigns" 
                    to see targeted marketing strategies for each segment.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfilePage;
