
// src/components/UnityWebGLEmbed.tsx
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "@/hooks/use-toast"; // Corrected import path

// --- Interface Props ---
interface UnityWebGLEmbedProps {
  unityLoaderUrl?: string;
  unityConfig?: {
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string; 
    streamingAssetsUrl?: string;
    companyName?: string;
    productName?: string;
    productVersion?: string;
  };
  onSegmentClick?: (segmentID: string, isSelected: boolean) => void;
  onError?: (error: string) => void;
  className?: string;
  width?: string;
  height?: string;
}

// --- Global Declarations for Window ---
declare global {
  interface Window {
    unityInstance?: any;
    createUnityInstance?: (
      canvasHtmlElement: HTMLCanvasElement,
      config: any,
      onProgress?: (progress: number) => void
    ) => Promise<any>;
    receiveSegmentClickFromUnity?: (segmentName: string, isSelectedStr: string) => void;
  }
}

// --- Functional Component ---
const UnityWebGLEmbed: React.FC<UnityWebGLEmbedProps> = ({
  unityLoaderUrl,
  unityConfig,
  onSegmentClick,
  onError,
  className = '',
  width = '100%',
  height = '500px',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const unityInstanceRef = useRef<any>(null);
  const [loadAttempts, setLoadAttempts] = useState<number>(0);
  const maxAttempts = 2;

  // Setup Unity to React communication
  useEffect(() => {
    // Define the function that Unity will call
    window.receiveSegmentClickFromUnity = (segmentName: string, isSelectedStr: string) => {
      console.log(`[React] From Unity: Segment='${segmentName}', Selected='${isSelectedStr}'`);
      const isSelected = isSelectedStr.toLowerCase() === 'true';
      
      if (onSegmentClick) {
        onSegmentClick(segmentName, isSelected);
      }
      
      toast({
        title: "Interaction with 3D Octagon",
        description: `Segment: ${segmentName}, State: ${isSelected ? 'Selected' : 'Deselected'}`,
      });
    };

    // Cleanup function
    return () => {
      console.log("[React] Unmounting UnityWebGLEmbed. Cleaning up...");
      
      if (unityInstanceRef.current && typeof unityInstanceRef.current.Quit === 'function') {
        try {
          unityInstanceRef.current.Quit();
          console.log("[React] Unity instance closed successfully.");
        } catch (err) {
          console.error("[React] Error closing Unity instance:", err);
        }
      }
      
      // Remove global function reference
      delete window.receiveSegmentClickFromUnity;
      unityInstanceRef.current = null;
    };
  }, [onSegmentClick]);

  // Load and initialize Unity
  useEffect(() => {
    // Skip if necessary props are missing
    if (!canvasRef.current || !unityLoaderUrl || !unityConfig) {
      if (!unityLoaderUrl || !unityConfig) {
        console.warn("[React] Missing Unity config properties - using placeholder view");
      }
      return;
    }

    setIsLoading(true);
    const canvasElement = canvasRef.current;
    let scriptElement: HTMLScriptElement | null = null;

    const loadUnity = async () => {
      try {
        // Check for WebGL support first
        if (!isWebGLSupported()) {
          throw new Error("WebGL is not supported in this browser");
        }
        
        // Load Unity script dynamically
        console.log(`[React] Loading Unity loader script from: ${unityLoaderUrl}`);
        
        // Create a script element
        scriptElement = document.createElement('script');
        scriptElement.src = unityLoaderUrl;
        scriptElement.async = true;
        
        // Handle script loading
        const scriptLoadPromise = new Promise<void>((resolve, reject) => {
          if (!scriptElement) return reject("Script element not created");
          
          scriptElement.onload = () => resolve();
          scriptElement.onerror = () => reject(new Error("Failed to load Unity script"));
        });
        
        // Add script to document
        document.body.appendChild(scriptElement);
        
        // Wait for script to load with timeout
        const timeoutPromise = new Promise<void>((_, reject) => {
          setTimeout(() => reject(new Error("Unity script load timeout")), 15000);
        });
        
        await Promise.race([scriptLoadPromise, timeoutPromise]);
        console.log("[React] Unity loader script loaded");
        
        // Check if createUnityInstance is available
        if (typeof window.createUnityInstance === 'function') {
          console.log("[React] Creating Unity instance...");
          
          try {
            // Create Unity instance with timeout
            const instancePromise = window.createUnityInstance(
              canvasElement,
              unityConfig,
              (progress: number) => {
                console.log(`[React] Unity loading progress: ${Math.round(progress * 100)}%`);
                setLoadingProgress(progress);
              }
            );
            
            const timeoutInstancePromise = new Promise((_, reject) => {
              setTimeout(() => reject(new Error("Unity instance creation timeout")), 30000);
            });
            
            const instance = await Promise.race([instancePromise, timeoutInstancePromise]);
            
            console.log("[React] Unity instance created successfully");
            unityInstanceRef.current = instance;
            window.unityInstance = instance; // Store on window for debugging
          } catch (error) {
            console.error("[React] Error creating Unity instance:", error);
            throw error;
          }
        } else {
          console.error("[React] window.createUnityInstance is not available after script load");
          throw new Error("Unity loader did not provide createUnityInstance function");
        }
      } catch (error: any) {
        console.error("[React] Error in Unity loading process:", error);
        
        // Try to reload if under max attempts
        if (loadAttempts < maxAttempts) {
          console.log(`[React] Attempt ${loadAttempts + 1}/${maxAttempts} - Retrying in 2 seconds...`);
          setTimeout(() => {
            setLoadAttempts(prevAttempts => prevAttempts + 1);
            // Clean up failed script if it exists
            if (scriptElement && scriptElement.parentNode) {
              scriptElement.parentNode.removeChild(scriptElement);
            }
          }, 2000);
        } else {
          // Give up and show fallback
          toast({ 
            title: "Error", 
            description: "Failed to load 3D component", 
            variant: "destructive" 
          });
          
          if (onError) {
            onError(error.message || "Failed to load Unity WebGL");
          }
        }
      } finally {
        setIsLoading(loadAttempts >= maxAttempts ? false : true);
      }
    };

    // Helper function to check WebGL support
    function isWebGLSupported() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    // Only load if we haven't exceeded max attempts
    if (loadAttempts < maxAttempts) {
      loadUnity();
    }

    // Cleanup function
    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [unityLoaderUrl, unityConfig, loadAttempts, onError]);

  // If no Unity config is provided, show placeholder
  if (!unityLoaderUrl || !unityConfig) {
    return (
      <div 
        className={`unity-placeholder ${className}`}
        style={{ 
          width, 
          height,
          backgroundColor: '#2A2A2A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          3D Octagon Viewer
        </div>
        <div style={{ fontSize: '14px', maxWidth: '80%' }}>
          Please provide Unity WebGL build files to view the interactive 3D octagon
        </div>
      </div>
    );
  }

  return (
    <div
      className={`unity-webgl-embed-container ${className}`}
      style={{ width, height, position: 'relative' }}
    >
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#2A2A2A', borderRadius: '8px' }}
      />
      
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0,0,0,0.6)', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          color: 'white',
          borderRadius: '8px',
        }}>
          <div style={{ marginBottom: '12px' }}>Loading 3D Octagon</div>
          <div style={{ 
            width: '60%', 
            height: '8px', 
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: `${loadingProgress * 100}%`, 
              height: '100%', 
              backgroundColor: '#4CAF50',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{ marginTop: '8px' }}>{Math.round(loadingProgress * 100)}%</div>
        </div>
      )}
    </div>
  );
};

export default UnityWebGLEmbed;
