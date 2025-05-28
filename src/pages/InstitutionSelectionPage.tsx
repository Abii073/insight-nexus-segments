
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import Logo from '../components/Logo';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, Shield, CheckCircle } from 'lucide-react';

const institutions = [
  {
    id: 'banamex',
    name: 'Banamex',
    logo: '🏦',
    description: 'Grupo Financiero Banamex - Leading Mexican financial institution',
    color: 'bg-red-50 border-red-200 hover:bg-red-100',
    available: true
  },
  {
    id: 'bbva',
    name: 'BBVA México',
    logo: '🏛️',
    description: 'BBVA - Digital banking innovation leader',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    available: true
  },
  {
    id: 'banorte',
    name: 'Banorte',
    logo: '🏢',
    description: 'Grupo Financiero Banorte - Mexican banking excellence',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
    available: true
  },
  {
    id: 'santander',
    name: 'Santander México',
    logo: '🏪',
    description: 'Banco Santander - Global banking expertise',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    available: false
  }
];

const InstitutionSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInstitutionSelect = async (institutionId: string, available: boolean) => {
    if (!available) {
      toast.error("This institution is not yet available. Please try another option.");
      return;
    }

    setSelectedInstitution(institutionId);
    setIsLoading(true);

    // Simulate authentication flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Connecting to ${institutions.find(i => i.id === institutionId)?.name}...`);
      navigate('/auth', { state: { institution: institutionId } });
    }, 1500);
  };

  const handleDemoAccess = () => {
    toast.success("Accessing demo environment...");
    navigate('/auth', { state: { demo: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <Logo size="md" />
          </div>
          <div className="text-sm text-gray-500">
            Step 1 of 3
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-brand-600">Select Institution</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-gray-500">Authentication</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-gray-500">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Select Your Financial Institution
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your institution to access the Octagon Classification Platform with 
              enterprise-grade security and compliance.
            </p>
          </motion.div>

          {/* Institution Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{institution.logo}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{institution.name}</h3>
                          {institution.available ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{institution.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Demo Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="border-t border-gray-200 pt-8">
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
          </motion.div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full"></div>
                <span className="text-gray-700">Connecting to institution...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionSelectionPage;
