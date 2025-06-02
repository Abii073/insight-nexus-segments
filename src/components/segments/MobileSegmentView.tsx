
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, BarChart3, Info, Settings } from 'lucide-react';
import InteractiveRadarChart from '../InteractiveRadarChart';
import CustomerSegmentCard from '../CustomerSegmentCard';

interface MobileSegmentViewProps {
  radarData: number[];
  subdimensions: string[];
  selectedPreset: string;
  segments: any[];
  highlightedCard: number | null;
  presetConfigurations: Record<string, string>;
  avgConfiguration: number;
  segmentTags: Record<string, string>;
  onRadarDataChange: (newData: number[]) => void;
  onPresetChange: (preset: string) => void;
  onViewCampaigns: (segmentName: string) => void;
  onCustomizeOpen: () => void;
  onSaveSegments: () => void;
  onExportSegments: () => void;
}

const MobileSegmentView = ({
  radarData,
  subdimensions,
  selectedPreset,
  segments,
  highlightedCard,
  presetConfigurations,
  avgConfiguration,
  segmentTags,
  onRadarDataChange,
  onPresetChange,
  onViewCampaigns,
  onCustomizeOpen,
  onSaveSegments,
  onExportSegments
}: MobileSegmentViewProps) => {
  return (
    <div className="lg:hidden">
      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="radar" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Radar
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="radar" className="mt-4">
          <Card className="p-6">
            <div className="mb-4">
              <Select value={selectedPreset} onValueChange={onPresetChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select configuration preset" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(presetConfigurations).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <InteractiveRadarChart
              data={radarData}
              labels={subdimensions}
              onDataChange={onRadarDataChange}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                {segments.length} profiles
              </Badge>
              <Button variant="outline" size="sm" onClick={onCustomizeOpen}>
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
            
            {segments.map((segment, index) => (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: highlightedCard ? 1.02 : 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  scale: { duration: 0.3 }
                }}
                className={highlightedCard ? "animate-pulse" : ""}
              >
                <CustomerSegmentCard
                  segment={{
                    ...segment,
                    name: `${segment.name} (${segment.percentage}%)`
                  }}
                  onViewCampaigns={() => onViewCampaigns(segment.name)}
                />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="summary" className="mt-4">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Impact Summary</h3>
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Configuration</span>
                  <span className="font-medium">{avgConfiguration}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Segments Generated</span>
                  <span className="font-medium">{segments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tagged Segments</span>
                  <span className="font-medium">{Object.keys(segmentTags).length}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={onSaveSegments} className="flex-1">
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={onExportSegments} className="flex-1">
                  Export
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileSegmentView;
