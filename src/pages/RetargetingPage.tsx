
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Target, TrendingDown, RefreshCcw, Mail, MessageSquare, Smartphone, Globe } from 'lucide-react';
import Logo from '../components/Logo';

const RetargetingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sourceCampaign = searchParams.get('campaign') || 'Digital Onboarding Excellence';
  
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [retargetChannel, setRetargetChannel] = useState('');
  const [retargetMessage, setRetargetMessage] = useState('');
  const [campaignTimeline, setCampaignTimeline] = useState('');

  // Mock low-performing segments data
  const lowPerformingSegments = [
    {
      id: 'cash-flow-optimizers',
      name: 'Cash Flow Optimizers',
      engagement: 28.4,
      conversions: 34,
      size: '2,340 customers',
      reason: 'Email CTR below average - try SMS approach',
      priority: 'high'
    },
    {
      id: 'traditional-savers',
      name: 'Traditional Savers',
      engagement: 31.6,
      conversions: 45,
      size: '1,890 customers',
      reason: 'Steady performance but room for improvement',
      priority: 'medium'
    },
    {
      id: 'digital-adopters-subset',
      name: 'Digital Adopters (Subset)',
      engagement: 35.2,
      conversions: 52,
      size: '980 customers',
      reason: 'Good engagement but low conversion - refine CTA',
      priority: 'medium'
    }
  ];

  const channels = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'mobile-app', label: 'Mobile App', icon: Smartphone },
    { value: 'web-portal', label: 'Web Portal', icon: Globe }
  ];

  const handleSegmentToggle = (segmentId: string) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleLaunchRetargeting = () => {
    // Navigate to campaign execution with retargeting parameters
    const retargetingCampaignName = `${sourceCampaign} - Retargeting`;
    navigate(`/campaigns/execution?campaign=${encodeURIComponent(retargetingCampaignName)}&isRetargeting=true`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
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
          <div className="text-gray-500 text-sm">Retargeting Campaign</div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Retargeting Campaign Builder
          </h1>
          <p className="text-gray-600">
            Re-engage low-performing segments from <Badge variant="outline" className="mx-1">{sourceCampaign}</Badge>
          </p>
        </motion.div>

        <div className="grid gap-6">
          {/* Segment Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Low-Performing Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowPerformingSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSegments.includes(segment.id)
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSegmentToggle(segment.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{segment.name}</h3>
                          <Badge className={getPriorityColor(segment.priority)}>
                            {segment.priority} priority
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                          <div>
                            <span className="text-gray-500">Engagement:</span>
                            <span className="font-medium text-red-600 ml-1">{segment.engagement}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Conversions:</span>
                            <span className="font-medium ml-1">{segment.conversions}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Size:</span>
                            <span className="font-medium ml-1">{segment.size}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{segment.reason}</p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={selectedSegments.includes(segment.id)}
                          onChange={() => handleSegmentToggle(segment.id)}
                          className="w-4 h-4 text-brand-600"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retargeting Campaign Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-brand-600" />
                Retargeting Campaign Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="channel">Select New Channel</Label>
                    <Select value={retargetChannel} onValueChange={setRetargetChannel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose retargeting channel" />
                      </SelectTrigger>
                      <SelectContent>
                        {channels.map((channel) => (
                          <SelectItem key={channel.value} value={channel.value}>
                            <div className="flex items-center gap-2">
                              <channel.icon className="w-4 h-4" />
                              {channel.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timeline">Campaign Timeline</Label>
                    <Select value={campaignTimeline} onValueChange={setCampaignTimeline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 Week Sprint</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="custom">Custom Timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Retargeting Message/CTA</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your retargeting message or call-to-action..."
                    value={retargetMessage}
                    onChange={(e) => setRetargetMessage(e.target.value)}
                    className="min-h-20"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Campaign Preview</h4>
                  <div className="text-sm text-blue-700">
                    <p><strong>Target:</strong> {selectedSegments.length} segment(s) selected</p>
                    <p><strong>Channel:</strong> {retargetChannel || 'Not selected'}</p>
                    <p><strong>Timeline:</strong> {campaignTimeline || 'Not selected'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Launch Controls */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleLaunchRetargeting}
              disabled={selectedSegments.length === 0 || !retargetChannel || !campaignTimeline}
              className="bg-brand-500 hover:bg-brand-600"
            >
              <Target className="w-4 h-4 mr-2" />
              Launch Retargeting Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetargetingPage;
