
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import EmbeddedUnityModel, { EmbeddedUnityModelProps } from './EmbeddedUnityModel';

// Props for the OctagonView component
interface OctagonViewProps {
  selectedAttribute?: string;
  unityModelUrl: string;
  onOctagonSegmentClicked?: (segmentId: string, isSelected: boolean) => void;
  onUnityInstanceLoaded?: (instance: any) => void;
  className?: string;
  height?: string;
  width?: string;
}

const OctagonView: React.FC<OctagonViewProps> = ({
  selectedAttribute,
  unityModelUrl,
  onOctagonSegmentClicked,
  onUnityInstanceLoaded,
  className = '',
  width = "100%",
  height = "500px", // Increased default height
}) => {
  return (
    <div className={`relative w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 ${className}`}>
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

        {/* Use the new EmbeddedUnityModel component */}
        <EmbeddedUnityModel
          selectedAttribute={selectedAttribute}
          unitySrcUrl={unityModelUrl}
          onUnitySegmentClicked={onOctagonSegmentClicked}
          onUnityInstanceLoaded={onUnityInstanceLoaded}
          width={width}
          height={height}
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
