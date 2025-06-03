
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../components/Logo';
import AttributeRhombus from '../components/AttributeRhombus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, MessageSquare, Smartphone, Globe } from 'lucide-react';
import { getAttributeBreakdown } from '../data/attributeBreakdowns';

const CampaignPage = () => {
  const { segmentId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const segmentName = searchParams.get('segment') || 'Unknown Segment';

  const campaigns = [
    {
      id: 1,
      title: 'Digital Onboarding Excellence',
      description: 'Streamlined mobile-first onboarding experience with progressive feature introduction',
      channel: 'Mobile App',
      icon: Smartphone,
      estimatedReach: '15,000 customers',
      expectedEngagement: '65%',
      timeline: '2-4 weeks',
      budget: '$25,000'
    },
    {
      id: 2,
      title: 'Personalized Email Journey',
      description: 'Behavioral trigger-based email series with personalized product recommendations',
      channel: 'Email',
      icon: Mail,
      estimatedReach: '50,000 customers',
      expectedEngagement: '28%',
      timeline: '6-8 weeks',
      budget: '$15,000'
    },
    {
      id: 3,
      title: 'Interactive Web Experience',
      description: 'Dynamic web portal with personalized dashboards and financial health insights',
      channel: 'Web Portal',
      icon: Globe,
      estimatedReach: '35,000 customers',
      expectedEngagement: '45%',
      timeline: '4-6 weeks',
      budget: '$40,000'
    },
    {
      id: 4,
      title: 'SMS Alert Optimization',
      description: 'Smart SMS notifications with AI-powered timing and content personalization',
      channel: 'SMS',
      icon: MessageSquare,
      estimatedReach: '80,000 customers',
      expectedEngagement: '72%',
      timeline: '1-2 weeks',
      budget: '$8,000'
    }
  ];

  const handleLaunchCampaign = (campaignTitle: string) => {
    navigate(`/campaigns/execution?campaign=${encodeURIComponent(campaignTitle)}`);
  };

  // Get attribute breakdown for the current segment
  const attributeBreakdown = getAttributeBreakdown(segmentName);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/profiles/${segmentId}`)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Logo size="md" />
          </div>
          <div className="text-gray-500 text-sm">Step 5 of 6</div>
        </header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Campaign Recommendations
          </h1>
          <p className="text-gray-600">
            Targeted campaigns optimized for <Badge variant="outline" className="mx-1">{segmentName}</Badge> segment
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid gap-6"
        >
          {campaigns.map((campaign, index) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow h-64 overflow-hidden">
              <div className="flex h-full">
                {/* Left Side - Full Height Rhombus (20% width) */}
                <div className="w-1/5 flex items-center justify-center relative bg-gradient-to-br from-blue-50 to-indigo-50">
                  <AttributeRhombus 
                    breakdown={attributeBreakdown}
                    size="lg"
                    className="w-24 h-24"
                  />
                </div>

                {/* Right Side - Content (80% width) */}
                <div className="w-4/5 flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <campaign.icon className="w-6 h-6 text-brand-600" />
                        <div className="flex-1">
                          <CardTitle className="text-xl">{campaign.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{campaign.channel}</Badge>
                        </div>
                      </div>
                      <Button 
                        className="bg-brand-500 hover:bg-brand-600"
                        onClick={() => handleLaunchCampaign(campaign.title)}
                      >
                        Launch Campaign
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-gray-600 mb-4">{campaign.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Est. Reach</span>
                        <p className="text-brand-600">{campaign.estimatedReach}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Expected Engagement</span>
                        <p className="text-green-600">{campaign.expectedEngagement}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Timeline</span>
                        <p className="text-gray-600">{campaign.timeline}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Budget</span>
                        <p className="text-gray-600">{campaign.budget}</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Button 
            onClick={() => navigate('/octagon')}
            variant="outline"
            className="mr-4"
          >
            Back to Segmentation Map
          </Button>
          <Button className="bg-brand-500 hover:bg-brand-600">
            Export All Campaigns
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignPage;
