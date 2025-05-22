
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import OctagonView from '../components/OctagonView';
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const OctagonViewPage = () => {
  useEffect(() => {
    // Add a toast notification to let users know about the WebGL interaction
    toast({
      title: "Interactive 3D Octagon Loaded",
      description: "Click and drag to rotate. Click on a segment to explore that customer profile.",
      duration: 5000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
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
            3D Octagon Segmentation Map
          </h1>
          <p className="text-gray-600 mt-2">
            Our AI has identified 8 distinct customer segments for your business
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <OctagonView />
          </motion.div>
          
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="h-full p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-4">How to use this view</h2>
              
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 text-brand-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Click and drag</p>
                    <p className="text-sm text-gray-500">Rotate the octagon to view different perspectives</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 text-brand-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Hover over segments</p>
                    <p className="text-sm text-gray-500">See basic information about each customer group</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 text-brand-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Click on a segment</p>
                    <p className="text-sm text-gray-500">View detailed profiles and insights</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="mr-3 text-brand-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Segment size</p>
                    <p className="text-sm text-gray-500">Larger segments represent a higher percentage of your customer base</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Focus on larger segments first to maximize your return on marketing investment.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Click on a segment to explore more detailed customer profiles and campaign recommendations.</p>
        </div>
      </div>
    </div>
  );
};

export default OctagonViewPage;
