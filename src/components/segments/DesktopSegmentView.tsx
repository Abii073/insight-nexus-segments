
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, BarChart3, Info, Settings } from 'lucide-react';
import InteractiveRadarChart from '../InteractiveRadarChart';
import CustomerSegmentCard from '../CustomerSegmentCard';
import ImpactSummaryCard from './ImpactSummaryCard';

interface DesktopSegmentViewProps {
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

const DesktopSegmentView = ({
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
}: DesktopSegmentViewProps) => {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Left Zone - Interactive Radar (30%) */}
        <motion.div 
          className="col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Interactive Radar
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adjust sliders to see real-time impact on segments</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
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
        </motion.div>
        
        {/* Center Zone - Live Generated Segments (45%) */}
        <motion.div 
          className="col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  Live Segments
                </h3>
                <Badge variant="secondary" className="flex items-center gap-1">
                  {segments.length} profiles
                </Badge>
              </div>
              
              <Button variant="outline" size="sm" onClick={onCustomizeOpen}>
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-80px)] space-y-3">
              <AnimatePresence mode="wait">
                {segments.map((segment, index) => (
                  <motion.div
                    key={`${segment.name}-${highlightedCard}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: highlightedCard ? 1.02 : 1
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: index * 0.05,
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
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
        
        {/* Right Zone - Impact Summary (25%) */}
        <motion.div
          className="col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <ImpactSummaryCard
            avgConfiguration={avgConfiguration}
            segments={segments}
            segmentTags={segmentTags}
            highlightedCard={highlightedCard}
            onSaveSegments={onSaveSegments}
            onExportSegments={onExportSegments}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DesktopSegmentView;
