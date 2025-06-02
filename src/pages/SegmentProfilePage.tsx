import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import InteractiveRadarChart from '../components/InteractiveRadarChart';
import CustomerSegmentCard from '../components/CustomerSegmentCard';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Download, BarChart3 } from 'lucide-react';

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
  const [defaultRadarData] = useState([40, 60, 80, 70, 50, 90]); // Keep original for comparison
  const [selectedPreset, setSelectedPreset] = useState('digital-first');
  const [segments, setSegments] = useState([]);
  const [defaultSegments, setDefaultSegments] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [segmentTags, setSegmentTags] = useState({});

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
    // Implementation for saving segments
  };

  const handleExportSegments = () => {
    console.log('Exporting segments:', segments);
    // Implementation for exporting segments
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
            Tune the financial drivers to reshape customer groups. Your updated profiles appear live below based on your strategy.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Interactive Radar Section */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Interactive Radar Analysis</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={compareMode}
                      onCheckedChange={setCompareMode}
                      id="compare-mode"
                    />
                    <label htmlFor="compare-mode" className="text-sm font-medium">
                      Compare with Default
                    </label>
                  </div>
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
              </div>
              
              <div className={`grid ${compareMode ? 'grid-cols-2 gap-6' : 'grid-cols-1'}`}>
                <div>
                  {compareMode && <h3 className="text-lg font-semibold mb-3">Current Configuration</h3>}
                  <InteractiveRadarChart
                    data={radarData}
                    labels={subdimensions}
                    onDataChange={setRadarData}
                  />
                </div>
                
                {compareMode && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Default Configuration</h3>
                    <InteractiveRadarChart
                      data={defaultRadarData}
                      labels={subdimensions}
                      onDataChange={() => {}} // Read-only for comparison
                    />
                  </div>
                )}
              </div>
            </Card>
            
            {/* Dynamic Customer Segments */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">Generated Customer Segments</h3>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {segments.length} profiles
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleSaveSegments}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExportSegments}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className={`grid gap-4 ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                <div className="space-y-4">
                  {compareMode && <h4 className="font-medium text-gray-700">Current Segments</h4>}
                  {segments.map((segment, index) => (
                    <motion.div
                      key={`current-${segment.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CustomerSegmentCard
                        segment={{
                          ...segment,
                          name: `${segment.name} (${segment.percentage}%)`
                        }}
                        onViewCampaigns={() => handleViewCampaigns(segment.name)}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {compareMode && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Default Segments</h4>
                    {defaultSegments.map((segment, index) => (
                      <motion.div
                        key={`default-${segment.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="opacity-75"
                      >
                        <CustomerSegmentCard
                          segment={{
                            ...segment,
                            name: `${segment.name} (${segment.percentage}%)`
                          }}
                          onViewCampaigns={() => handleViewCampaigns(segment.name)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Segment Classification Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Segment Classification</h3>
              
              <div className="space-y-4">
                {segments.map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {segment.name}
                    </label>
                    <Select
                      value={segmentTags[segment.name] || ''}
                      onValueChange={(value) => handleTagSegment(segment.name, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Assign tag..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Custom Tag
                  </label>
                  <Input
                    placeholder="Enter custom tag..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                  />
                </div>
              </div>
            </Card>
            
            {/* Configuration Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Configuration Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Key Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Configuration</span>
                      <span className="font-medium">{Math.round(radarData.reduce((a, b) => a + b, 0) / radarData.length)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Segments Generated</span>
                      <span className="font-medium">{segments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tagged Segments</span>
                      <span className="font-medium">{Object.keys(segmentTags).length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Adjust the radar chart to see how different weightings affect your customer segments. Enable comparison mode to see changes vs. default.
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
