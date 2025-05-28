
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import Logo from '../components/Logo';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  useEffect(() => {
    const state = location.state as any;
    if (state?.demo) {
      setIsDemo(true);
      setEmail('demo@octagon.ai');
      setPassword('demo123');
    }
    if (state?.institution) {
      setSelectedInstitution(state.institution);
    }
  }, [location]);

  const institutionNames = {
    banamex: 'Banamex',
    bbva: 'BBVA México',
    banorte: 'Banorte',
    santander: 'Santander México'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isDemo) {
        if (email === 'demo@octagon.ai' && password === 'demo123') {
          toast.success("Demo authentication successful!");
          navigate('/data-integration');
        } else {
          toast.error("Invalid demo credentials. Use demo@octagon.ai / demo123");
        }
      } else {
        // Simulate institutional authentication
        const institutionName = selectedInstitution ? institutionNames[selectedInstitution as keyof typeof institutionNames] : 'your institution';
        toast.success(`Authentication successful with ${institutionName}!`);
        navigate('/data-integration');
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (isDemo) {
      toast.info("Demo credentials: demo@octagon.ai / demo123");
    } else {
      toast.info("Please contact your institution's IT support for password reset.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/institutions')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="text-sm text-gray-500">
            Step 2 of 3
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Logo */}
          <div className="text-center">
            <Logo size="lg" className="justify-center mb-4" />
          </div>

          {/* Authentication Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isDemo ? 'Demo Access' : 'Institution Login'}
              </CardTitle>
              <p className="text-gray-500">
                {isDemo 
                  ? 'Explore the Octagon Classification Platform'
                  : selectedInstitution 
                    ? `Login with your ${institutionNames[selectedInstitution as keyof typeof institutionNames]} credentials`
                    : 'Login with your institutional credentials'
                }
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={isDemo ? "demo@octagon.ai" : "your.email@institution.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    disabled={isDemo}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={isDemo ? "demo123" : "••••••••"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10"
                      disabled={isDemo}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {isDemo && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-700">
                      <strong>Demo Credentials:</strong><br />
                      Email: demo@octagon.ai<br />
                      Password: demo123
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    isDemo ? 'Access Demo' : 'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm text-brand-600 hover:text-brand-700 block mx-auto"
                >
                  Forgot your password?
                </button>

                <div className="flex items-center space-x-2 text-xs text-gray-500 justify-center">
                  <Shield className="w-3 h-3" />
                  <span>Enterprise-grade security • SOC 2 Type II compliant</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Switch between demo and institutional */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(isDemo ? '/institutions' : '/institutions')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              {isDemo ? 'Use institutional login instead' : 'Try demo access instead'}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
