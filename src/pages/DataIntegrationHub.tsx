
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from '../components/Logo';
import ODIIntegrationCard from '../components/oracle/ODIIntegrationCard';
import OracleDBSetupCard from '../components/oracle/OracleDBSetupCard';
import FusionAnalyticsSetupCard from '../components/oracle/FusionAnalyticsSetupCard';
import GoldenGateStreamingCard from '../components/oracle/GoldenGateStreamingCard';
import InstitutionProfileWizard from '../components/oracle/InstitutionProfileWizard';
import StepIndicator from '../components/oracle/StepIndicator';

const DataIntegrationHub = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // Start with Institution Profile
  const [showWizard, setShowWizard] = useState(true); // Show wizard immediately
  const [institutionProfile, setInstitutionProfile] = useState(null);

  const handleProfileComplete = (profile: any) => {
    setInstitutionProfile(profile);
    setCurrentStep(2); // Move to Service Integration
    setShowWizard(false);
  };

  const handleSetupComplete = () => {
    setCurrentStep(3); // Move to processing
    // Navigate to loading screen then to attributes
    setTimeout(() => {
      navigate('/loading');
    }, 2000);
  };

  if (showWizard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <Logo size="lg" />
              <div className="h-8 w-px bg-gray-300"></div>
              <img 
                src="/lovable-uploads/fb9cf9c4-5b8d-4716-8791-144d7eb520da.png" 
                alt="Oracle" 
                className="h-8"
              />
            </div>
            <StepIndicator currentStep={currentStep} />
          </div>
          <InstitutionProfileWizard onComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Oracle Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <Logo size="lg" />
            <div className="h-10 w-px bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <img 
                src="/lovable-uploads/fb9cf9c4-5b8d-4716-8791-144d7eb520da.png" 
                alt="Oracle" 
                className="h-10"
              />
              <span className="text-xs text-gray-500 mt-1">Powered by Oracle Cloud</span>
            </div>
          </div>
          <StepIndicator currentStep={currentStep} />
        </div>

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-3"></div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Configure Oracle Services
                </h2>
                <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full ml-3"></div>
              </div>
              <p className="text-gray-600">
                Set up your Oracle Cloud integrations based on your institutional profile
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ODIIntegrationCard />
              <OracleDBSetupCard />
              <FusionAnalyticsSetupCard />
              <GoldenGateStreamingCard />
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 shadow-lg"
                onClick={handleSetupComplete}
              >
                Complete Integration Setup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DataIntegrationHub;
