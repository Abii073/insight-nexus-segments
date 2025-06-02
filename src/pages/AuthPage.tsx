
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Eye, EyeOff, CheckCircle } from 'lucide-react';
import StepWrapper from '../components/onboarding/StepWrapper';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const state = location.state as any;
    if (state?.demo) {
      setIsDemo(true);
      setEmail('demo@octagon.ai');
      setPassword('demo123');
    }
    if (state?.institution) {
      setSelectedInstitution(state.institution);
      // Store the selected institution in sessionStorage
      sessionStorage.setItem('selectedInstitution', state.institution);
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
          setIsConnected(true);
          toast.success("Demo authentication successful!");
          // Store connection state
          sessionStorage.setItem('authConnected', 'true');
          setTimeout(() => navigate('/data-integration'), 1500);
        } else {
          toast.error("Invalid demo credentials. Use demo@octagon.ai / demo123");
        }
      } else {
        const institutionName = selectedInstitution ? institutionNames[selectedInstitution as keyof typeof institutionNames] : 'your institution';
        setIsConnected(true);
        toast.success(`Authentication successful with ${institutionName}!`);
        sessionStorage.setItem('authConnected', 'true');
        setTimeout(() => navigate('/data-integration'), 1500);
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

  if (isConnected) {
    return (
      <StepWrapper
        currentStep={4}
        totalSteps={6}
        stepTitle="Connection Successful"
        stepDescription="You are now securely connected to your institution"
      >
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Connected to {isDemo ? 'Demo Environment' : institutionNames[selectedInstitution as keyof typeof institutionNames] || 'Your Institution'}
          </h3>
          <p className="text-gray-600">Proceeding to institution profile setup...</p>
        </div>
      </StepWrapper>
    );
  }

  return (
    <StepWrapper
      currentStep={4}
      totalSteps={6}
      stepTitle={isDemo ? 'Demo Access' : 'Institution Login'}
      stepDescription={isDemo ? 'Explore the Octagon Classification Platform' : 'Secure authentication with your institutional credentials'}
    >
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <div className="flex justify-start mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/oracle-overview', { state: { institution: selectedInstitution } })}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>

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
      </div>
    </StepWrapper>
  );
};

export default AuthPage;
