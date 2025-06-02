
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, Square, Edit, Mail, MessageSquare, Smartphone, Globe } from 'lucide-react';
import Logo from '../components/Logo';

const CampaignExecutionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignName = searchParams.get('campaign') || 'Digital Onboarding Excellence';

  // Mock campaign data
  const campaignData = {
    name: campaignName,
    targetSegments: ['Tech-Savvy Millennials', 'Digital Adopters'],
    channels: [
      { name: 'Email', icon: Mail, reach: 85 },
      { name: 'Mobile App', icon: Smartphone, reach: 92 },
      { name: 'SMS', icon: MessageSquare, reach: 78 }
    ],
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    status: 'Running',
    estimatedReach: 15000,
    actualReach: 8750,
    progressPercent: 58,
    openRate: 32.4,
    ctr: 8.7,
    conversionRate: 4.2
  };

  const timelineStages = [
    { stage: 'Launch', date: '2025-01-15', status: 'completed', note: 'Campaign went live successfully' },
    { stage: 'Midpoint Check-in', date: '2025-01-30', status: 'completed', note: 'CTR spike observed - 12% above target' },
    { stage: 'Engagement Peak', date: '2025-02-07', status: 'current', note: 'Peak engagement period ongoing' },
    { stage: 'Optimization', date: '2025-02-10', status: 'pending', note: 'A/B test results review' },
    { stage: 'Wrap-up', date: '2025-02-15', status: 'pending', note: 'Final results compilation' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimelineStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
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
          <div className="text-gray-500 text-sm">Campaign Execution</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Campaign Execution</h1>
          <p className="text-gray-600">Monitor and control your active campaign performance</p>
        </motion.div>

        <div className="grid gap-6">
          {/* Campaign Overview Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{campaignData.name}</CardTitle>
                  <Badge className={`mt-2 ${getStatusColor(campaignData.status)}`}>
                    {campaignData.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm">
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Target Segments</h4>
                  <div className="space-y-1">
                    {campaignData.targetSegments.map((segment, index) => (
                      <Badge key={index} variant="secondary">{segment}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Channels Used</h4>
                  <div className="space-y-2">
                    {campaignData.channels.map((channel, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <channel.icon className="w-4 h-4 text-brand-600" />
                        <span className="text-sm">{channel.name}</span>
                        <span className="text-xs text-gray-500">({channel.reach}% reach)</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Timeline</h4>
                  <p className="text-sm text-gray-600">
                    {campaignData.startDate} – {campaignData.endDate}
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Estimated: {campaignData.estimatedReach.toLocaleString()}</span>
                      <span>Actual: {campaignData.actualReach.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaignData.actualReach / campaignData.estimatedReach) * 100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-lg font-bold text-brand-600">{campaignData.progressPercent}%</span>
                  </div>
                  <Progress value={campaignData.progressPercent} className="h-3" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{campaignData.openRate}%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{campaignData.ctr}%</div>
                    <div className="text-sm text-gray-600">Click-Through Rate</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{campaignData.conversionRate}%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  {timelineStages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                      <div className={`w-4 h-4 rounded-full ${getTimelineStageColor(stage.status)} mb-2`}></div>
                      <div className="text-sm font-medium text-center min-w-20">{stage.stage}</div>
                      <div className="text-xs text-gray-500 text-center">{stage.date}</div>
                      {stage.note && (
                        <div className="absolute top-6 mt-8 bg-gray-800 text-white text-xs p-2 rounded max-w-32 text-center z-10 opacity-0 hover:opacity-100 transition-opacity">
                          {stage.note}
                        </div>
                      )}
                      {index < timelineStages.length - 1 && (
                        <div className="absolute top-2 left-8 w-16 h-0.5 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => navigate('/campaigns/performance?campaign=' + encodeURIComponent(campaignName))}
              className="bg-brand-500 hover:bg-brand-600"
            >
              View Performance Dashboard
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

export default CampaignExecutionPage;
