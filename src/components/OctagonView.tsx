
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

const WebGLEmbed = () => (
  <div className="w-full h-full">
    <iframe
      frameBorder="0"
      src="https://683672be04cd50a34ab590dd--effervescent-faun-83fb85.netlify.app/"
      allowFullScreen={true}
      width="500"
      height="320"
      className="w-full h-full"
    >
    </iframe>
  </div>
);

const OctagonView = () => {
  const navigate = useNavigate();
  const [open3DView, setOpen3DView] = useState(false);
  
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full p-6 text-white">
        <div className="text-4xl font-bold mb-6">Octagon</div>
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <Alert className="bg-gray-700 border-gray-600 max-w-md">
          <AlertTitle>Customer Segments</AlertTitle>
          <AlertDescription>
            Select a customer segment below to explore detailed profiles and insights.
          </AlertDescription>
        </Alert>
        
        <Dialog open={open3DView} onOpenChange={setOpen3DView}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="mt-4 bg-blue-600 hover:bg-blue-700 border-blue-500 text-white"
            >
              View 3D Interactive Model
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] sm:h-[85vh] sm:w-[85vw]">
            <DialogHeader>
              <DialogTitle>3D Customer Segmentation Model</DialogTitle>
            </DialogHeader>
            <div className="h-[75vh] w-full">
              <WebGLEmbed />
            </div>
          </DialogContent>
        </Dialog>
        
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
    </div>
  );
};

export default OctagonView;
