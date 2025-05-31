// src/components/EmbeddedUnityModel.tsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
// Asegúrate de tener la importación de toast si la usas, o coméntala/elimínala
// import { useToast } from "@/components/ui/use-toast";

// --- INTERFACES Y TIPOS ---
export interface EmbeddedUnityModelProps { // Exportar la interfaz para que OctagonView pueda usarla
  selectedAttribute?: string;
  unitySrcUrl: string;
  onUnitySegmentClicked?: (segmentId: string, isSelected: boolean) => void;
  className?: string; // Para permitir estilos adicionales desde el padre
  width?: string;
  height?: string;
}

// --- DECLARACIÓN GLOBAL PARA WINDOW ---
// Esto ya debería estar en un archivo de tipos global (ej. global.d.ts o similar)
// o puedes dejarlo aquí si es específico para este componente y sus padres.
// Si ya lo tienes en otro lado, puedes quitar este bloque de aquí.
declare global {
  interface Window {
    handleOctagonSegmentClick?: (segmentId: string, isSelectedString: string) => void;
    // Si tu cargador de Unity usa createUnityInstance y unityInstance, también deberían estar aquí:
    // createUnityInstance?: (...args: any[]) => Promise<any>;
    // unityInstance?: any;
  }
}

// --- COMPONENTE EMBEDDED UNITY MODEL ---
const EmbeddedUnityModel: React.FC<EmbeddedUnityModelProps> = ({
  selectedAttribute,
  unitySrcUrl,
  onUnitySegmentClicked,
  className = '',
  width = '100%',
  height = '384px', // h-96 de Tailwind
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // const { toast } = useToast();

  console.log("[WebApp] EmbeddedUnityModel está renderizando/montando."); // Log de montaje

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    console.log("[WebApp] Contenido de iframe Unity cargado (iframe onload).");
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    console.error("[WebApp] Error al cargar el iframe de Unity.");
    // toast({
    //   title: "Error de Carga",
    //   description: "No se pudo cargar el modelo 3D interactivo.",
    //   variant: "destructive",
    // });
  }, [/* toast */]);

  useEffect(() => {
    console.log("[WebApp] Asignando handleOctagonSegmentClick a window.");
    window.handleOctagonSegmentClick = (segmentId: string, isSelectedString: string) => {
      console.log(`[WebApp] Recibido desde iframe (Unity): Segmento='${segmentId}', Seleccionado='${isSelectedString}'`);
      const isSelected = isSelectedString.toLowerCase() === 'true';

      if (onUnitySegmentClicked) {
        console.log("[WebApp] Llamando a onUnitySegmentClicked con:", segmentId, isSelected);
        onUnitySegmentClicked(segmentId, isSelected);
      } else {
        console.warn("[WebApp] onUnitySegmentClicked no fue proporcionado como prop.");
      }

      // toast({
      //   title: "Interacción desde Octágono 3D",
      //   description: `Segmento: ${segmentId}, Estado: ${isSelected ? 'Seleccionado' : 'Deseleccionado'}`,
      // });
    };

    return () => {
      console.log("[WebApp] Limpiando handleOctagonSegmentClick de window.");
      delete window.handleOctagonSegmentClick;
    };
  }, [onUnitySegmentClicked /*, toast*/]);

  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    console.log("[WebApp] Intentando recargar el modelo 3D...");
    // Para forzar la recarga del iframe, cambia su key.
    // Esto se hace estableciendo un estado que se usa en la key del iframe
    // y cambiándolo aquí.
    setIframeKey(`iframe-retry-${Date.now()}`);
  }, []);

  const [iframeKey, setIframeKey] = useState('iframe-initial-load');


  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 bg-opacity-80 z-10 backdrop-blur-sm text-white p-4">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading 3D Octagon Model...</p>
          <p className="text-xs text-slate-400">Initializing interactive experience.</p>
        </div>
      )}

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

      {!hasError && (
          <iframe
            key={iframeKey} // Clave para forzar la recreación al reintentar
            frameBorder="0"
            src={unitySrcUrl}
            allowFullScreen={true}
            width="100%"
            height="100%"
            className="w-full h-full" // Asegura que el iframe llene el div contenedor
            onLoad={handleLoad}
            onError={handleError}
            title="3D Interactive Octagon Model"
          />
        )
      }

      {selectedAttribute && !isLoading && !hasError && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-md text-xs shadow-lg backdrop-blur-sm">
          Highlighting: <span className="font-semibold">{selectedAttribute.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
      )}
    </div>
  );
};

export default EmbeddedUnityModel;