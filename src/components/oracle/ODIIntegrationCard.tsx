
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Database, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ODIIntegrationCard = () => {
  const [isDemo, setIsDemo] = useState(true);
  const [config, setConfig] = useState({
    endpoint: '',
    apiKey: '',
    workspace: '',
    repository: ''
  });

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="w-6 h-6 text-blue-600" />
            <CardTitle>Oracle Data Integrator (ODI)</CardTitle>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Extract, transform, and load data from multiple sources with enterprise-grade ETL capabilities</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            <strong>Financial Use Cases:</strong><br />
            • Customer data consolidation across channels<br />
            • Regulatory reporting automation<br />
            • Real-time fraud detection pipelines
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={isDemo} 
            onCheckedChange={setIsDemo}
            id="odi-demo"
          />
          <Label htmlFor="odi-demo">Use Demo Configuration</Label>
        </div>

        {!isDemo && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="odi-endpoint">ODI Endpoint URL</Label>
              <Input
                id="odi-endpoint"
                placeholder="https://your-odi-instance.oraclecloud.com"
                value={config.endpoint}
                onChange={(e) => handleConfigChange('endpoint', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="odi-api-key">API Key</Label>
              <Input
                id="odi-api-key"
                type="password"
                placeholder="Enter your ODI API key"
                value={config.apiKey}
                onChange={(e) => handleConfigChange('apiKey', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="odi-workspace">Workspace</Label>
              <Input
                id="odi-workspace"
                placeholder="WORKREP"
                value={config.workspace}
                onChange={(e) => handleConfigChange('workspace', e.target.value)}
              />
            </div>
          </div>
        )}

        <Button className="w-full" variant={isDemo ? "default" : "outline"}>
          {isDemo ? 'Configure Demo ODI' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ODIIntegrationCard;
