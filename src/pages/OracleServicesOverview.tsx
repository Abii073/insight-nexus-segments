
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Database, Zap, BarChart3, CheckCircle } from 'lucide-react';
import StepWrapper from '../components/onboarding/StepWrapper';

const OracleServicesOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedInstitution = location.state?.institution;

  const services = [
    {
      icon: Database,
      title: "Oracle Data Integrator (ODI)",
      description: "Extract, transform, and load data with enterprise-grade ETL capabilities",
      benefits: ["Real-time data synchronization", "Automated data quality checks"]
    },
    {
      icon: Shield,
      title: "Oracle Autonomous Database",
      description: "Self-managing, self-securing database with built-in machine learning",
      benefits: ["Automated fraud detection", "Customer 360 analytics"]
    },
    {
      icon: BarChart3,
      title: "Oracle Fusion Analytics",
      description: "Pre-built analytics for financial services with embedded AI",
      benefits: ["Risk assessment dashboards", "Regulatory reporting"]
    },
    {
      icon: Zap,
      title: "Oracle GoldenGate",
      description: "Real-time data streaming for immediate transaction analysis",
      benefits: ["Real-time fraud detection", "Live customer insights"]
    }
  ];

  const handleContinue = () => {
    navigate('/auth', { state: { institution: selectedInstitution } });
  };

  return (
    <StepWrapper
      currentStep={3}
      totalSteps={6}
      stepTitle="Oracle Cloud Integration Overview"
      stepDescription="Understand the enterprise-grade services that will power your customer intelligence platform"
    >
      <div className="space-y-8">
        {/* Oracle Branding Header */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/fb9cf9c4-5b8d-4716-8791-144d7eb520da.png" 
              alt="Oracle" 
              className="h-12"
            />
            <span className="text-sm text-gray-500 mt-2">Powered by Oracle Cloud</span>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Data Flow Architecture</h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="bg-white rounded px-3 py-2 shadow-sm">Your Institution</div>
              <ArrowRight className="w-4 h-4 text-red-500" />
              <div className="bg-white rounded px-3 py-2 shadow-sm">Oracle Cloud</div>
              <ArrowRight className="w-4 h-4 text-red-500" />
              <div className="bg-white rounded px-3 py-2 shadow-sm">Octagon AI</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Secure, encrypted data flow with enterprise-grade compliance</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <service.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <CardTitle className="text-base">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security & Compliance */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Security & Compliance</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>ISO 27001 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>End-to-End Encryption</span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
          >
            Continue to Login
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            Next: Secure authentication with {selectedInstitution === 'banorte' ? 'Banorte' : 'your institution'}
          </p>
        </div>
      </div>
    </StepWrapper>
  );
};

export default OracleServicesOverview;
