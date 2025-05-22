
import React, { useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast";

interface UnityWebGLEmbedProps {
  onSegmentClick?: (segmentId: string) => void;
  className?: string;
}

// src/components/UnityWebGLEmbed.tsx

// ... (otros imports)

//codigo agregado por google ai studio
declare global {
  interface Window {
    // La instancia de Unity, una vez creada. Hazla opcional porque no existe hasta después de la creación.
    unityInstance?: any; // Puedes ser más específico si conoces la estructura del objeto unityInstance

    // La función que carga y crea la instancia de Unity.
    // La firma exacta puede variar ligeramente según la versión de Unity,
    // pero generalmente toma el canvas, la configuración y una función de progreso.
    createUnityInstance: (
      canvasHtmlElement: HTMLCanvasElement,
      config: {
        dataUrl: string;
        frameworkUrl: string;
        codeUrl: string;
        streamingAssetsUrl?: string;
        companyName?: string;
        productName?: string;
        productVersion?: string;
        // ...otras propiedades de configuración que uses
      },
      onProgress?: (progress: number) => void
    ) => Promise<any>; // Retorna una promesa que resuelve a la unityInstance

    // Tu función de callback para que Unity la llame.
    // Hazla opcional porque la defines tú mismo en tu componente.
    receiveSegmentClickFromUnity?: (segmentName: string, isSelectedStr: string) => void;
  }
}
//codigo agregado por google ai studio

// ... (resto de tu componente UnityWebGLEmbed)

const UnityWebGLEmbed: React.FC<UnityWebGLEmbedProps> = ({ onSegmentClick, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Function to handle Unity initialization
    const loadUnityGame = () => {
      if (!window.createUnityInstance) {
        // Load Unity loader script dynamically
        const loaderScript = document.createElement('script');
        loaderScript.src = "https://raw.githubusercontent.com/Abii073/octagon/main/Build/octagon.loader.js";
        loaderScript.onload = () => initializeUnity();
        loaderScript.onerror = () => {
          toast({
            title: "Error",
            description: "Failed to load Unity WebGL content. Please check your internet connection.",
            variant: "destructive"
          });
        };
        document.body.appendChild(loaderScript);
      } else {
        initializeUnity();
      }
    };
    
  //codigo agregado por google ai studio
    
  // Define la función que Unity llamará
  // useEffect(() => {
  // window.receiveSegmentClickFromUnity = (segmentName, isSelectedStr) => {
  //   console.log(`Unity llamó a receiveSegmentClickFromUnity: ${segmentName}, ${isSelectedStr}`);
  //   if (onSegmentClick) { // onSegmentClick es una prop de tu componente React
  //     onSegmentClick(segmentName);
  //   }
  //   // Ejemplo de cómo usar el toast:
  //   const isSelected = isSelectedStr.toLowerCase() === 'true';
  //   toast({
  //     title: "Segmento Seleccionado desde Unity",
  //     description: `Segmento: ${segmentName}, Estado: ${isSelected ? 'Seleccionado' : 'Deseleccionado'}`,
  //   });
  // };

  // Limpieza al desmontar el componente
  return () => {
    if (window.unityInstance && typeof window.unityInstance.Quit === 'function') {
      window.unityInstance.Quit(() => {
        console.log("Unity instance quit.");
      });
    }
    delete window.receiveSegmentClickFromUnity;
    delete window.unityInstance;
  };
}, [onSegmentClick, toast]); // Añade las dependencias del useEffect
//codigo agregado por google ai studio

    // Initialize Unity instance
    const initializeUnity = () => {
      if (!canvasRef.current || !window.createUnityInstance) return;
      
      const loadingBar = loadingBarRef.current;
      const progress = progressRef.current;
      
      window.createUnityInstance(canvasRef.current, {
        dataUrl: "https://raw.githubusercontent.com/Abii073/octagon/main/Build/octagon.data",
        frameworkUrl: "https://raw.githubusercontent.com/Abii073/octagon/main/Build/octagon.framework.js",
        codeUrl: "https://raw.githubusercontent.com/Abii073/octagon/main/Build/octagon.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Octagon",
        productVersion: "0.1",
      }, (progress) => {
        if (loadingBar && progress) {
          progress.style.width = `${Math.round(progress * 100)}%`;
        }
      }).then((unityInstance) => {
        if (loadingBar) {
          loadingBar.style.display = 'none';
        }
        window.unityInstance = unityInstance;
      }).catch((error) => {
        console.error("Unity WebGL initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize Unity content. Please refresh the page and try again.",
          variant: "destructive"
        });
      });
    };

    // Setup communication from Unity to React
    window.receiveSegmentClickFromUnity = (segmentId: string) => {
      if (onSegmentClick) {
        onSegmentClick(segmentId);
      }
    };
    
    // Adjust canvas size based on container
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;
      
      const container = containerRef.current;
      const canvas = canvasRef.current;
      
      // Maintain aspect ratio (16:9 is common for WebGL)
      const aspectRatio = 16 / 9;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      if (containerWidth / containerHeight > aspectRatio) {
        canvas.style.width = `${containerHeight * aspectRatio}px`;
        canvas.style.height = `${containerHeight}px`;
      } else {
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerWidth / aspectRatio}px`;
      }
    };
    
    // Load Unity content
    loadUnityGame();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      // Cleanup
      window.removeEventListener('resize', resizeCanvas);
      if (window.unityInstance) {
        window.unityInstance.Quit();
      }
      delete window.receiveSegmentClickFromUnity;
    };
  }, [onSegmentClick]);
  
  return (
    <div ref={containerRef} className={`unity-container relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="unity-canvas w-full h-full bg-black"
        tabIndex={1}
      />
      <div 
        ref={loadingBarRef} 
        className="loading-bar absolute left-0 right-0 bottom-0 h-1 bg-gray-200"
      >
        <div ref={progressRef} className="progress h-full bg-brand-500" style={{ width: '0%' }} />
      </div>
    </div>
  );
};

export default UnityWebGLEmbed;
