
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Save, Download, Info } from 'lucide-react';

interface ImpactSummaryCardProps {
  avgConfiguration: number;
  segments: any[];
  segmentTags: Record<string, string>;
  highlightedCard: number | null;
  onSaveSegments: () => void;
  onExportSegments: () => void;
}

const ImpactSummaryCard = ({
  avgConfiguration,
  segments,
  segmentTags,
  highlightedCard,
  onSaveSegments,
  onExportSegments
}: ImpactSummaryCardProps) => {
  const [compareMode, setCompareMode] = useState(false);

  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-purple-500" />
        Impact Summary
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Switch
            checked={compareMode}
            onCheckedChange={setCompareMode}
            id="compare-mode-desktop"
          />
          <label htmlFor="compare-mode-desktop" className="text-sm font-medium">
            Compare Mode
          </label>
        </div>
        
        <motion.div 
          className="space-y-3"
          animate={{ scale: highlightedCard ? 1.02 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{avgConfiguration}%</div>
              <div className="text-xs text-blue-600">Avg Configuration</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-gray-50 rounded text-center">
              <div className="font-bold text-gray-800">{segments.length}</div>
              <div className="text-xs text-gray-600">Segments</div>
            </div>
            <div className="p-2 bg-gray-50 rounded text-center">
              <div className="font-bold text-gray-800">{Object.keys(segmentTags).length}</div>
              <div className="text-xs text-gray-600">Tagged</div>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-2">
          <Button variant="outline" size="sm" onClick={onSaveSegments} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
          <Button variant="outline" size="sm" onClick={onExportSegments} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-md mt-6">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Watch segments update in real-time as you adjust the radar. High-impact changes create visual feedback.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ImpactSummaryCard;
