
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Target } from 'lucide-react';

interface CustomerSegment {
  name: string;
  traits: string[];
  engagement: number;
  risk: number;
  strategies: string[];
}

interface CustomerSegmentCardProps {
  segment: CustomerSegment;
  onViewCampaigns: () => void;
}

const CustomerSegmentCard = ({ segment, onViewCampaigns }: CustomerSegmentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-gray-800">{segment.name}</CardTitle>
          <div className="flex gap-2">
            {segment.traits.map((trait, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Engagement & Risk Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Engagement Score</span>
            </div>
            <Progress value={segment.engagement} className="h-2" />
            <span className="text-xs text-gray-600">{segment.engagement}%</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium">Churn Risk</span>
            </div>
            <Progress value={segment.risk} className="h-2" />
            <span className="text-xs text-gray-600">{segment.risk}%</span>
          </div>
        </div>

        {/* Suggested Strategies */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium">Suggested Strategies</span>
          </div>
          <ul className="space-y-1">
            {segment.strategies.map((strategy, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                {strategy}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onViewCampaigns}
          className="w-full bg-brand-500 hover:bg-brand-600"
        >
          View Suggested Campaigns
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentCard;
