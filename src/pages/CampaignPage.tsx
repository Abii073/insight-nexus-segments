
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Logo from '../components/Logo';
import CampaignCard from '../components/CampaignCard';

type Campaign = {
  id: string;
  title: string;
  description: string;
  channel: string;
  impact: string;
  objective: string;
};

// Dummy campaign data organized by segment
const campaignsBySegment: Record<string, Campaign[]> = {
  'tech-savvy': [
    {
      id: 'ts-1',
      title: 'Mobile App Feature Launch',
      description: 'Early access to new advanced features through our mobile app with exclusive digital rewards.',
      channel: 'App',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'ts-2',
      title: 'Digital Innovation Webinar',
      description: 'Virtual event showcasing upcoming technology integrations with exclusive Q&A session.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Engagement'
    },
    {
      id: 'ts-3',
      title: 'AI-Powered Recommendations',
      description: 'Personalized product suggestions based on browsing history and purchase patterns.',
      channel: 'App',
      impact: 'High',
      objective: 'Conversion'
    },
    {
      id: 'ts-4',
      title: 'Digital Early Access Program',
      description: 'Beta testing program for upcoming digital services with feedback collection.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Loyalty'
    }
  ],
  'conservative': [
    {
      id: 'con-1',
      title: 'Legacy Customer Appreciation',
      description: 'Special benefits and priority service for long-term customers with personalized offers.',
      channel: 'Phone',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'con-2',
      title: 'Traditional Values Campaign',
      description: 'Highlighting our commitment to stability, security, and trusted service through direct mail.',
      channel: 'Mail',
      impact: 'Medium',
      objective: 'Loyalty'
    },
    {
      id: 'con-3',
      title: 'In-Person Consultation Series',
      description: 'One-on-one meetings with specialists to discuss product options and address questions.',
      channel: 'In-Person',
      impact: 'High',
      objective: 'Conversion'
    }
  ],
  'multichannel': [
    {
      id: 'mc-1',
      title: 'Omnichannel Experience Enhancement',
      description: 'Seamless integration across all customer touchpoints with consistent messaging and offers.',
      channel: 'Multiple',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'mc-2',
      title: 'Channel Preference Rewards',
      description: 'Special benefits for engaging across multiple channels with tiered rewards system.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Engagement'
    },
    {
      id: 'mc-3',
      title: 'Cross-Channel Promotion',
      description: 'Special offers that incentivize using complementary channels for different activities.',
      channel: 'Multiple',
      impact: 'High',
      objective: 'Conversion'
    },
    {
      id: 'mc-4',
      title: 'Unified Communications Strategy',
      description: 'Coordinated messaging across all channels that creates a coherent customer journey.',
      channel: 'Multiple',
      impact: 'Medium',
      objective: 'Loyalty'
    }
  ],
  'value-seekers': [
    {
      id: 'vs-1',
      title: 'Price Match Guarantee Plus',
      description: 'Enhanced price matching with additional 5% discount when competitors offer lower prices.',
      channel: 'Email',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'vs-2',
      title: 'Flash Deal Notifications',
      description: 'Real-time alerts on limited-time offers with countdown timers through SMS and app.',
      channel: 'SMS',
      impact: 'High',
      objective: 'Conversion'
    },
    {
      id: 'vs-3',
      title: 'Bundle and Save Program',
      description: 'Special product bundles designed to maximize value and encourage multiple purchases.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Acquisition'
    }
  ],
  'luxury': [
    {
      id: 'lux-1',
      title: 'VIP Experience Program',
      description: 'Exclusive events and personalized service for premium customers with concierge support.',
      channel: 'Phone',
      impact: 'High',
      objective: 'Loyalty'
    },
    {
      id: 'lux-2',
      title: 'Premium Product Preview',
      description: 'Early access to new premium products with personalized consultations.',
      channel: 'In-Person',
      impact: 'High',
      objective: 'Conversion'
    },
    {
      id: 'lux-3',
      title: 'Luxury Lifestyle Partnership',
      description: 'Collaboration with luxury brands for exclusive benefits and co-branded experiences.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Engagement'
    }
  ],
  'occasional': [
    {
      id: 'occ-1',
      title: 'Reactivation Incentive',
      description: 'Special one-time offer to re-engage with strong incentives for returning customers.',
      channel: 'Email',
      impact: 'Medium',
      objective: 'Reactivation'
    },
    {
      id: 'occ-2',
      title: 'Seasonal Reminder Campaign',
      description: 'Timely notifications of relevant products/services based on previous purchase timing.',
      channel: 'SMS',
      impact: 'Medium',
      objective: 'Conversion'
    },
    {
      id: 'occ-3',
      title: 'No-Pressure Educational Content',
      description: 'Informational content that builds brand awareness without immediate sales pressure.',
      channel: 'Email',
      impact: 'Low',
      objective: 'Engagement'
    }
  ],
  'loyal': [
    {
      id: 'loy-1',
      title: 'Loyalty Milestone Rewards',
      description: 'Special benefits activated at key relationship milestones with personalized appreciation.',
      channel: 'Multiple',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'loy-2',
      title: 'Brand Advocate Program',
      description: 'Referral incentives and recognition for customers who bring in new business.',
      channel: 'Email',
      impact: 'High',
      objective: 'Advocacy'
    },
    {
      id: 'loy-3',
      title: 'Premium Service Upgrade',
      description: 'Complimentary service enhancements for loyal customers with priority support.',
      channel: 'App',
      impact: 'Medium',
      objective: 'Loyalty'
    }
  ],
  'at-risk': [
    {
      id: 'ar-1',
      title: 'Retention Rescue Package',
      description: 'Personalized offers specifically designed to address likely reasons for potential churn.',
      channel: 'Phone',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'ar-2',
      title: 'Feedback and Resolution Campaign',
      description: 'Proactive outreach to collect feedback and immediately address concerns.',
      channel: 'Email',
      impact: 'High',
      objective: 'Retention'
    },
    {
      id: 'ar-3',
      title: 'Win-Back Incentive',
      description: 'Special time-limited offer designed to re-establish relationship with meaningful value.',
      channel: 'Multiple',
      impact: 'Medium',
      objective: 'Reactivation'
    }
  ]
};

const CampaignPage = () => {
  const navigate = useNavigate();
  const { segmentId } = useParams<{ segmentId: string }>();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [objectiveFilter, setObjectiveFilter] = useState('all');
  const [channelFilter, setChannelFilter] = useState('all');
  const [impactFilter, setImpactFilter] = useState('all');
  
  useEffect(() => {
    if (segmentId && campaignsBySegment[segmentId]) {
      setCampaigns(campaignsBySegment[segmentId]);
      setFilteredCampaigns(campaignsBySegment[segmentId]);
    } else {
      // Handle invalid segment ID
      console.error("Invalid segment ID:", segmentId);
      navigate('/octagon');
    }
  }, [segmentId, navigate]);
  
  useEffect(() => {
    let result = [...campaigns];
    
    if (objectiveFilter !== 'all') {
      result = result.filter(campaign => 
        campaign.objective.toLowerCase() === objectiveFilter.toLowerCase()
      );
    }
    
    if (channelFilter !== 'all') {
      result = result.filter(campaign => 
        campaign.channel.toLowerCase() === channelFilter.toLowerCase()
      );
    }
    
    if (impactFilter !== 'all') {
      result = result.filter(campaign => 
        campaign.impact.toLowerCase() === impactFilter.toLowerCase()
      );
    }
    
    setFilteredCampaigns(result);
  }, [campaigns, objectiveFilter, channelFilter, impactFilter]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="flex items-center justify-between mb-8">
          <Logo size="md" />
          <div className="text-gray-500 text-sm">Step 5 of 6</div>
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
              onClick={() => navigate(`/profiles/${segmentId}`)}
              className="mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Profile
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-800">
              AI-Generated Campaign Suggestions
            </h1>
            <p className="text-gray-600 mt-2">
              Personalized marketing strategies for your customer segment
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6 bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-lg font-medium mb-4">Filter Campaigns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objective
              </label>
              <Select value={objectiveFilter} onValueChange={setObjectiveFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Objectives" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Objectives</SelectItem>
                  <SelectItem value="retention">Retention</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="loyalty">Loyalty</SelectItem>
                  <SelectItem value="acquisition">Acquisition</SelectItem>
                  <SelectItem value="advocacy">Advocacy</SelectItem>
                  <SelectItem value="reactivation">Reactivation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Channel
              </label>
              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Channels</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="multiple">Multiple</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="mail">Mail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Projected Impact
              </label>
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Impact Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Impact Levels</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
        
        <div className="mb-4">
          <h2 className="text-lg font-medium">
            {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Available
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <CampaignCard
                key={campaign.id}
                title={campaign.title}
                description={campaign.description}
                channel={campaign.channel}
                impact={campaign.impact}
                objective={campaign.objective}
                index={index}
              />
            ))
          ) : (
            <div className="col-span-full text-center p-10 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No matching campaigns</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
