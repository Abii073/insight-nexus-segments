
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SegmentCustomizationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  segments: any[];
  segmentTags: Record<string, string>;
  customTag: string;
  availableTags: string[];
  onTagSegment: (segmentName: string, tag: string) => void;
  onCustomTagChange: (tag: string) => void;
}

const SegmentCustomizationModal = ({
  isOpen,
  onOpenChange,
  segments,
  segmentTags,
  customTag,
  availableTags,
  onTagSegment,
  onCustomTagChange
}: SegmentCustomizationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Segment Classification</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {segments.map((segment) => (
            <div key={segment.name} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {segment.name}
              </label>
              <Select
                value={segmentTags[segment.name] || ''}
                onValueChange={(value) => onTagSegment(segment.name, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign tag..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Custom Tag
            </label>
            <Input
              placeholder="Enter custom tag..."
              value={customTag}
              onChange={(e) => onCustomTagChange(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SegmentCustomizationModal;
