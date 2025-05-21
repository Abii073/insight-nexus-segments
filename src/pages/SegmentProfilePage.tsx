
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from '../components/Logo';
import SegmentProfileCard from '../components/SegmentProfileCard';

type SegmentProfile = {
  id: string;
  title: string;
  description: string;
  traits: string[];
  behaviors: string[];
  demographics: string[];
  color: string;
};

// Dummy data for segment profiles
const segmentProfiles: Record<string, SegmentProfile> = {
  'tech-savvy': {
    id: 'tech-savvy',
    title: 'Tech-Savvy Professionals',
    description: 'Early adopters of technology who prefer digital interactions and self-service options.',
    traits: ['Digital-first', 'High income', 'Urban', 'Value convenience'],
    behaviors: ['Heavy mobile app usage', 'Frequent online research', 'Prefers self-service', 'Early adoption'],
    demographics: ['Age: 25-45', '60% Male', 'Urban locations', 'High education level'],
    color: '#3391f7'
  },
  'conservative': {
    id: 'conservative',
    title: 'Conservative Traditionalists',
    description: 'Risk-averse customers who prefer conventional products and personal interactions.',
    traits: ['Risk-averse', 'Brand loyal', 'Values stability', 'Traditional'],
    behaviors: ['Branch visits', 'Phone support', 'Consistent usage patterns', 'Low digital engagement'],
    demographics: ['Age: 45-65', '55% Female', 'Suburban areas', 'Moderate income'],
    color: '#6b7280'
  },
  'multichannel': {
    id: 'multichannel',
    title: 'Multichannel Maximizers',
    description: 'Customers who engage across all available channels depending on their needs.',
    traits: ['Adaptable', 'Highly engaged', 'Value options', 'Price-sensitive'],
    behaviors: ['Channel switching', 'Responsive to promotions', 'Moderate digital usage', 'Frequent engagement'],
    demographics: ['Age: 30-50', 'Even gender split', 'Varies by location', 'Medium to high income'],
    color: '#10b981'
  },
  'value-seekers': {
    id: 'value-seekers',
    title: 'Value Seekers',
    description: 'Price-conscious customers who prioritize finding the best deal available.',
    traits: ['Price sensitive', 'Comparison shoppers', 'Deal hunters', 'Low loyalty'],
    behaviors: ['Frequent price checking', 'Respond to promotions', 'Short customer lifecycle', 'Limited upsell potential'],
    demographics: ['Age: 25-55', '60% Female', 'Various locations', 'Moderate income'],
    color: '#f59e0b'
  },
  'luxury': {
    id: 'luxury',
    title: 'Premium Experience Lovers',
    description: 'High-value customers seeking personalized premium experiences.',
    traits: ['High income', 'Status conscious', 'Expect personalization', 'Less price sensitive'],
    behaviors: ['Premium product selection', 'High spend per transaction', 'Expect white-glove service', 'Loyal when satisfied'],
    demographics: ['Age: 35-65', 'Even gender split', 'Urban centers', 'High income and net worth'],
    color: '#8b5cf6'
  },
  'occasional': {
    id: 'occasional',
    title: 'Occasional Users',
    description: 'Infrequent customers who engage only for specific needs or occasions.',
    traits: ['Sporadic engagement', 'Low awareness', 'Task-oriented', 'Limited brand connection'],
    behaviors: ['Seasonal patterns', 'Low frequency', 'Basic product usage', 'Limited cross-category exploration'],
    demographics: ['Variable age range', 'Slight female majority', 'Various locations', 'Various income levels'],
    color: '#f97316'
  },
  'loyal': {
    id: 'loyal',
    title: 'Brand Loyalists',
    description: 'Long-term customers with high lifetime value and brand advocacy.',
    traits: ['High loyalty', 'Brand advocates', 'Relationship focused', 'Quality oriented'],
    behaviors: ['Regular engagement', 'Product recommendations', 'Responsive to loyalty programs', 'Multiple product usage'],
    demographics: ['Age: 35-60', 'Even gender split', 'Established communities', 'Medium to high income'],
    color: '#ec4899'
  },
  'at-risk': {
    id: 'at-risk',
    title: 'At-Risk Customers',
    description: 'Customers showing signs of disengagement who may be likely to churn.',
    traits: ['Decreasing engagement', 'Price sensitivity', 'Competitor awareness', 'Dissatisfaction indicators'],
    behaviors: ['Reduced usage', 'Support complaints', 'Competitive research', 'Negative sentiment'],
    demographics: ['Various age ranges', 'No specific gender skew', 'Various locations', 'Various income levels'],
    color: '#ef4444'
  }
};

// Define related segments for each profile
const relatedSegments: Record<string, string[]> = {
  'tech-savvy': ['multichannel', 'luxury'],
  'conservative': ['loyal', 'occasional'],
  'multichannel': ['tech-savvy', 'value-seekers'],
  'value-seekers': ['at-risk', 'multichannel'],
  'luxury': ['loyal', 'tech-savvy'],
  'occasional': ['at-risk', 'conservative'],
  'loyal': ['conservative', 'luxury'],
  'at-risk': ['value-seekers', 'occasional']
};

const SegmentProfilePage = () => {
  const navigate = useNavigate();
  const { segmentId } = useParams<{ segmentId: string }>();
  const [segment, setSegment] = useState<SegmentProfile | null>(null);
  
  useEffect(() => {
    if (segmentId && segmentProfiles[segmentId]) {
      setSegment(segmentProfiles[segmentId]);
    } else {
      // Handle invalid segment ID
      console.error("Invalid segment ID:", segmentId);
      navigate('/octagon');
    }
  }, [segmentId, navigate]);
  
  if (!segment) {
    return <div className="p-8 text-center">Loading segment profile...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-gray-500 text-sm">Step 4 of 6</div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Button 
              variant="outline" 
              onClick={() => navigate('/octagon')}
              className="mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Octagon
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-800">
              {segment.title}
            </h1>
            <p className="text-gray-600 mt-2">
              {segment.description}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button 
              onClick={() => navigate(`/campaigns/${segment.id}`)}
              className="bg-brand-500 hover:bg-brand-600"
            >
              View Suggested Campaigns
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6 bg-white shadow-sm">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="behaviors">Behaviors</TabsTrigger>
                  <TabsTrigger value="demographics">Demographics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Key Traits</h3>
                    <div className="flex flex-wrap gap-2">
                      {segment.traits.map((trait, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Engagement Level</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">65%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Customer Lifetime Value</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ width: '80%', backgroundColor: segment.color }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">High</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Churn Risk</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: segment.id === 'at-risk' ? '85%' : '30%',
                              backgroundColor: segment.id === 'at-risk' ? '#ef4444' : '#10b981'
                            }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">
                          {segment.id === 'at-risk' ? 'High' : 'Low'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Growth Potential</h3>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-500 h-2.5 rounded-full" 
                            style={{ 
                              width: ['tech-savvy', 'multichannel', 'luxury'].includes(segment.id) ? '75%' : '45%'
                            }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">
                          {['tech-savvy', 'multichannel', 'luxury'].includes(segment.id) ? 'High' : 'Medium'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Channel Preferences</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-gray-50 text-center">
                        <div className="flex justify-center">
                          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm font-medium">Email</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full" 
                            style={{ 
                              width: ['tech-savvy', 'multichannel'].includes(segment.id) ? '80%' : '50%',
                              backgroundColor: segment.color
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-gray-50 text-center">
                        <div className="flex justify-center">
                          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm font-medium">Mobile</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full" 
                            style={{ 
                              width: ['tech-savvy', 'luxury'].includes(segment.id) ? '95%' : '40%',
                              backgroundColor: segment.color
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-gray-50 text-center">
                        <div className="flex justify-center">
                          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm font-medium">Phone</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full" 
                            style={{ 
                              width: ['conservative', 'loyal'].includes(segment.id) ? '85%' : '30%',
                              backgroundColor: segment.color
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-gray-50 text-center">
                        <div className="flex justify-center">
                          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm font-medium">In-Person</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full" 
                            style={{ 
                              width: ['conservative', 'luxury'].includes(segment.id) ? '75%' : '25%',
                              backgroundColor: segment.color
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="behaviors" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Behavioral Patterns</h3>
                    <ul className="space-y-3">
                      {segment.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: segment.color }}
                          ></div>
                          <span>{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Purchase Frequency</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="h-40 flex items-end justify-between space-x-2">
                          {[65, 45, 80, 35, 90, 55, 70].map((height, index) => (
                            <div 
                              key={index}
                              className="w-8 rounded-t"
                              style={{
                                height: `${height}%`,
                                backgroundColor: segment.color,
                                opacity: 0.7 + (index * 0.04)
                              }}
                            ></div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Engagement Trajectory</h3>
                      <div className="p-4 bg-gray-50 rounded-lg h-52 relative">
                        <svg viewBox="0 0 100 50" className="w-full h-full">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor={segment.color} stopOpacity="0.4" />
                              <stop offset="100%" stopColor={segment.color} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          
                          {/* Area chart */}
                          <path
                            d={
                              segment.id === 'at-risk' 
                                ? "M0,10 L10,8 L20,15 L30,12 L40,20 L50,25 L60,30 L70,35 L80,40 L90,45 L100,50 L100,50 L0,50 Z"
                                : "M0,30 L10,28 L20,25 L30,20 L40,15 L50,12 L60,10 L70,8 L80,7 L90,9 L100,8 L100,50 L0,50 Z"
                            }
                            fill="url(#gradient)"
                          />
                          
                          {/* Line */}
                          <path
                            d={
                              segment.id === 'at-risk' 
                                ? "M0,10 L10,8 L20,15 L30,12 L40,20 L50,25 L60,30 L70,35 L80,40 L90,45 L100,50"
                                : "M0,30 L10,28 L20,25 L30,20 L40,15 L50,12 L60,10 L70,8 L80,7 L90,9 L100,8"
                            }
                            fill="none"
                            stroke={segment.color}
                            strokeWidth="2"
                          />
                          
                          {/* Data points */}
                          {segment.id === 'at-risk'
                            ? [
                                { x: 0, y: 10 }, { x: 10, y: 8 }, { x: 20, y: 15 }, 
                                { x: 30, y: 12 }, { x: 40, y: 20 }, { x: 50, y: 25 }, 
                                { x: 60, y: 30 }, { x: 70, y: 35 }, { x: 80, y: 40 }, 
                                { x: 90, y: 45 }, { x: 100, y: 50 }
                              ].map((point, index) => (
                                <circle 
                                  key={index} 
                                  cx={point.x} 
                                  cy={point.y} 
                                  r="1.5" 
                                  fill="white" 
                                  stroke={segment.color} 
                                  strokeWidth="1" 
                                />
                              ))
                            : [
                                { x: 0, y: 30 }, { x: 10, y: 28 }, { x: 20, y: 25 }, 
                                { x: 30, y: 20 }, { x: 40, y: 15 }, { x: 50, y: 12 }, 
                                { x: 60, y: 10 }, { x: 70, y: 8 }, { x: 80, y: 7 }, 
                                { x: 90, y: 9 }, { x: 100, y: 8 }
                              ].map((point, index) => (
                                <circle 
                                  key={index} 
                                  cx={point.x} 
                                  cy={point.y} 
                                  r="1.5" 
                                  fill="white" 
                                  stroke={segment.color} 
                                  strokeWidth="1" 
                                />
                              ))
                          }
                        </svg>
                        <div className="absolute bottom-2 left-4 text-xs text-gray-500">3 months ago</div>
                        <div className="absolute bottom-2 right-4 text-xs text-gray-500">Today</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="demographics" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Demographics</h3>
                      <ul className="space-y-3">
                        {segment.demographics.map((demo, index) => (
                          <li key={index} className="flex items-center">
                            <div 
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: segment.color }}
                            ></div>
                            <span>{demo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Geographic Distribution</h3>
                      <div className="p-4 bg-gray-50 rounded-lg h-48 flex items-center justify-center">
                        {/* Placeholder for geo distribution */}
                        <p className="text-gray-500 text-sm">
                          Geographic visualization would appear here in a live application
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Technology Adoption</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Mobile</span>
                              <span>{['tech-savvy', 'multichannel'].includes(segment.id) ? '95%' : '60%'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="rounded-full h-1.5" 
                                style={{ 
                                  width: ['tech-savvy', 'multichannel'].includes(segment.id) ? '95%' : '60%',
                                  backgroundColor: segment.color 
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Web</span>
                              <span>{['tech-savvy', 'multichannel', 'value-seekers'].includes(segment.id) ? '85%' : '50%'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="rounded-full h-1.5" 
                                style={{ 
                                  width: ['tech-savvy', 'multichannel', 'value-seekers'].includes(segment.id) ? '85%' : '50%',
                                  backgroundColor: segment.color 
                                }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Smart devices</span>
                              <span>{['tech-savvy', 'luxury'].includes(segment.id) ? '75%' : '30%'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="rounded-full h-1.5" 
                                style={{ 
                                  width: ['tech-savvy', 'luxury'].includes(segment.id) ? '75%' : '30%',
                                  backgroundColor: segment.color 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Income Distribution</h3>
                      <div className="p-4 bg-gray-50 rounded-lg h-52">
                        <div className="h-36 relative">
                          {/* Placeholder for income distribution chart */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-36 h-36 rounded-full border-8 border-gray-200 relative">
                              <div 
                                className="absolute inset-0 rounded-full" 
                                style={{ 
                                  clipPath: segment.id === 'luxury' ? 
                                    'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)' : 
                                    segment.id === 'tech-savvy' ?
                                    'polygon(50% 50%, 50% 0, 100% 0, 100% 75%, 50% 75%)' :
                                    'polygon(50% 50%, 50% 0, 75% 0, 75% 50%)',
                                  backgroundColor: segment.color 
                                }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                                {segment.id === 'luxury' ? 'High' : segment.id === 'tech-savvy' ? 'Above avg' : 'Average'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
          
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Related Segments</h2>
            <div className="space-y-4">
              {relatedSegments[segment.id]?.map((relatedId, index) => (
                <SegmentProfileCard
                  key={relatedId}
                  id={relatedId}
                  title={segmentProfiles[relatedId].title}
                  description={segmentProfiles[relatedId].description}
                  traits={segmentProfiles[relatedId].traits.slice(0, 3)}
                  color={segmentProfiles[relatedId].color}
                  delay={index}
                />
              ))}
            </div>
            
            <Button 
              onClick={() => navigate(`/campaigns/${segment.id}`)}
              className="w-full mt-6 bg-brand-500 hover:bg-brand-600"
            >
              View Suggested Campaigns
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfilePage;
