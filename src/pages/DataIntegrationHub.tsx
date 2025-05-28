
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Database, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from '../components/Logo';
import ODIIntegrationCard from '../components/oracle/ODIIntegrationCard';
import OracleDBSetupCard from '../components/oracle/OracleDBSetupCard';
import FusionAnalyticsSetupCard from '../components/oracle/FusionAnalyticsSetupCard';
import GoldenGateStreamingCard from '../components/oracle/GoldenGateStreamingCard';
import InstitutionProfileWizard from '../components/oracle/InstitutionProfileWizard';
import StepIndicator from '../components/oracle/StepIndicator';

const DataIntegrationHub = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showWizard, setShowWizard] = useState(false);
  const [institutionProfile, setInstitutionProfile] = useState(null);

  const oracleServices = [
    {
      icon: Database,
      title: "Oracle Data Integrator (ODI)",
      description: "Extract, transform, and load data from multiple sources with enterprise-grade ETL capabilities.",
      benefits: ["Real-time data synchronization", "Automated data quality checks", "Regulatory compliance tracking"]
    },
    {
      icon: Shield,
      title: "Oracle 23ai Autonomous Database",
      description: "Self-managing, self-securing database with built-in machine learning for intelligent insights.",
      benefits: ["Automated fraud detection", "Customer 360 analytics", "Self-tuning performance"]
    },
    {
      icon: BarChart3,
      title: "Oracle Fusion Analytics",
      description: "Pre-built analytics for financial services with embedded ML and AI capabilities.",
      benefits: ["Risk assessment dashboards", "Regulatory reporting", "Customer behavior insights"]
    },
    {
      icon: Zap,
      title: "Oracle GoldenGate",
      description: "Real-time data streaming and replication for immediate transaction analysis.",
      benefits: ["Real-time fraud detection", "Instant compliance monitoring", "Live customer insights"]
    }
  ];

  const handleStartIntegration = () => {
    setShowWizard(true);
    setCurrentStep(2);
  };

  const handleProfileComplete = (profile: any) => {
    setInstitutionProfile(profile);
    setCurrentStep(3);
    setShowWizard(false);
  };

  const handleSetupComplete = () => {
    setCurrentStep(4);
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
            <Logo size="lg" className="justify-center mb-4" />
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
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-6" />
          <StepIndicator currentStep={currentStep} />
        </div>

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Oracle Cloud Data Integration Hub
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Seamlessly integrate your financial data with Oracle's enterprise-grade cloud services
              </p>
              <p className="text-lg text-gray-500 mb-8">
                Enable intelligent classification and real-time insights for regulatory compliance and customer intelligence
              </p>
              
              <div className="flex justify-center items-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Real-time Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Cloud-Native Architecture</span>
                </div>
              </div>
            </div>

            {/* Oracle Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {oracleServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <service.icon className="w-8 h-8 text-brand-500" />
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-800">Key Benefits:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3"
                onClick={handleStartIntegration}
              >
                Start Integration Setup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Configure your institutional profile and Oracle services in just a few steps
              </p>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Configure Oracle Services
              </h2>
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
                className="bg-brand-500 hover:bg-brand-600"
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
