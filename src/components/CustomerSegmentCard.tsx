
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Target, Users } from 'lucide-react';

interface CustomerSegment {
  name: string;
  traits: string[];
  engagement: number;
  risk: number;
  strategies: string[];
  percentage?: number;
}

interface CustomerSegmentCardProps {
  segment: CustomerSegment;
  onViewCampaigns: () => void;
}

const CustomerSegmentCard = ({ segment, onViewCampaigns }: CustomerSegmentCardProps) => {
  // Extract percentage from name if it exists
  const nameMatch = segment.name.match(/^(.+?)\s*\((\d+)%\)$/);
  const displayName = nameMatch ? nameMatch[1] : segment.name;
  const percentage = nameMatch ? parseInt(nameMatch[2]) : segment.percentage;

  const getRiskColor = (risk: number) => {
    if (risk <= 25) return 'text-green-600';
    if (risk <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 75) return 'text-green-600';
    if (engagement >= 50) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-l-4 border-l-brand-500">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              {displayName}
              {percentage && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {percentage}% of base
                </Badge>
              )}
            </CardTitle>
          </div>
          <div className="flex gap-2 flex-wrap">
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
              <TrendingUp className={`w-4 h-4 ${getEngagementColor(segment.engagement)}`} />
              <span className="text-sm font-medium">Engagement</span>
            </div>
            <Progress value={segment.engagement} className="h-2" />
            <span className={`text-xs font-medium ${getEngagementColor(segment.engagement)}`}>
              {segment.engagement}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className={`w-4 h-4 ${getRiskColor(segment.risk)}`} />
              <span className="text-sm font-medium">Churn Risk</span>
            </div>
            <Progress 
              value={segment.risk} 
              className="h-2"
            />
            <span className={`text-xs font-medium ${getRiskColor(segment.risk)}`}>
              {segment.risk}%
            </span>
          </div>
        </div>

        {/* Suggested Strategies */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium">Suggested Strategies</span>
          </div>
          <ul className="space-y-1">
            {segment.strategies.slice(0, 3).map((strategy, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onViewCampaigns}
          className="w-full bg-brand-500 hover:bg-brand-600 transition-colors"
        >
          View Suggested Campaigns
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerSegmentCard;
