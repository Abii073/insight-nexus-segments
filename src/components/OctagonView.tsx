
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

// Map segment identifiers to our app's segment IDs
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

const EmbeddedUnityModel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="text-center text-white">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm">Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center text-white">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Failed to load 3D model</p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <iframe
          frameBorder="0"
          src="https://itch.io/embed-upload/13829085?color=333333"
          allowFullScreen={true}
          width="100%"
          height="100%"
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
          title="3D Customer Segmentation Octagon"
        />
      )}
    </div>
  );
};

const OctagonView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full bg-gray-50 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Segmentation Octagon</h2>
          <Alert className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <AlertTitle className="text-blue-800">Interactive 3D Model</AlertTitle>
            <AlertDescription className="text-blue-700">
              Explore your customer segments in our interactive 3D visualization. Click the buttons below to highlight different segments.
            </AlertDescription>
          </Alert>
        </div>

        {/* Embedded Unity Model */}
        <div className="mb-6">
          <EmbeddedUnityModel />
        </div>
        
        {/* Segment Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {Object.entries(segmentMap).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                navigate(`/profiles/${value}`);
                toast({
                  title: "Loading Profile",
                  description: `Viewing ${value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} segment profile`,
                });
              }}
              className="py-3 px-4 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              {value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Click any segment button above to explore detailed customer profiles and targeted marketing strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OctagonView;
