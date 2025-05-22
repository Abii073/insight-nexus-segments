
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnityWebGLEmbed from './UnityWebGLEmbed';
import { toast } from "@/hooks/use-toast";

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

// Unity WebGL build configuration
const unityConfig = {
  // GitHub Pages URL to the Unity WebGL build
  loaderUrl: "https://abii073.github.io/octagon/Build/octagon.loader.js",
  config: {
    dataUrl: "https://abii073.github.io/octagon/Build/octagon.data",
    frameworkUrl: "https://abii073.github.io/octagon/Build/octagon.framework.js",
    codeUrl: "https://abii073.github.io/octagon/Build/octagon.wasm",
    // Optional but recommended:
    streamingAssetsUrl: "https://abii073.github.io/octagon/StreamingAssets/",
    companyName: "Octagon",
    productName: "Octagon 3D",
    productVersion: "1.0",
  }
};

const OctagonView = () => {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  
  // Handle segment click from Unity
  const handleSegmentClick = (segmentId: string, isSelected: boolean) => {
    console.log(`Segment clicked: ${segmentId}, Selected: ${isSelected}`);
    
    // Only navigate if segment is selected
    if (isSelected) {
      // Map the Unity segment ID to our app's segment ID
      const appSegmentId = segmentMap[segmentId] || segmentId;
      setSelectedSegment(appSegmentId);
      
      // Navigate to the profile page for this segment
      navigate(`/profiles/${appSegmentId}`);
    }
  };
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      <UnityWebGLEmbed 
        unityLoaderUrl={unityConfig.loaderUrl}
        unityConfig={unityConfig.config}
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
