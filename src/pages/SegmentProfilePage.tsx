import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Save, Download, BarChart3, Settings, Info, Zap } from 'lucide-react';

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
  const [compareMode, setCompareMode] = useState(false);
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

          {/* Mobile/Tablet View */}
          <div className="lg:hidden">
            <Tabs defaultValue="radar" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="radar" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Radar
                </TabsTrigger>
                <TabsTrigger value="segments" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Segments
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Summary
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="radar" className="mt-4">
                <Card className="p-6">
                  <div className="mb-4">
                    <Select value={selectedPreset} onValueChange={handlePresetChange}>
                      <SelectTrigger className="w-full">
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
                    onDataChange={handleRadarDataChange}
                  />
                </Card>
              </TabsContent>
              
              <TabsContent value="segments" className="mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {segments.length} profiles
                    </Badge>
                    <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Segment Classification</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
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
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {segments.map((segment, index) => (
                    <motion.div
                      key={segment.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: highlightedCard ? 1.02 : 1
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        scale: { duration: 0.3 }
                      }}
                      className={highlightedCard ? "animate-pulse" : ""}
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
              </TabsContent>
              
              <TabsContent value="summary" className="mt-4">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Impact Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Switch
                        checked={compareMode}
                        onCheckedChange={setCompareMode}
                        id="compare-mode-mobile"
                      />
                      <label htmlFor="compare-mode-mobile" className="text-sm font-medium">
                        Compare with Default
                      </label>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Configuration</span>
                        <span className="font-medium">{avgConfiguration}%</span>
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
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={handleSaveSegments} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleExportSegments} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop View - Horizontal Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
              {/* Left Zone - Interactive Radar (30%) */}
              <motion.div 
                className="col-span-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Interactive Radar
                    </h2>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adjust sliders to see real-time impact on segments</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <div className="mb-4">
                    <Select value={selectedPreset} onValueChange={handlePresetChange}>
                      <SelectTrigger className="w-full">
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
                    onDataChange={handleRadarDataChange}
                  />
                </Card>
              </motion.div>
              
              {/* Center Zone - Live Generated Segments (45%) */}
              <motion.div 
                className="col-span-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-green-500" />
                        Live Segments
                      </h3>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {segments.length} profiles
                      </Badge>
                    </div>
                    
                    <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Segment Classification</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
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
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="overflow-y-auto h-[calc(100%-80px)] space-y-3">
                    <AnimatePresence mode="wait">
                      {segments.map((segment, index) => (
                        <motion.div
                          key={`${segment.name}-${highlightedCard}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: highlightedCard ? 1.02 : 1
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ 
                            delay: index * 0.05,
                            scale: { duration: 0.3 }
                          }}
                          className={highlightedCard ? "animate-pulse" : ""}
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
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
              
              {/* Right Zone - Impact Summary (25%) */}
              <motion.div
                className="col-span-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="p-6 h-full">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-500" />
                    Impact Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Switch
                        checked={compareMode}
                        onCheckedChange={setCompareMode}
                        id="compare-mode-desktop"
                      />
                      <label htmlFor="compare-mode-desktop" className="text-sm font-medium">
                        Compare Mode
                      </label>
                    </div>
                    
                    <motion.div 
                      className="space-y-3"
                      animate={{ scale: highlightedCard ? 1.02 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-700">{avgConfiguration}%</div>
                          <div className="text-xs text-blue-600">Avg Configuration</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-gray-50 rounded text-center">
                          <div className="font-bold text-gray-800">{segments.length}</div>
                          <div className="text-xs text-gray-600">Segments</div>
                        </div>
                        <div className="p-2 bg-gray-50 rounded text-center">
                          <div className="font-bold text-gray-800">{Object.keys(segmentTags).length}</div>
                          <div className="text-xs text-gray-600">Tagged</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" onClick={handleSaveSegments} className="w-full">
                        <Save className="w-4 h-4 mr-2" />
                        Save Configuration
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleExportSegments} className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-md mt-6">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Tip:</strong> Watch segments update in real-time as you adjust the radar. High-impact changes create visual feedback.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SegmentProfilePage;
