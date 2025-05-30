
import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface OctagonViewProps {
  selectedAttribute?: string;
}

const EmbeddedUnityModel = ({ selectedAttribute }: { selectedAttribute?: string }) => {
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
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="text-center text-white">
            <div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-sm">Loading 3D Octagon Model...</p>
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
              className="mt-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <iframe
          frameBorder="0"
          src="https://6839051051d0806a83d68b6e--rococo-llama-238af9.netlify.app/"
          allowFullScreen={true}
          width="100%"
          height="100%"
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
          title="3D Customer Segmentation Octagon"
        />
      )}
      
      {selectedAttribute && !isLoading && !hasError && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs">
          Highlighting: {selectedAttribute.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      )}
    </div>
  );
};

const OctagonView = ({ selectedAttribute }: OctagonViewProps) => {
  return (
    <div className="relative w-full bg-gray-50 rounded-xl overflow-hidden">
      <div className="p-4">
        {/* Info Alert */}
        <div className="mb-4">
          <Alert className="bg-brand-50 border-brand-200">
            <AlertTitle className="text-brand-800">Interactive 3D Attribute Model</AlertTitle>
            <AlertDescription className="text-brand-700">
              Explore the 8 key customer attributes in our interactive 3D octagon. Click the buttons below to highlight different attributes.
            </AlertDescription>
          </Alert>
        </div>

        {/* Embedded Unity Model */}
        <EmbeddedUnityModel selectedAttribute={selectedAttribute} />
        
        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Each side of the octagon represents a key customer attribute. Use the buttons below to explore different dimensions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OctagonView;
