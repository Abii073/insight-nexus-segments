import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AttributeRhombus from '../components/AttributeRhombus';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Square, 
  Edit, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Globe,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Target,
  Lightbulb
} from 'lucide-react';
import Logo from '../components/Logo';
import { getAttributeBreakdown } from '../data/attributeBreakdowns';

const CampaignExecutionPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const campaignName = searchParams.get('campaign') || 'Digital Onboarding Excellence';
  const [isPaused, setIsPaused] = useState(false);

  // Mock campaign data
  const campaignData = {
    name: campaignName,
    targetSegments: ['Tech-Savvy Millennials', 'Digital Adopters'],
    channels: [
      { name: 'Email', icon: Mail, reach: 85, openRate: 32, color: 'bg-blue-500' },
      { name: 'Mobile App', icon: Smartphone, reach: 92, openRate: 45, color: 'bg-green-500' },
      { name: 'SMS', icon: MessageSquare, reach: 78, openRate: 28, color: 'bg-purple-500' }
    ],
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    status: isPaused ? 'Paused' : 'Running',
    estimatedReach: 15000,
    actualReach: 8750,
    progressPercent: 58,
    daysLeft: 8,
    metrics: {
      openRate: { value: 32.4, trend: 1.2, trending: 'up' },
      ctr: { value: 8.7, trend: -0.5, trending: 'down' },
      conversionRate: { value: 4.2, trend: 0.8, trending: 'up' }
    }
  };

  const timelineStages = [
    { stage: 'Launch', date: '2025-01-15', status: 'completed', note: 'Campaign went live successfully', engagement: '28.3% CTR' },
    { stage: 'Midpoint Check-in', date: '2025-01-30', status: 'completed', note: 'CTR spike observed - 12% above target', engagement: '34.7% CTR' },
    { stage: 'Engagement Peak', date: '2025-02-07', status: 'current', note: 'Peak engagement period ongoing', engagement: '12.3% CTR' },
    { stage: 'Optimization', date: '2025-02-10', status: 'pending', note: 'A/B test results review' },
    { stage: 'Wrap-up', date: '2025-02-15', status: 'pending', note: 'Final results compilation' }
  ];

  const aiSuggestions = [
    {
      type: 'performance',
      icon: TrendingUp,
      text: 'Mobile App is performing 1.5x better than SMS — consider shifting budget allocation.',
      action: 'Optimize Budget'
    },
    {
      type: 'forecast',
      icon: AlertCircle,
      text: 'Projected to underperform — increase mobile budget by 12% to hit targets.',
      action: 'View Forecast'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-100 text-green-700 animate-pulse';
      case 'Paused': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimelineStageColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500 animate-pulse';
      case 'pending': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getTrendIcon = (trending: string) => {
    return trending === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trending: string) => {
    return trending === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  // Get attribute breakdown for the primary segment
  const attributeBreakdown = getAttributeBreakdown('Tech-Savvy Millennials');

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
          <div className="text-gray-500 text-sm">Campaign Control Cockpit</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">Campaign Execution</h1>
          </div>
          <p className="text-gray-600">Real-time control and monitoring dashboard</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Performance Focus (65% - spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Summary Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {campaignData.name}
                        <Badge className={`${getStatusColor(campaignData.status)}`}>
                          {campaignData.status}
                        </Badge>
                      </CardTitle>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Target Segments: </span>
                        {campaignData.targetSegments.map((segment, index) => (
                          <Badge key={index} variant="outline" className="ml-1">{segment}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{campaignData.startDate} – {campaignData.endDate}</span>
                        <span>•</span>
                        <span>{campaignData.daysLeft} days left</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rhombus positioned in its own column without overlapping */}
                  <div className="flex-shrink-0">
                    <AttributeRhombus 
                      breakdown={attributeBreakdown}
                      size="md"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Campaign Progress</span>
                      <span className="text-lg font-bold text-brand-600">{campaignData.progressPercent}%</span>
                    </div>
                    <Progress value={campaignData.progressPercent} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Estimated: {campaignData.estimatedReach.toLocaleString()}</span>
                      <span>Actual: {campaignData.actualReach.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {campaignData.progressPercent < 70 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {campaignData.progressPercent}% progress with {campaignData.daysLeft} days left — projected shortfall detected
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Block */}
            <Card>
              <CardHeader>
                <CardTitle>Live Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-blue-700">Open Rate</div>
                      <div className="flex items-center gap-1">
                        {React.createElement(getTrendIcon(campaignData.metrics.openRate.trending), {
                          className: `w-4 h-4 ${getTrendColor(campaignData.metrics.openRate.trending)}`
                        })}
                        <span className={`text-xs ${getTrendColor(campaignData.metrics.openRate.trending)}`}>
                          {campaignData.metrics.openRate.trend > 0 ? '+' : ''}{campaignData.metrics.openRate.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{campaignData.metrics.openRate.value}%</div>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-green-700">Click-Through Rate</div>
                      <div className="flex items-center gap-1">
                        {React.createElement(getTrendIcon(campaignData.metrics.ctr.trending), {
                          className: `w-4 h-4 ${getTrendColor(campaignData.metrics.ctr.trending)}`
                        })}
                        <span className={`text-xs ${getTrendColor(campaignData.metrics.ctr.trending)}`}>
                          {campaignData.metrics.ctr.trend > 0 ? '+' : ''}{campaignData.metrics.ctr.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{campaignData.metrics.ctr.value}%</div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-purple-700">Conversion Rate</div>
                      <div className="flex items-center gap-1">
                        {React.createElement(getTrendIcon(campaignData.metrics.conversionRate.trending), {
                          className: `w-4 h-4 ${getTrendColor(campaignData.metrics.conversionRate.trending)}`
                        })}
                        <span className={`text-xs ${getTrendColor(campaignData.metrics.conversionRate.trending)}`}>
                          {campaignData.metrics.conversionRate.trend > 0 ? '+' : ''}{campaignData.metrics.conversionRate.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{campaignData.metrics.conversionRate.value}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignData.channels.map((channel, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <channel.icon className="w-4 h-4 text-brand-600" />
                          <span className="font-medium">{channel.name}</span>
                        </div>
                        <span className="text-sm font-bold">{channel.openRate}% Open</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${channel.color}`}
                            style={{ width: `${channel.openRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{channel.reach}% reach</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <suggestion.icon className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{suggestion.text}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        {suggestion.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Control & Timeline (35%) */}
          <div className="space-y-6">
            {/* Campaign Controls */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Campaign Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handlePause}
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Campaign
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Compact Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timelineStages.map((stage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getTimelineStageColor(stage.status)}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{stage.stage}</p>
                          <span className="text-xs text-gray-500">{stage.date}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{stage.note}</p>
                        {stage.engagement && (
                          <p className="text-xs text-blue-600 font-medium mt-1">{stage.engagement}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Top Performing Segment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-700 mb-1">Tech-Savvy Millennials</div>
                  <div className="text-lg font-bold text-green-600">42% of conversions</div>
                  <p className="text-xs text-green-600 mt-2">🚀 Exceeding expectations by 18%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => navigate('/campaigns/performance?campaign=' + encodeURIComponent(campaignName))}
            className="bg-brand-500 hover:bg-brand-600"
          >
            Switch to Performance Dashboard
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
  );
};

export default CampaignExecutionPage;
