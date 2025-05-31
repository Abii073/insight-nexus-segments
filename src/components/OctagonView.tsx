// OctagonView.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Asegúrate que la ruta es correcta
// import { useToast } from "@/components/ui/use-toast"; // Descomenta si tienes y usas toasts

// --- INTERFACES Y TIPOS ---

// Props para el componente que embebe Unity
interface EmbeddedUnityModelProps {
  selectedAttribute?: string;
  unitySrcUrl: string; // URL del iframe de Unity (Netlify)
  onUnitySegmentClicked?: (segmentId: string, isSelected: boolean) => void;
}

// Props para el componente OctagonView principal
interface OctagonViewProps {
  selectedAttribute?: string; // Atributo seleccionado actualmente, podría venir de un estado superior
  // Callback que se ejecutará cuando un segmento de Unity sea clickeado
  onOctagonSegmentClicked?: (segmentId: string, isSelected: boolean) => void;
  unityModelUrl: string; // URL del modelo de Unity para pasar a EmbeddedUnityModel
}

// --- DECLARACIÓN GLOBAL PARA WINDOW ---
// Esto le dice a TypeScript sobre las funciones que Unity podría llamar en `window`
declare global {
  interface Window {
    handleOctagonSegmentClick?: (segmentId: string, isSelectedString: string) => void;
  }
}

// --- COMPONENTE EMBEDDED UNITY MODEL ---
const EmbeddedUnityModel: React.FC<EmbeddedUnityModelProps> = ({
  selectedAttribute,
  unitySrcUrl,
  onUnitySegmentClicked,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // const { toast } = useToast(); // Descomenta si usas toasts y tienes la importación correcta

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    console.log("[WebApp] Contenido de Unity cargado (iframe onload).");
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    console.error("[WebApp] Error al cargar el iframe de Unity.");
    // toast({ // Descomenta si usas toasts
    //   title: "Error de Carga",
    //   description: "No se pudo cargar el modelo 3D interactivo.",
    //   variant: "destructive",
    // });
  }, [/* toast */]); // Añade toast a las dependencias si lo usas

  // useEffect para definir la función global que Unity llamará
  useEffect(() => {
    console.log("[WebApp] Configurando listener para mensajes de Unity: handleOctagonSegmentClick");
    window.handleOctagonSegmentClick = (segmentId: string, isSelectedString: string) => {
      console.log(`[WebApp] Recibido desde Unity (iframe): Segmento='${segmentId}', Seleccionado='${isSelectedString}'`);
      const isSelected = isSelectedString.toLowerCase() === 'true';

      if (onUnitySegmentClicked) {
        onUnitySegmentClicked(segmentId, isSelected);
      }

      // toast({ // Descomenta si usas toasts
      //   title: "Interacción desde Octágono 3D",
      //   description: `Segmento: ${segmentId}, Estado: ${isSelected ? 'Seleccionado' : 'Deseleccionado'}`,
      // });
    };

    // Limpieza cuando el componente se desmonta
    return () => {
      console.log("[WebApp] Limpiando listener de mensajes de Unity: handleOctagonSegmentClick.");
      delete window.handleOctagonSegmentClick;
    };
  }, [onUnitySegmentClicked /*, toast*/]); // Dependencias

  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    // Forzar recarga del iframe cambiando su key (React lo re-renderizará)
    // Esto se logra si el padre cambia la key del iframe o si usamos un estado local para la key.
    // Por ahora, solo reseteamos estados. El iframe podría necesitar una key que cambie para forzar recarga.
    console.log("[WebApp] Intentando recargar el modelo 3D...");
  }, []);

  // Se usa una key que cambia para forzar la recreación del iframe al reintentar
  const iframeKey = hasError ? `iframe-error-${Date.now()}` : 'iframe-loaded';

  return (
    <div className="relative w-full h-96 min-h-[24rem] bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-xl">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 bg-opacity-80 z-10 backdrop-blur-sm text-white p-4">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading 3D Octagon Model...</p>
          <p className="text-xs text-slate-400">Initializing interactive experience.</p>
        </div>
      )}

      {hasError && !isLoading && ( // Mostrar error solo si no está cargando
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

      {/* El iframe solo se renderiza si no hay error o si se está recargando */}
      {/* El control de visibilidad del iframe se basa en !hasError */}
      {!hasError && (
          <iframe
            key={iframeKey} // Clave para forzar la recreación al reintentar
            frameBorder="0"
            src={unitySrcUrl} // Usar la prop para la URL
            allowFullScreen={true}
            width="100%"
            height="100%"
            className="w-full h-full"
            onLoad={handleLoad}
            onError={handleError}
            title="3D Interactive Octagon Model"
            // sandbox="allow-scripts allow-same-origin" // Usar con precaución si es necesario
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


// --- COMPONENTE OCTAGON VIEW PRINCIPAL ---
const OctagonView: React.FC<OctagonViewProps> = ({
  selectedAttribute,
  onOctagonSegmentClicked,
  unityModelUrl, // URL pasada desde el componente padre
}) => {
  return (
    <div className="relative w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <Alert className="bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200">
            <svg className="h-5 w-5 mr-2 inline-block flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <div className="flex-grow">
              <AlertTitle className="font-semibold">Interactive 3D Attribute Model</AlertTitle>
              <AlertDescription className="text-sm">
                Explore key customer attributes in our interactive 3D octagon. Click segments in the model or use external controls to highlight attributes.
              </AlertDescription>
            </div>
          </Alert>
        </div>

        <EmbeddedUnityModel
          selectedAttribute={selectedAttribute}
          unitySrcUrl={unityModelUrl} // Pasar la URL al componente hijo
          onUnitySegmentClicked={onOctagonSegmentClicked} // Pasar la función de callback
        />

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Each segment represents a key attribute. Interactions with the 3D model can update other parts of this application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OctagonView;