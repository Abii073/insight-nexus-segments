// src/components/UnityWebGLEmbed.tsx
import React, { useEffect, useRef } from 'react';
import { toast } from "@/components/ui/use-toast"; // Ajusta esta ruta si es necesario

// --- Interfaz de Props ---
interface UnityWebGLEmbedProps {
  unityLoaderUrl: string; // URL al archivo ...loader.js o Unity.js
  unityConfig: {
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string; // Usualmente el archivo .wasm
    streamingAssetsUrl?: string; // Opcional
    companyName?: string;
    productName?: string;
    productVersion?: string;
    // Puedes añadir más propiedades según tu plantilla de Unity
  };
  onSegmentClick?: (segmentID: string, isSelectedStr: string) => void;
  className?: string;
  width?: string;  // Por ejemplo "100%" o "800px"
  height?: string; // Por ejemplo "100%" o "600px"
}

// --- Declaraciones Globales para Window ---
// Esto le dice a TypeScript qué esperar en el objeto global `window`
declare global {
  interface Window {
    unityInstance?: any; // La instancia de Unity, una vez creada
    createUnityInstance: ( // Función del cargador de Unity
      canvasHtmlElement: HTMLCanvasElement,
      config: UnityWebGLEmbedProps['unityConfig'], // Usa el tipo de la prop
      onProgress?: (progress: number) => void
    ) => Promise<any>; // Retorna una promesa que resuelve a la unityInstance
    receiveSegmentClickFromUnity?: (segmentName: string, isSelectedStr: string) => void; // Tu callback
  }
}

// --- El Componente Funcional ---
const UnityWebGLEmbed: React.FC<UnityWebGLEmbedProps> = ({
  unityLoaderUrl,
  unityConfig,
  onSegmentClick,
  className = '',
  width = '100%',
  height = '500px', // Un valor por defecto razonable
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unityInstanceRef = useRef<any>(null); // Para almacenar la instancia de Unity

  // Hook para configurar la comunicación DESDE Unity HACIA React y la limpieza
  useEffect(() => {
    // Define la función global que Unity llamará
    window.receiveSegmentClickFromUnity = (segmentName, isSelectedStr) => {
      console.log(`[React] Desde Unity: Segmento='${segmentName}', Seleccionado='${isSelectedStr}'`);
      if (onSegmentClick) {
        onSegmentClick(segmentName, isSelectedStr);
      }
      const isSelected = isSelectedStr.toLowerCase() === 'true';
      toast({
        title: "Interacción con Octágono 3D",
        description: `Segmento: ${segmentName}, Estado: ${isSelected ? 'Seleccionado' : 'Deseleccionado'}`,
      });
    };

    // Función de limpieza (se ejecuta cuando el componente se desmonta)
    return () => {
      console.log("[React] Desmontando UnityWebGLEmbed. Limpiando...");
      // Intenta cerrar la instancia de Unity
      if (unityInstanceRef.current && typeof unityInstanceRef.current.Quit === 'function') {
        unityInstanceRef.current.Quit()
          .then(() => {
            console.log("[React] Instancia de Unity cerrada correctamente.");
          })
          .catch((err: Error) => {
            console.error("[React] Error al cerrar la instancia de Unity:", err);
          });
      }
      // Elimina la función global y la referencia
      delete window.receiveSegmentClickFromUnity;
      unityInstanceRef.current = null;
    };
  }, [onSegmentClick, toast]); // Dependencias: se re-ejecuta si estas cambian

  // Hook para cargar y crear la instancia de Unity
  useEffect(() => {
    if (!canvasRef.current) {
      console.warn("[React] Canvas ref no está listo aún.");
      return;
    }
    if (!unityLoaderUrl || !unityConfig || !unityConfig.codeUrl || !unityConfig.dataUrl || !unityConfig.frameworkUrl) {
      console.error("[React] Faltan URLs de configuración esenciales para Unity (loader, config, code, data, framework).");
      toast({ title: "Error de Configuración", description: "Faltan datos para cargar el componente 3D.", variant: "destructive" });
      return;
    }

    const canvasElement = canvasRef.current;
    let scriptElement: HTMLScriptElement | null = null;

    const loadAndInitializeUnity = async () => {
      // Prevenir múltiples cargas si ya existe una instancia
      if (unityInstanceRef.current) {
        console.log("[React] La instancia de Unity ya existe o se está cargando.");
        return;
      }

      try {
        // Carga dinámica del script loader de Unity
        console.log(`[React] Cargando script loader de Unity desde: ${unityLoaderUrl}`);
        scriptElement = document.createElement('script');
        scriptElement.src = unityLoaderUrl;
        scriptElement.async = true;

        scriptElement.onload = async () => {
          console.log("[React] Script loader de Unity cargado.");
          if (typeof window.createUnityInstance === 'function') {
            console.log("[React] Llamando a createUnityInstance...");
            try {
              const instance = await window.createUnityInstance(
                canvasElement,
                unityConfig,
                (progress) => {
                  console.log(`[React] Progreso de carga de Unity: ${Math.round(progress * 100)}%`);
                  // Aquí podrías actualizar un estado para una barra de progreso visual
                }
              );
              console.log("[React] Instancia de Unity creada exitosamente:", instance);
              unityInstanceRef.current = instance; // Almacena la instancia
            } catch (error) {
              console.error("[React] Error al llamar a createUnityInstance:", error);
              toast({ title: "Error de Inicialización", description: "No se pudo inicializar el componente 3D.", variant: "destructive" });
            }
          } else {
            console.error("[React] `window.createUnityInstance` no está definido. El script loader de Unity no se cargó o no expuso la función correctamente.");
            toast({ title: "Error Crítico", description: "Función de inicialización 3D no encontrada.", variant: "destructive" });
          }
        };

        scriptElement.onerror = () => {
          console.error(`[React] Error al cargar el script loader de Unity desde: ${unityLoaderUrl}`);
          toast({ title: "Error de Carga de Script", description: "No se pudo obtener el script del componente 3D.", variant: "destructive" });
        };

        document.body.appendChild(scriptElement);
      } catch (error) {
        console.error("[React] Error general en el proceso de carga de Unity:", error);
      }
    };

    loadAndInitializeUnity();

    // Función de limpieza para este useEffect (principalmente para el script si se desmonta antes de cargar)
    return () => {
      if (scriptElement && scriptElement.parentNode) {
        console.log("[React] Removiendo script loader de Unity del DOM (limpieza de efecto de carga).");
        scriptElement.parentNode.removeChild(scriptElement);
      }
      // La limpieza de la instancia de Unity se maneja en el primer useEffect
      // pero si la instancia se estaba creando y el componente se desmonta,
      // la promesa de createUnityInstance podría resolverse después,
      // por lo que el primer useEffect intentará hacer Quit().
    };
  }, [unityLoaderUrl, unityConfig]); // Dependencias: se re-ejecuta si estas cambian

  return (
    <div
      className={`unity-webgl-embed-container ${className}`}
      style={{ width: width, height: height, position: 'relative' /* Para indicadores de carga absolutos */ }}
    >
      <canvas
        ref={canvasRef}
        id="unity-canvas" // Útil para debug y si Unity lo requiere
        style={{ width: '100%', height: '100%', display: 'block' }}
        // Considera añadir un tabIndex si quieres que el canvas reciba foco para input de teclado
        // tabIndex={0}
      />
      {/* 
        Aquí podrías añadir un indicador de carga visual. Ejemplo:
        {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            Cargando Octágono 3D... {Math.round(loadingProgress * 100)}%
          </div>
        )}
      */}
    </div>
  );
};

export default UnityWebGLEmbed;