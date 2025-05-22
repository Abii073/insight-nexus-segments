
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const OctagonView = () => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  
  // Handle iframe loading error
  const handleIframeError = () => {
    console.error("Unity iframe failed to load");
    setHasError(true);
    toast({
      title: "3D Octagon Error",
      description: "Could not load the interactive 3D element. Displaying fallback view.",
      variant: "destructive"
    });
  };

  // Setup the window event listener for Unity communication
  React.useEffect(() => {
    window.receiveSegmentClickFromUnity = (segmentName: string, isSelected?: boolean) => {
      console.log(`Segment clicked: ${segmentName}`);
      if (segmentMap[segmentName]) {
        navigate(`/profiles/${segmentMap[segmentName]}`);
      }
    };
    
    return () => {
      // Clean up
      delete window.receiveSegmentClickFromUnity;
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      {hasError ? (
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
          <div className="w-full h-full flex items-center justify-center">
            <iframe 
              src="https://play.unity.com/embed/8e6ce43a-9040-4a3a-8fd2-9b11b702f27d/octagono" 
              width="100%" 
              height="100%" 
              style={{ maxWidth: '100%', maxHeight: '100%', border: 'none' }}
              onError={handleIframeError}
              title="3D Octagon Visualization"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="rounded-xl z-10 pointer-events-auto"
              loading="eager"
            ></iframe>
          </div>
          <div className="absolute bottom-6 left-0 right-0 z-20 text-center text-white text-opacity-80 text-sm bg-black bg-opacity-30 py-1 pointer-events-none">
            Click on a segment to explore more
          </div>
        </>
      )}
    </div>
  );
};

// Global declaration for Unity communication
declare global {
  interface Window {
    receiveSegmentClickFromUnity?: (segmentName: string, isSelected?: boolean) => void;
  }
}

export default OctagonView;
