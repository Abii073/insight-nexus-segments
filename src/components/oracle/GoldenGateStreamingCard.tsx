
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Zap, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GoldenGateStreamingCard = () => {
  const [isDemo, setIsDemo] = useState(true);
  const [config, setConfig] = useState({
    streamEndpoint: '',
    tenancy: '',
    userId: '',
    fingerprint: ''
  });

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-orange-600" />
            <CardTitle>Oracle GoldenGate</CardTitle>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Real-time data streaming for immediate transaction analysis and fraud detection</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm text-orange-700">
            <strong>Real-time Capabilities:</strong><br />
            • Live transaction monitoring<br />
            • Instant fraud detection alerts<br />
            • Real-time compliance checks
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={isDemo} 
            onCheckedChange={setIsDemo}
            id="gg-demo"
          />
          <Label htmlFor="gg-demo">Use Demo Streaming</Label>
        </div>

        {!isDemo && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="gg-endpoint">Stream Endpoint</Label>
              <Input
                id="gg-endpoint"
                placeholder="https://your-region.streaming.oci.oraclecloud.com"
                value={config.streamEndpoint}
                onChange={(e) => handleConfigChange('streamEndpoint', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gg-tenancy">Tenancy OCID</Label>
              <Input
                id="gg-tenancy"
                placeholder="ocid1.tenancy.oc1..aaaaa..."
                value={config.tenancy}
                onChange={(e) => handleConfigChange('tenancy', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gg-user">User OCID</Label>
              <Input
                id="gg-user"
                placeholder="ocid1.user.oc1..aaaaa..."
                value={config.userId}
                onChange={(e) => handleConfigChange('userId', e.target.value)}
              />
            </div>
          </div>
        )}

        <Button className="w-full" variant={isDemo ? "default" : "outline"}>
          {isDemo ? 'Enable Demo Streaming' : 'Configure Streams'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GoldenGateStreamingCard;
