
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Target, 
  AlertTriangle, 
  RefreshCcw, 
  Download,
  Eye,
  Settings,
  Award,
  Smartphone,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import Logo from '../components/Logo';

const CampaignPerformancePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignName = searchParams.get('campaign') || 'Digital Onboarding Excellence';
  const [expandedSegment, setExpandedSegment] = useState<number | null>(null);
  const [chartView, setChartView] = useState<'engagement' | 'conversion' | 'retargeting'>('engagement');

  // Enhanced performance data with trends and sparklines
  const performanceSummary = {
    totalReach: { value: 14250, trend: 3.5, previous: 13750 },
    engagementRate: { value: 34.2, trend: 2.1, previous: 33.5 },
    conversionRate: { value: 6.8, trend: -0.3, previous: 7.0 },
    churnReduction: { value: 12.5, trend: 4.2, previous: 12.0 },
    retargetingCandidates: { value: 2340, trend: 8.1, previous: 2165 }
  };

  const segmentPerformance = [
    {
      segment: 'Tech-Savvy Millennials',
      engagement: 42.3,
      conversions: 89,
      churnReduction: 15.2,
      notes: 'High impact - Excellent mobile engagement',
      badge: 'strategic',
      trend: 'up',
      sparkline: [28, 32, 35, 42, 42],
      channels: { email: 38, mobile: 52, sms: 35 },
      nextAction: 'Scale budget allocation'
    },
    {
      segment: 'Digital Adopters',
      engagement: 38.7,
      conversions: 76,
      churnReduction: 11.8,
      notes: 'Consider retargeting for upsell opportunities',
      badge: 'configured',
      trend: 'stable',
      sparkline: [35, 37, 38, 39, 39],
      channels: { email: 42, mobile: 38, sms: 36 },
      nextAction: 'Launch retargeting campaign'
    },
    {
      segment: 'Cash Flow Optimizers',
      engagement: 28.4,
      conversions: 34,
      churnReduction: 8.9,
      notes: 'Email CTR below average - try SMS approach',
      badge: 'underperforming',
      trend: 'down',
      sparkline: [32, 30, 29, 28, 28],
      channels: { email: 22, mobile: 31, sms: 32 },
      nextAction: 'Adjust channel strategy'
    },
    {
      segment: 'Traditional Savers',
      engagement: 31.6,
      conversions: 45,
      churnReduction: 9.7,
      notes: 'Steady performance across all channels',
      badge: 'stable',
      trend: 'stable',
      sparkline: [30, 31, 32, 31, 32],
      channels: { email: 29, mobile: 33, sms: 33 },
      nextAction: 'Maintain current approach'
    }
  ];

  const channelData = {
    engagement: [
      { channel: 'Email', rate: 32.4 },
      { channel: 'Mobile App', rate: 45.8 },
      { channel: 'SMS', rate: 28.1 }
    ],
    conversion: [
      { channel: 'Email', rate: 5.7 },
      { channel: 'Mobile App', rate: 8.9 },
      { channel: 'SMS', rate: 4.2 }
    ],
    retargeting: [
      { channel: 'Email', rate: 780 },
      { channel: 'Mobile App', rate: 1200 },
      { channel: 'SMS', rate: 360 }
    ]
  };

  const smartInsights = [
    {
      icon: TrendingUp,
      title: "Mobile App Outstanding Performance",
      text: "Mobile App showed 40% higher engagement than email - consider increasing mobile allocation for future campaigns",
      priority: "high",
      action: "View Mobile Strategy"
    },
    {
      icon: Target,
      title: "Tech-Savvy Millennials Exceeding Expectations",
      text: "This segment outperformed by 23% - excellent target for future digital initiatives",
      priority: "medium",
      action: "Scale Segment"
    },
    {
      icon: AlertTriangle,
      title: "Email Optimization Opportunity",
      text: "Email engagement was below average - recommend A/B testing different call-to-action placement",
      priority: "medium",
      action: "Optimize Email"
    }
  ];

  const originalStrategy = {
    name: "Digital-First Strategy",
    weights: { mobile: 40, digital: 35, engagement: 25 },
    focus: "Mobile-centric onboarding with high engagement touchpoints"
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Target;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'strategic': return 'bg-purple-100 text-purple-700';
      case 'configured': return 'bg-blue-100 text-blue-700';
      case 'underperforming': return 'bg-red-100 text-red-700';
      case 'stable': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'strategic': return '🎯';
      case 'configured': return '⭐';
      case 'underperforming': return '⚠️';
      case 'stable': return '✅';
      default: return '📊';
    }
  };

  const chartConfig = {
    rate: {
      label: "Performance Rate",
      color: "#0066ff",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="md" />
          </div>
          <div className="text-gray-500 text-sm">Campaign Performance Analytics</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campaign Results Dashboard</h1>
          <div className="flex items-center gap-3">
            <p className="text-gray-600">Performance analysis for</p>
            <Badge variant="outline" className="font-medium">{campaignName}</Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-purple-100 text-purple-700 cursor-help">
                    {originalStrategy.name}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{originalStrategy.focus}</p>
                  <p className="text-xs mt-1">Mobile: {originalStrategy.weights.mobile}% | Digital: {originalStrategy.weights.digital}% | Engagement: {originalStrategy.weights.engagement}%</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {/* Performance Summary with Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <motion.div 
                  className="text-center p-4 bg-blue-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-blue-600">{performanceSummary.totalReach.value.toLocaleString()}</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">+{performanceSummary.totalReach.trend}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Total Reach</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-green-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-green-600">{performanceSummary.engagementRate.value}%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">+{performanceSummary.engagementRate.trend}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-purple-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-purple-600">{performanceSummary.conversionRate.value}%</div>
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-xs">{performanceSummary.conversionRate.trend}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-orange-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-orange-600">{performanceSummary.churnReduction.value}%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">+{performanceSummary.churnReduction.trend}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Churn Reduction</div>
                </motion.div>

                <motion.div 
                  className="text-center p-4 bg-red-50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-2xl font-bold text-red-600">{performanceSummary.retargetingCandidates.value.toLocaleString()}</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs">+{performanceSummary.retargetingCandidates.trend}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Retargeting Candidates</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Enhanced Segment Performance */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-600" />
                    Segment Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {segmentPerformance.map((segment, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-lg">{segment.segment}</h3>
                            <Badge className={getBadgeStyle(segment.badge)}>
                              {getBadgeIcon(segment.badge)} {segment.badge}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {React.createElement(getTrendIcon(segment.trend), {
                                className: `w-4 h-4 ${getTrendColor(segment.trend)}`
                              })}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExpandedSegment(expandedSegment === index ? null : index)}
                          >
                            {expandedSegment === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <div className="text-sm text-gray-600">Engagement</div>
                            <div className="text-xl font-bold text-blue-600">{segment.engagement}%</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Conversions</div>
                            <div className="text-xl font-bold text-green-600">{segment.conversions}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Churn Reduction</div>
                            <div className="text-xl font-bold text-orange-600">{segment.churnReduction}%</div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">{segment.notes}</p>
                        
                        {expandedSegment === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t pt-3 mt-3"
                          >
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="text-center">
                                <Mail className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                                <div className="text-sm font-medium">Email: {segment.channels.email}%</div>
                              </div>
                              <div className="text-center">
                                <Smartphone className="w-5 h-5 mx-auto mb-1 text-green-600" />
                                <div className="text-sm font-medium">Mobile: {segment.channels.mobile}%</div>
                              </div>
                              <div className="text-center">
                                <MessageSquare className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                                <div className="text-sm font-medium">SMS: {segment.channels.sms}%</div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">Recommended Action:</span>
                              <Button size="sm" variant="outline">{segment.nextAction}</Button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Smart Insights Panel */}
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-brand-600" />
                    Smart Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {smartInsights.map((insight, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-brand-500">
                        <div className="flex items-start gap-2 mb-2">
                          <insight.icon className="w-4 h-4 text-brand-600 mt-0.5" />
                          <h4 className="text-sm font-medium text-gray-800">{insight.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{insight.text}</p>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          {insight.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Channel Comparison with Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600" />
                Channel Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={chartView} onValueChange={(value: any) => setChartView(value)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="engagement">Engagement Rate</TabsTrigger>
                  <TabsTrigger value="conversion">Conversion</TabsTrigger>
                  <TabsTrigger value="retargeting">Retargeting Pool</TabsTrigger>
                </TabsList>
                
                <TabsContent value="engagement" className="space-y-4">
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={channelData.engagement}>
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
                
                <TabsContent value="conversion" className="space-y-4">
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={channelData.conversion}>
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
                
                <TabsContent value="retargeting" className="space-y-4">
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={channelData.retargeting}>
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Action Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/campaigns/execution?campaign=' + encodeURIComponent(campaignName))}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Execution View
            </Button>
            <Button 
              onClick={() => navigate('/campaigns/retargeting?campaign=' + encodeURIComponent(campaignName))}
              className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Create Retargeting Campaign
            </Button>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Reconfigure Strategy
            </Button>
            <Button 
              className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/octagon')}
              className="flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Back to Segmentation Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformancePage;
