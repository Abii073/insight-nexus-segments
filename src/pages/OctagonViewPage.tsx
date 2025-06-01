import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import OctagonView from '../components/OctagonView';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Attributes array with matching IDs for Unity communication
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
    description: 'Current product holdings, product usage patterns, and cross-selling opportunities',
    overview: 'Diverse product adoption with 45% using multiple banking products. Strong opportunity for cross-selling investment and insurance products.',
    segments: ['Multi-Product Users', 'Single-Product Focus', 'Growth Potential']
  },
  {
    id: 'digital-engagement',
    name: 'Digital Engagement',
    description: 'App usage frequency, digital transaction percentage, and online behavior',
    overview: 'High digital adoption with 70% primarily using mobile banking. Younger demographics drive digital-first interactions.',
    segments: ['Digital Natives', 'Hybrid Users', 'Traditional Preference']
  },
  {
    id: 'life-stage',
    name: 'Life Stage',
    description: 'Age demographics, family status, and major life events impact',
    overview: 'Balanced distribution across life stages with growing millennial segment (35%). Life events strongly correlate with product needs.',
    segments: ['Young Professionals', 'Established Families', 'Pre-Retirement']
  },
  {
    id: 'relationship-tenure',
    name: 'Relationship Tenure',
    description: 'Years as customer, account stability, and loyalty indicators',
    overview: 'Strong customer retention with average tenure of 8.5 years. Long-term customers show higher product adoption and profitability.',
    segments: ['Legacy Loyalists', 'Established Customers', 'New Relationships']
  },
  {
    id: 'transaction-behavior',
    name: 'Transaction Behavior',
    description: 'Spending patterns, deposit frequency, withdrawal habits, and seasonal trends',
    overview: 'Consistent transaction patterns with 60% showing predictable monthly flows. Seasonal variations align with employment cycles.',
    segments: ['High-Volume Transactors', 'Steady Savers', 'Variable Spenders']
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
  
  // Unity instance reference for React -> Unity communication
  const unityInstanceRef = useRef<any>(null);

  // Handle Unity instance loaded callback
  const handleUnityInstanceLoaded = useCallback((instance: any) => {
    console.log("[OctagonViewPage] Unity instance loaded and stored:", instance);
    unityInstanceRef.current = instance;
  }, []);

  // Handle attribute selection from React buttons (React -> Unity)
  const handleAttributeSelectByButton = useCallback((attribute: typeof attributes[0]) => {
    console.log(`[OctagonViewPage] Attribute button clicked: '${attribute.name}' (ID: ${attribute.id})`);
    
    // Update React state
    setSelectedAttribute(attribute);
    
    // Send message to Unity to focus camera on the corresponding segment
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

  // Handle segment clicks from Unity (Unity -> React)
  const handleUnitySegmentClickedByUnity = useCallback((segmentIdFromUnity: string, isNowSelected: boolean) => {
    console.log(`[OctagonViewPage] Received from Unity: Segment ID='${segmentIdFromUnity}', Selected=${isNowSelected}`);

    // Find the attribute corresponding to the ID received from Unity
    const clickedAttribute = attributes.find(attr => attr.id === segmentIdFromUnity);

    if (clickedAttribute) {
      if (isNowSelected) {
        // If the segment was SELECTED in Unity, update the React state
        setSelectedAttribute(clickedAttribute);
        console.log(`[OctagonViewPage] Attribute '${clickedAttribute.name}' selected via Unity.`);
      } else {
        // If the segment was DESELECTED in Unity, we keep the current selection
        // This prevents unwanted state resets when clicking other segments
        console.log(`[OctagonViewPage] Attribute '${clickedAttribute.name}' deselected in Unity. Keeping current UI selection.`);
      }
    } else {
      console.warn(`[OctagonViewPage] Attribute with ID '${segmentIdFromUnity}' not found in attributes array.`);
    }
  }, []);

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
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-center">Customer Segmentation Octagon</h2>
              
              {/* Enhanced OctagonView with two-way communication */}
              <OctagonView
                selectedAttribute={selectedAttribute.id}
                unityModelUrl="https://eloquent-lokum-c9f203.netlify.app/"
                onOctagonSegmentClicked={handleUnitySegmentClickedByUnity}
                onUnityInstanceLoaded={handleUnityInstanceLoaded}
                height="500px"
              />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {attributes.map((attribute) => (
                <Button
                  key={attribute.id}
                  onClick={() => handleAttributeSelectByButton(attribute)}
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
                  <strong>Tip:</strong> Click the attribute buttons below the octagon or interact directly with the 3D model to explore different customer dimensions.
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
