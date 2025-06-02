
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, Shield, CheckCircle } from 'lucide-react';
import StepWrapper from '../components/onboarding/StepWrapper';

const institutions = [
  {
    id: 'banorte',
    name: 'Banorte',
    logo: '/lovable-uploads/b442d83e-3497-45e4-bd7d-1297586126b0.png',
    description: 'Grupo Financiero Banorte - Mexican banking excellence',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    available: true
  },
  {
    id: 'banamex',
    name: 'Banamex',
    logo: '/lovable-uploads/27f86398-e70f-4e7c-9eda-eee20b0d5ae8.png',
    description: 'Grupo Financiero Banamex - Leading Mexican financial institution',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
    available: false
  },
  {
    id: 'bbva',
    name: 'BBVA México',
    logo: '/lovable-uploads/440f6d8a-1fed-426b-b074-888719cb32ba.png',
    description: 'BBVA - Digital banking innovation leader',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    available: false
  },
  {
    id: 'santander',
    name: 'Santander México',
    logo: '/lovable-uploads/6a68d80e-3bb7-4f5c-ab9b-02adac43c64b.png',
    description: 'Banco Santander - Global banking expertise',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    available: false
  }
];

const InstitutionSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  const handleInstitutionSelect = (institutionId: string, available: boolean) => {
    if (!available) {
      toast.error("This institution is not yet available. Please try another option.");
      return;
    }

    setSelectedInstitution(institutionId);
    // Store in session storage for persistence
    sessionStorage.setItem('selectedInstitution', institutionId);
    
    toast.success(`${institutions.find(i => i.id === institutionId)?.name} selected`);
    navigate('/oracle-overview', { state: { institution: institutionId } });
  };

  const handleDemoAccess = () => {
    toast.success("Accessing demo environment...");
    navigate('/oracle-overview', { state: { demo: true } });
  };

  return (
    <StepWrapper
      currentStep={2}
      totalSteps={6}
      stepTitle="Select Your Financial Institution"
      stepDescription="Choose your institution to access the Octagon Classification Platform with enterprise-grade security"
    >
      <div className="space-y-8">
        {/* Back Button */}
        <div className="flex justify-start mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Institution Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {institutions.map((institution, index) => (
            <motion.div
              key={institution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  institution.available 
                    ? `${institution.color} hover:shadow-lg` 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                } ${selectedInstitution === institution.id ? 'ring-2 ring-brand-500' : ''}`}
                onClick={() => handleInstitutionSelect(institution.id, institution.available)}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <img 
                      src={institution.logo} 
                      alt={`${institution.name} logo`}
                      className="h-8 w-auto object-contain mx-auto"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{institution.name}</h3>
                      {institution.available ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 text-center">{institution.description}</p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>SOC 2 Compliant</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building2 className="w-3 h-3" />
                        <span>Enterprise Ready</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo Access */}
        <div className="text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 mb-4">
            Want to explore without institutional credentials?
          </p>
          <Button
            variant="outline"
            onClick={handleDemoAccess}
            className="bg-white hover:bg-gray-50"
          >
            Access Demo Environment
          </Button>
        </div>
      </div>
    </StepWrapper>
  );
};

export default InstitutionSelectionPage;
