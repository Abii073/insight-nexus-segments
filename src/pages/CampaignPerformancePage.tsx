
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, TrendingUp, Users, Target, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Logo from '../components/Logo';

const CampaignPerformancePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignName = searchParams.get('campaign') || 'Digital Onboarding Excellence';

  // Mock performance data
  const performanceSummary = {
    totalReach: 14250,
    engagementRate: 34.2,
    conversionRate: 6.8,
    churnReduction: 12.5,
    retargetingCandidates: 2340
  };

  const segmentPerformance = [
    {
      segment: 'Tech-Savvy Millennials',
      engagement: 42.3,
      conversions: 89,
      churnReduction: 15.2,
      notes: 'High impact - Excellent mobile engagement'
    },
    {
      segment: 'Digital Adopters',
      engagement: 38.7,
      conversions: 76,
      churnReduction: 11.8,
      notes: 'Consider retargeting for upsell opportunities'
    },
    {
      segment: 'Cash Flow Optimizers',
      engagement: 28.4,
      conversions: 34,
      churnReduction: 8.9,
      notes: 'Email CTR below average - try SMS approach'
    },
    {
      segment: 'Traditional Savers',
      engagement: 31.6,
      conversions: 45,
      churnReduction: 9.7,
      notes: 'Steady performance across all channels'
    }
  ];

  const channelData = [
    { channel: 'Email', ctr: 8.7 },
    { channel: 'SMS', ctr: 12.3 },
    { channel: 'App Push', ctr: 15.8 },
    { channel: 'Web Portal', ctr: 6.4 }
  ];

  const smartInsights = [
    "SMS showed 40% higher CTR than email - consider increasing SMS allocation for similar campaigns",
    "Tech-Savvy Millennials segment outperformed by 23% - excellent target for future digital initiatives",
    "Web Portal engagement was below average - recommend A/B testing different call-to-action placement",
    "Peak engagement occurred on weekday mornings (9-11 AM) - optimize timing for future campaigns"
  ];

  const chartConfig = {
    ctr: {
      label: "Click-Through Rate (%)",
      color: "#0066ff",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
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
          <div className="text-gray-500 text-sm">Campaign Performance</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campaign Results</h1>
          <p className="text-gray-600">Performance analysis for <Badge variant="outline" className="mx-1">{campaignName}</Badge></p>
        </motion.div>

        <div className="grid gap-6">
          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-600" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{performanceSummary.totalReach.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Reach</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{performanceSummary.engagementRate}%</div>
                  <div className="text-sm text-gray-600">Engagement Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{performanceSummary.conversionRate}%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{performanceSummary.churnReduction}%</div>
                  <div className="text-sm text-gray-600">Churn Reduction</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{performanceSummary.retargetingCandidates.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Retargeting Candidates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segment Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600" />
                Segment Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Engagement %</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Churn Reduction</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segmentPerformance.map((segment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{segment.segment}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={segment.engagement > 35 ? 'text-green-600 font-medium' : 'text-gray-600'}>
                            {segment.engagement}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{segment.conversions}</TableCell>
                      <TableCell className="text-orange-600 font-medium">{segment.churnReduction}%</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{segment.notes}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Channel Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand-600" />
                  Channel Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelData}>
                      <XAxis dataKey="channel" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="ctr" fill="var(--color-ctr)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Smart Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-brand-600" />
                  Smart Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {smartInsights.map((insight, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-brand-500">
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/campaigns/execution?campaign=' + encodeURIComponent(campaignName))}
              variant="outline"
            >
              Back to Execution View
            </Button>
            <Button 
              className="bg-brand-500 hover:bg-brand-600"
            >
              Export Report
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/octagon')}
            >
              Back to Segmentation Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformancePage;
