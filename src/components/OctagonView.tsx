
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UnityWebGLEmbed from './UnityWebGLEmbed';

type Segment = {
  id: string;
  name: string;
};

// Map Unity segment identifiers to our app's segment IDs
const segmentMap: Record<string, string> = {
  "Segment1": "tech-savvy",
  "Segment2": "conservative", 
  "Segment3": "multichannel",
  "Segment4": "value-seekers",
  "Segment5": "luxury",
  "Segment6": "occasional",
  "Segment7": "loyal",
  "Segment8": "at-risk"
};

const OctagonView = () => {
  const navigate = useNavigate();
  
  const handleSegmentClick = (segmentId: string) => {
    // Map the Unity segment ID to our app's segment ID
    const appSegmentId = segmentMap[segmentId] || segmentId;
    navigate(`/profiles/${appSegmentId}`);
  };
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      <UnityWebGLEmbed 
        onSegmentClick={handleSegmentClick}
        className="w-full h-full"
      />
      <div className="absolute bottom-6 left-0 right-0 text-center text-white text-opacity-80 text-sm">
        Click on a segment to explore more
      </div>
    </div>
  );
};

export default OctagonView;
