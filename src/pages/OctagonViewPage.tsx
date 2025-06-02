
import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import OctagonView from '../components/OctagonView';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

const unityIdToAttributeIdMap: { [key: string]: string } = {
  "Cylinder": "financial-capacity",
  "Cylinder (0)": "financial-capacity",
  "Cylinder (1)": "credit-profile",
  "Cylinder (2)": "product-portfolio",
  "Cylinder (3)": "digital-engagement",
  "Cylinder (4)": "life-stage",
  "Cylinder (5)": "relationship-tenure",
  "Cylinder (6)": "transaction-behavior",
  "Cylinder (7)": "wealth-indicators",
};

// Enhanced attributes with campaign performance data
const attributes = [
  {
    id: 'financial-capacity',
    name: 'Financial Capacity',
    description: 'Income level, debt-to-income ratio, and free cash flow patterns',
    overview: 'Your customer base shows diverse financial capacity ranging from high-income maximizers to budget-conscious planners. 40% demonstrate strong disposable income with low debt ratios.',
    segments: ['High-Income Maximizers', 'Middle-Income Planners', 'Financially At-Risk'],
    campaignPerformance: {
      engagement: 42.3,
      conversion: 8.9,
      status: 'high-performing',
      campaigns: ['Digital Onboarding Excellence'],
      notes: 'Strong mobile engagement - excellent digital adoption'
    }
  },
  {
    id: 'credit-profile',
    name: 'Credit Profile', 
    description: 'Credit score distributions, payment history, and utilization rates',
    overview: 'Strong overall credit health with 65% of customers maintaining excellent scores above 750. Payment history shows consistent reliability across most segments.',
    segments: ['Prime Credit', 'Near-Prime', 'Credit Building'],
    campaignPerformance: {
      engagement: 38.7,
      conversion: 7.2,
      status: 'high-performing',
      campaigns: ['Digital Onboarding Excellence'],
      notes: 'Good cross-sell opportunities for premium products'
    }
  },
  {
    id: 'product-portfolio',
    name: 'Product Portfolio',
    description: 'Current product holdings, product usage patterns, and cross-selling opportunities',
    overview: 'Diverse product adoption with 45% using multiple banking products. Strong opportunity for cross-selling investment and insurance products.',
    segments: ['Multi-Product Users', 'Single-Product Focus', 'Growth Potential'],
    campaignPerformance: {
      engagement: 35.1,
      conversion: 6.4,
      status: 'moderate-performing',
      campaigns: ['Digital Onboarding Excellence'],
      notes: 'Mixed results - segment needs refined targeting'
    }
  },
  {
    id: 'digital-engagement',
    name: 'Digital Engagement',
    description: 'App usage frequency, digital transaction percentage, and online behavior',
    overview: 'High digital adoption with 70% primarily using mobile banking. Younger demographics drive digital-first interactions.',
    segments: ['Digital Natives', 'Hybrid Users', 'Traditional Preference'],
    campaignPerformance: {
      engagement: 45.8,
      conversion: 9.1,
      status: 'high-performing',
      campaigns: ['Digital Onboarding Excellence', 'SMS Alert Optimization'],
      notes: 'Top performer - ideal for app-based campaigns'
    }
  },
  {
    id: 'life-stage',
    name: 'Life Stage',
    description: 'Age demographics, family status, and major life events impact',
    overview: 'Balanced distribution across life stages with growing millennial segment (35%). Life events strongly correlate with product needs.',
    segments: ['Young Professionals', 'Established Families', 'Pre-Retirement'],
    campaignPerformance: {
      engagement: 33.2,
      conversion: 5.8,
      status: 'moderate-performing',
      campaigns: ['Personalized Email Journey'],
      notes: 'Life-stage targeting shows promise but needs refinement'
    }
  },
  {
    id: 'relationship-tenure',
    name: 'Relationship Tenure',
    description: 'Years as customer, account stability, and loyalty indicators',
    overview: 'Strong customer retention with average tenure of 8.5 years. Long-term customers show higher product adoption and profitability.',
    segments: ['Legacy Loyalists', 'Established Customers', 'New Relationships'],
    campaignPerformance: {
      engagement: 29.4,
      conversion: 4.9,
      status: 'underperforming',
      campaigns: ['Interactive Web Experience'],
      notes: 'Traditional segments need different channel approach'
    }
  },
  {
    id: 'transaction-behavior',
    name: 'Transaction Behavior',
    description: 'Spending patterns, deposit frequency, withdrawal habits, and seasonal trends',
    overview: 'Consistent transaction patterns with 60% showing predictable monthly flows. Seasonal variations align with employment cycles.',
    segments: ['High-Volume Transactors', 'Steady Savers', 'Variable Spenders'],
    campaignPerformance: {
      engagement: 28.4,
      conversion: 4.2,
      status: 'underperforming',
      campaigns: ['Personalized Email Journey'],
      notes: 'Email CTR below average - consider SMS retargeting'
    }
  },
  {
    id: 'wealth-indicators',
    name: 'Wealth Indicators',
    description: 'Investable assets, property ownership, and investment activity',
    overview: 'Growing wealth concentration with 25% holding significant investable assets. Property ownership correlates strongly with long-term banking relationships.',
    segments: ['High Net Worth', 'Emerging Affluent', 'Asset Building'],
    campaignPerformance: {
      engagement: 31.6,
      conversion: 5.3,
      status: 'moderate-performing',
      campaigns: ['Interactive Web Experience'],
      notes: 'Wealth segments respond well to personalized approach'
    }
  }
];

const OctagonViewPage = () => {
  const [selectedAttribute, setSelectedAttribute] = useState(attributes[0]);
  const navigate = useNavigate();
  
  const unityInstanceRef = useRef<any>(null);

  const handleUnityInstanceLoaded = useCallback((instance: any) => {
    console.log("[OctagonViewPage] Unity instance loaded and stored:", instance);
    unityInstanceRef.current = instance;
  }, []);

  const handleAttributeSelectByButton = useCallback((attribute: typeof attributes[0]) => {
    console.log(`[OctagonViewPage] Attribute button clicked: '${attribute.name}' (ID: ${attribute.id})`);
    
    setSelectedAttribute(attribute);
    
    if (unityInstanceRef.current) {
      try {
        console.log(`[OctagonViewPage] Sending SelectSegmentByName to Unity: '${attribute.id}'`);
        unityInstanceRef.current.SendMessage("OctagonManager", "SelectSegmentByName", attribute.id);
      } catch (error) {
        console.error("[OctagonViewPage] Error sending message to Unity:", error);
      }
    } else {
      console.warn("[OctagonViewPage] Unity instance not available yet. Message not sent.");
    }
  }, []);

  const handleUnitySegmentClickedByUnity = useCallback((segmentIdFromUnity: string, isNowSelected: boolean) => {
    console.log(`[OctagonViewPage] Received from Unity: Segment ID='${segmentIdFromUnity}', Selected=${isNowSelected}`);

    const attributeId = unityIdToAttributeIdMap[segmentIdFromUnity] || segmentIdFromUnity;
    console.log(`[OctagonViewPage] ID de atributo mapeado: '${attributeId}'`);

    const clickedAttribute = attributes.find(attr => attr.id === attributeId);
    console.log("[OctagonViewPage] Atributo encontrado:", clickedAttribute);

    if (clickedAttribute) {
      if (isNowSelected) {
        setSelectedAttribute(clickedAttribute);
        console.log(`[OctagonViewPage] Atributo '${clickedAttribute.name}' seleccionado vía Unity.`);
      } else {
        if (selectedAttribute?.id === attributeId) {
          console.log(`[OctagonViewPage] Atributo '${clickedAttribute.name}' deseleccionado en Unity.`);
        }
      }
    } else {
      console.warn(`[OctagonViewPage] Atributo con ID mapeado '${attributeId}' (original de Unity: '${segmentIdFromUnity}') no encontrado en attributes array.`);
    }
  }, [selectedAttribute]);

  const handleViewProfiles = () => {
    navigate(`/profiles/${selectedAttribute.id}`);
  };

  const handleRetargetSegment = () => {
    navigate(`/campaigns/retargeting?segment=${selectedAttribute.id}&fromOctagon=true`);
  };

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case 'high-performing': return 'text-green-600';
      case 'moderate-performing': return 'text-yellow-600';
      case 'underperforming': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceIcon = (status: string) => {
    switch (status) {
      case 'high-performing': return TrendingUp;
      case 'moderate-performing': return Minus;
      case 'underperforming': return TrendingDown;
      default: return Minus;
    }
  };

  const getButtonStyle = (attribute: typeof attributes[0]) => {
    const baseStyle = "p-3 h-auto text-xs transition-all duration-200 ";
    const performanceStyle = attribute.campaignPerformance.status === 'high-performing' 
      ? 'ring-2 ring-green-400 bg-green-50 border-green-300 animate-pulse'
      : attribute.campaignPerformance.status === 'underperforming'
      ? 'ring-2 ring-red-400 bg-red-50 border-red-300'
      : 'ring-2 ring-yellow-400 bg-yellow-50 border-yellow-300';
    
    if (selectedAttribute.id === attribute.id) {
      return baseStyle + 'bg-brand-500 hover:bg-brand-600 text-white';
    }
    
    return baseStyle + 'hover:bg-brand-50 hover:border-brand-300 ' + performanceStyle;
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
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">High-performing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Moderate-performing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Underperforming</span>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">Customer Segmentation Octagon</h2>
              
              <OctagonView
                selectedAttribute={selectedAttribute.id}
                unityModelUrl="https://jovial-jelly-b61f41.netlify.app/"
                onOctagonSegmentClicked={handleUnitySegmentClickedByUnity}
                onUnityInstanceLoaded={handleUnityInstanceLoaded}
                height="500px"
              />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {attributes.map((attribute) => {
                const PerformanceIcon = getPerformanceIcon(attribute.campaignPerformance.status);
                return (
                  <Tooltip key={attribute.id}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleAttributeSelectByButton(attribute)}
                        variant="outline"
                        className={getButtonStyle(attribute)}
                      >
                        <div className="text-center">
                          <div className="font-medium">{attribute.name}</div>
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <PerformanceIcon className={`w-3 h-3 ${getPerformanceColor(attribute.campaignPerformance.status)}`} />
                            <span className={`text-xs ${getPerformanceColor(attribute.campaignPerformance.status)}`}>
                              {attribute.campaignPerformance.engagement}%
                            </span>
                          </div>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p><strong>Engagement:</strong> {attribute.campaignPerformance.engagement}%</p>
                        <p><strong>Conversion:</strong> {attribute.campaignPerformance.conversion}%</p>
                        <p><strong>Campaigns:</strong> {attribute.campaignPerformance.campaigns.join(', ')}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </motion.div>
          
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

                {/* Campaign Performance Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Campaign Performance
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Engagement Rate:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(selectedAttribute.campaignPerformance.status)}`}>
                        {selectedAttribute.campaignPerformance.engagement}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Conversion Rate:</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(selectedAttribute.campaignPerformance.status)}`}>
                        {selectedAttribute.campaignPerformance.conversion}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge 
                        className={
                          selectedAttribute.campaignPerformance.status === 'high-performing' 
                            ? 'bg-green-100 text-green-700'
                            : selectedAttribute.campaignPerformance.status === 'underperforming'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {selectedAttribute.campaignPerformance.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 italic">
                        {selectedAttribute.campaignPerformance.notes}
                      </p>
                    </div>
                  </div>
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
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleViewProfiles}
                    className="w-full bg-brand-500 hover:bg-brand-600"
                  >
                    See Related Customer Profiles
                  </Button>
                  
                  {selectedAttribute.campaignPerformance.status === 'underperforming' && (
                    <Button 
                      onClick={handleRetargetSegment}
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Retarget This Segment
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Colored segments show campaign performance. Click underperforming segments to launch retargeting campaigns.
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
