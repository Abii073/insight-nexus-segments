import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import MobileSegmentView from '../components/segments/MobileSegmentView';
import DesktopSegmentView from '../components/segments/DesktopSegmentView';
import SegmentCustomizationModal from '../components/segments/SegmentCustomizationModal';

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
  const [defaultRadarData] = useState([40, 60, 80, 70, 50, 90]);
  const [selectedPreset, setSelectedPreset] = useState('digital-first');
  const [segments, setSegments] = useState([]);
  const [defaultSegments, setDefaultSegments] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [segmentTags, setSegmentTags] = useState({});
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState(null);

  const attributeName = attributeNames[segmentId as keyof typeof attributeNames] || 'Unknown Attribute';
  const subdimensions = attributeSubdimensions[segmentId as keyof typeof attributeSubdimensions] || [];

  const availableTags = [
    'Growth Target',
    'High Churn Risk', 
    'Upsell Candidate',
    'At Risk',
    'Retention Focus',
    'Premium Potential'
  ];

  useEffect(() => {
    // Generate both current and default segments
    const currentSegs = generateSegments(radarData);
    const defaultSegs = generateSegments(defaultRadarData);
    setSegments(currentSegs);
    setDefaultSegments(defaultSegs);
  }, [radarData, segmentId]);

  const generateSegments = (data) => {
    const avgValue = data.reduce((sum, val) => sum + val, 0) / data.length;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
    let generatedSegments = [];
    
    if (segmentId === 'digital-engagement') {
      if (avgValue > 70) {
        generatedSegments = [
          {
            name: 'Digital Natives',
            percentage: Math.round(25 + (avgValue - 70) * 0.8),
            traits: ['High App Usage', 'Multi-channel', 'Early Adopters'],
            engagement: Math.min(95, avgValue + 10),
            risk: Math.max(5, 100 - avgValue),
            strategies: ['Premium digital features', 'Beta testing programs', 'Mobile-first campaigns']
          },
          {
            name: 'Tech-Savvy Professionals',
            percentage: Math.round(20 + (maxValue - avgValue) * 0.5),
            traits: ['Web-focused', 'Efficient', 'Business Tools'],
            engagement: Math.min(85, avgValue),
            risk: Math.max(10, 110 - avgValue),
            strategies: ['Business banking tools', 'API integrations', 'Professional services']
          },
          {
            name: 'Selective Digital Users',
            percentage: Math.round(30 - (avgValue - 50) * 0.3),
            traits: ['Basic Features', 'Cautious Adoption', 'Hybrid Preference'],
            engagement: Math.max(40, avgValue - 20),
            risk: Math.min(60, 120 - avgValue),
            strategies: ['Educational content', 'Guided tutorials', 'Support-heavy onboarding']
          }
        ];
      } else if (avgValue > 40) {
        generatedSegments = [
          {
            name: 'Emerging Digital',
            percentage: Math.round(35 + (avgValue - 40) * 0.6),
            traits: ['Learning Phase', 'Mobile-first', 'Support Needed'],
            engagement: Math.max(45, avgValue),
            risk: Math.min(55, 100 - avgValue + 10),
            strategies: ['Step-by-step guides', 'Customer support', 'Incentive programs']
          },
          {
            name: 'Traditional Preference',
            percentage: Math.round(40 - (avgValue - 30) * 0.4),
            traits: ['Branch Preference', 'Phone Support', 'Paper Statements'],
            engagement: Math.max(25, avgValue - 15),
            risk: Math.min(70, 110 - avgValue),
            strategies: ['Branch experiences', 'Personal relationship building', 'Print marketing']
          }
        ];
      } else {
        generatedSegments = [
          {
            name: 'Traditional Bankers',
            percentage: Math.round(60 + (40 - avgValue) * 0.5),
            traits: ['Branch Preference', 'Phone Support', 'Paper Statements'],
            engagement: Math.max(20, avgValue),
            risk: Math.min(80, 120 - avgValue),
            strategies: ['Branch experiences', 'Personal relationship building', 'Print marketing']
          }
        ];
      }
    } else {
      // Dynamic segments for other attributes based on data distribution
      generatedSegments = [
        {
          name: 'High Performers',
          percentage: Math.round(15 + (avgValue / 100) * 25),
          traits: ['Strong Metrics', 'Low Risk', 'High Value'],
          engagement: Math.max(70, avgValue + 5),
          risk: Math.max(10, 100 - avgValue),
          strategies: ['Premium services', 'Loyalty programs', 'Cross-selling opportunities']
        },
        {
          name: 'Growth Potential',
          percentage: Math.round(25 + ((maxValue - minValue) / 100) * 15),
          traits: ['Developing Metrics', 'Moderate Risk', 'Emerging Value'],
          engagement: Math.max(50, avgValue - 10),
          risk: Math.min(50, 80 - avgValue * 0.3),
          strategies: ['Education programs', 'Targeted offers', 'Relationship building']
        },
        {
          name: 'Standard Segment',
          percentage: Math.round(35 - (avgValue - 50) * 0.2),
          traits: ['Baseline Performance', 'Stable', 'Core Customer'],
          engagement: Math.max(40, avgValue - 5),
          risk: Math.max(20, 60 - avgValue * 0.2),
          strategies: ['Retention programs', 'Standard offerings', 'Regular check-ins']
        }
      ];
    }
    
    // Normalize percentages to sum to 100
    const totalPercentage = generatedSegments.reduce((sum, seg) => sum + seg.percentage, 0);
    generatedSegments = generatedSegments.map(seg => ({
      ...seg,
      percentage: Math.round((seg.percentage / totalPercentage) * 100)
    }));
    
    return generatedSegments;
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

  const handleRadarDataChange = (newData) => {
    setRadarData(newData);
    // Highlight updated segments with animation
    setHighlightedCard(Date.now());
    setTimeout(() => setHighlightedCard(null), 800);
  };

  const handleViewCampaigns = (segmentName: string) => {
    navigate(`/campaigns/${segmentId}?segment=${encodeURIComponent(segmentName)}`);
  };

  const handleTagSegment = (segmentName, tag) => {
    setSegmentTags(prev => ({
      ...prev,
      [segmentName]: tag
    }));
  };

  const handleSaveSegments = () => {
    console.log('Saving segments with tags:', segmentTags);
  };

  const handleExportSegments = () => {
    console.log('Exporting segments:', segments);
  };

  const avgConfiguration = Math.round(radarData.reduce((a, b) => a + b, 0) / radarData.length);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl p-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
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
              Tune the financial drivers to reshape customer groups. Your updated profiles appear live below based on your strategy.
            </p>
          </motion.div>

          {/* Mobile View */}
          <MobileSegmentView
            radarData={radarData}
            subdimensions={subdimensions}
            selectedPreset={selectedPreset}
            segments={segments}
            highlightedCard={highlightedCard}
            presetConfigurations={presetConfigurations}
            avgConfiguration={avgConfiguration}
            segmentTags={segmentTags}
            onRadarDataChange={handleRadarDataChange}
            onPresetChange={handlePresetChange}
            onViewCampaigns={handleViewCampaigns}
            onCustomizeOpen={() => setIsCustomizeOpen(true)}
            onSaveSegments={handleSaveSegments}
            onExportSegments={handleExportSegments}
          />

          {/* Desktop View */}
          <DesktopSegmentView
            radarData={radarData}
            subdimensions={subdimensions}
            selectedPreset={selectedPreset}
            segments={segments}
            highlightedCard={highlightedCard}
            presetConfigurations={presetConfigurations}
            avgConfiguration={avgConfiguration}
            segmentTags={segmentTags}
            onRadarDataChange={handleRadarDataChange}
            onPresetChange={handlePresetChange}
            onViewCampaigns={handleViewCampaigns}
            onCustomizeOpen={() => setIsCustomizeOpen(true)}
            onSaveSegments={handleSaveSegments}
            onExportSegments={handleExportSegments}
          />

          {/* Segment Customization Modal */}
          <SegmentCustomizationModal
            isOpen={isCustomizeOpen}
            onOpenChange={setIsCustomizeOpen}
            segments={segments}
            segmentTags={segmentTags}
            customTag={customTag}
            availableTags={availableTags}
            onTagSegment={handleTagSegment}
            onCustomTagChange={setCustomTag}
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SegmentProfilePage;
