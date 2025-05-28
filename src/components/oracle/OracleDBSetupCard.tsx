
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const OracleDBSetupCard = () => {
  const [isDemo, setIsDemo] = useState(true);
  const [config, setConfig] = useState({
    connectionString: '',
    username: '',
    password: '',
    serviceName: ''
  });

  const handleConfigChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-green-600" />
            <CardTitle>Oracle 23ai Autonomous Database</CardTitle>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Self-managing database with built-in ML for intelligent customer insights</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700">
            <strong>AI-Powered Features:</strong><br />
            • Automated fraud pattern detection<br />
            • Customer 360 analytics<br />
            • Predictive risk scoring
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={isDemo} 
            onCheckedChange={setIsDemo}
            id="db-demo"
          />
          <Label htmlFor="db-demo">Use Demo Database</Label>
        </div>

        {!isDemo && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="db-connection">Connection String</Label>
              <Input
                id="db-connection"
                placeholder="your-db_high?TNS_ADMIN=/path/to/wallet"
                value={config.connectionString}
                onChange={(e) => handleConfigChange('connectionString', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="db-username">Database Username</Label>
              <Input
                id="db-username"
                placeholder="ADMIN"
                value={config.username}
                onChange={(e) => handleConfigChange('username', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="db-password">Password</Label>
              <Input
                id="db-password"
                type="password"
                placeholder="Enter database password"
                value={config.password}
                onChange={(e) => handleConfigChange('password', e.target.value)}
              />
            </div>
          </div>
        )}

        <Button className="w-full" variant={isDemo ? "default" : "outline"}>
          {isDemo ? 'Connect Demo Database' : 'Test Connection'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OracleDBSetupCard;
