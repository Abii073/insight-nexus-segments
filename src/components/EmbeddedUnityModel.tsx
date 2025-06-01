
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- INTERFACES AND TYPES ---
export interface EmbeddedUnityModelProps {
  selectedAttribute?: string;
  unitySrcUrl: string;
  onUnitySegmentClicked?: (segmentId: string, isSelected: boolean) => void;
  onUnityInstanceLoaded?: (instance: any) => void;
  className?: string;
  width?: string;
  height?: string;
}

// --- GLOBAL WINDOW DECLARATION ---
declare global {
  interface Window {
    handleOctagonSegmentClick?: (segmentId: string, isSelectedString: string) => void;
    createUnityInstance?: (...args: any[]) => Promise<any>;
    unityInstance?: any;
  }
}

// --- EMBEDDED UNITY MODEL COMPONENT ---
const EmbeddedUnityModel: React.FC<EmbeddedUnityModelProps> = ({
  selectedAttribute,
  unitySrcUrl,
  onUnitySegmentClicked,
  onUnityInstanceLoaded,
  className = '',
  width = '100%',
  height = '384px',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState('iframe-initial-load');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  console.log("[WebApp] EmbeddedUnityModel is mounting/rendering.");

  // Handle iframe load success
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    console.log("[WebApp] Unity iframe content loaded (iframe onload).");
    
    // Attempt to get Unity instance and pass it to parent
    setTimeout(() => {
      try {
        const iframe = iframeRef.current;
        let unityInstance = null;
        
        // Try to get Unity instance from iframe's content window
        if (iframe?.contentWindow) {
          unityInstance = (iframe.contentWindow as any).unityInstance;
        }
        
        // Fallback: try to get from global window
        if (!unityInstance && window.unityInstance) {
          unityInstance = window.unityInstance;
        }
        
        if (unityInstance && onUnityInstanceLoaded) {
          console.log("[WebApp] Unity instance found, passing to parent.");
          onUnityInstanceLoaded(unityInstance);
        } else {
          console.warn("[WebApp] Unity instance not found yet, will retry...");
          // Retry after a longer delay
          setTimeout(() => {
            const retryInstance = iframe?.contentWindow ? (iframe.contentWindow as any).unityInstance : window.unityInstance;
            if (retryInstance && onUnityInstanceLoaded) {
              console.log("[WebApp] Unity instance found on retry, passing to parent.");
              onUnityInstanceLoaded(retryInstance);
            }
          }, 2000);
        }
      } catch (error) {
        console.error("[WebApp] Error getting Unity instance:", error);
      }
    }, 1000); // Give Unity time to initialize
  }, [onUnityInstanceLoaded]);

  // Handle iframe load error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    console.error("[WebApp] Error loading Unity iframe.");
  }, []);

  // Set up Unity -> React communication
  useEffect(() => {
    console.log("[WebApp] Setting up handleOctagonSegmentClick on window.");
    
    window.handleOctagonSegmentClick = (segmentId: string, isSelectedString: string) => {
      console.log(`[WebApp] Received from Unity iframe: Segment='${segmentId}', Selected='${isSelectedString}'`);
      const isSelected = isSelectedString.toLowerCase() === 'true';

      if (onUnitySegmentClicked) {
        console.log("[WebApp] Calling onUnitySegmentClicked with:", segmentId, isSelected);
        onUnitySegmentClicked(segmentId, isSelected);
      } else {
        console.warn("[WebApp] onUnitySegmentClicked prop not provided.");
      }
    };

    return () => {
      console.log("[WebApp] Cleaning up handleOctagonSegmentClick from window.");
      delete window.handleOctagonSegmentClick;
    };
  }, [onUnitySegmentClicked]);

  // Retry loading the iframe
  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    console.log("[WebApp] Retrying to load Unity 3D model...");
    setIframeKey(`iframe-retry-${Date.now()}`);
  }, []);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 bg-opacity-80 z-10 backdrop-blur-sm text-white p-4">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading 3D Octagon Model...</p>
          <p className="text-xs text-slate-400">Initializing interactive experience.</p>
        </div>
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 bg-opacity-80 backdrop-blur-sm text-white p-4">
          <div className="text-center p-6 bg-slate-700 rounded-lg shadow-2xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-xl font-semibold mb-2">Load Error</p>
            <p className="text-sm text-slate-300 mb-6">The 3D interactive model could not be loaded.</p>
            <button
              onClick={retryLoad}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Unity Iframe */}
      {!hasError && (
        <iframe
          ref={iframeRef}
          key={iframeKey}
          frameBorder="0"
          src={unitySrcUrl}
          allowFullScreen={true}
          width="100%"
          height="100%"
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
          title="3D Interactive Octagon Model"
        />
      )}

      {/* Selected Attribute Indicator */}
      {selectedAttribute && !isLoading && !hasError && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-md text-xs shadow-lg backdrop-blur-sm">
          Highlighting: <span className="font-semibold">{selectedAttribute.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
      )}
    </div>
  );
};

export default EmbeddedUnityModel;
