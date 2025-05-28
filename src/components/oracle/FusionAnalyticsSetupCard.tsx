
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BarChart3, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const FusionAnalyticsSetupCard = () => {
  const [isDemo, setIsDemo] = useState(true);
  const [config, setConfig] = useState({
    instance: '',
    username: '',
    password: '',
    domain: ''
  });

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <CardTitle>Oracle Fusion Analytics</CardTitle>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Pre-built analytics for financial services with embedded ML capabilities</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-sm text-purple-700">
            <strong>Analytics Capabilities:</strong><br />
            • Risk assessment dashboards<br />
            • Regulatory compliance reporting<br />
            • Customer behavior insights
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={isDemo} 
            onCheckedChange={setIsDemo}
            id="fusion-demo"
          />
          <Label htmlFor="fusion-demo">Use Demo Analytics</Label>
        </div>

        {!isDemo && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="fusion-instance">Analytics Instance</Label>
              <Input
                id="fusion-instance"
                placeholder="https://your-instance.analytics.ocp.oraclecloud.com"
                value={config.instance}
                onChange={(e) => handleConfigChange('instance', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fusion-username">Username</Label>
              <Input
                id="fusion-username"
                placeholder="analytics.user@company.com"
                value={config.username}
                onChange={(e) => handleConfigChange('username', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="fusion-password">Password</Label>
              <Input
                id="fusion-password"
                type="password"
                placeholder="Enter password"
                value={config.password}
                onChange={(e) => handleConfigChange('password', e.target.value)}
              />
            </div>
          </div>
        )}

        <Button className="w-full" variant={isDemo ? "default" : "outline"}>
          {isDemo ? 'Setup Demo Analytics' : 'Connect to Fusion'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FusionAnalyticsSetupCard;
