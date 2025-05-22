
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnityWebGLEmbed from './UnityWebGLEmbed';
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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
  // GitHub Pages URL to the Unity WebGL build - Updated with direct URLs
  loaderUrl: "https://abii073.github.io/octagon/Build/octagon.loader.js",
  config: {
    dataUrl: "https://abii073.github.io/octagon/Build/octagon.data",
    frameworkUrl: "https://abii073.github.io/octagon/Build/octagon.framework.js",
    codeUrl: "https://abii073.github.io/octagon/Build/octagon.wasm",
    streamingAssetsUrl: "https://abii073.github.io/octagon/StreamingAssets/",
    companyName: "Octagon",
    productName: "Octagon 3D",
    productVersion: "1.0",
  }
};

const OctagonView = () => {
  const navigate = useNavigate();
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  
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

  // Handle Unity loading error
  const handleUnityError = (error: string) => {
    console.error("Unity loading error:", error);
    setLoadError(error);
    toast({
      title: "3D Octagon Error",
      description: "Could not load the interactive 3D element. Displaying fallback view.",
      variant: "destructive"
    });
  };
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      {loadError ? (
        <div className="flex flex-col items-center justify-center h-full p-6 text-white">
          <div className="text-4xl font-bold mb-6">Octagon</div>
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <Alert className="bg-gray-700 border-gray-600 max-w-md">
            <AlertTitle>Interactive 3D view unavailable</AlertTitle>
            <AlertDescription>
              Please try refreshing the page or using a different browser that supports WebGL.
            </AlertDescription>
          </Alert>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-xl">
            {Object.entries(segmentMap).map(([key, value]) => (
              <button
                key={key}
                onClick={() => navigate(`/profiles/${value}`)}
                className="py-2 px-3 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <UnityWebGLEmbed 
            unityLoaderUrl={unityConfig.loaderUrl}
            unityConfig={unityConfig.config}
            onSegmentClick={handleSegmentClick}
            onError={handleUnityError}
            className="w-full h-full"
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-white text-opacity-80 text-sm">
            Click on a segment to explore more
          </div>
        </>
      )}
    </div>
  );
};

export default OctagonView;
