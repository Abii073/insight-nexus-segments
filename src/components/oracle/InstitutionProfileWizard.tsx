import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Lock } from 'lucide-react';

interface InstitutionProfileWizardProps {
  onComplete: (profile: any) => void;
  prefilledData?: {
    institutionName?: string;
    institutionType?: string;
    institutionSize?: string;
  };
}

const InstitutionProfileWizard = ({ onComplete, prefilledData }: InstitutionProfileWizardProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    institutionName: prefilledData?.institutionName || '',
    institutionType: prefilledData?.institutionType || '',
    institutionSize: prefilledData?.institutionSize || '',
    primaryUseCases: [] as string[],
    techMaturity: [] as string[],
    regulatoryScope: [] as string[],
    dataVolume: '',
    currentSystems: ''
  });

  const isPreFilled = Boolean(prefilledData?.institutionName);

  const useCases = [
    'Fraud Detection & Prevention',
    'Customer 360 Analytics',
    'KYC & Onboarding',
    'Risk Assessment',
    'Regulatory Reporting',
    'Credit Scoring',
    'Transaction Monitoring',
    'Customer Segmentation'
  ];

  const techMaturityOptions = [
    'Cloud-first architecture',
    'Hybrid cloud deployment',
    'On-premises legacy systems',
    'Microservices architecture',
    'Real-time data processing',
    'Machine learning capabilities',
    'API-first approach',
    'DevOps practices'
  ];

  const regulatoryOptions = [
    'CNBV Compliance (Mexico)',
    'SOFOM Regulations',
    'Anti-Money Laundering (AML)',
    'Know Your Customer (KYC)',
    'PCI DSS Compliance',
    'Data Privacy (GDPR/CCPA)',
    'Basel III Requirements',
    'FATCA Reporting'
  ];

  const handleArrayChange = (field: keyof typeof profile, value: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(profile);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.institutionName && profile.institutionType && profile.institutionSize;
      case 2:
        return profile.primaryUseCases.length > 0;
      case 3:
        return profile.techMaturity.length > 0;
      case 4:
        return profile.regulatoryScope.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Institution Information"}
              {step === 2 && "Primary Use Cases"}
              {step === 3 && "Technical Maturity"}
              {step === 4 && "Regulatory Requirements"}
            </CardTitle>
            <p className="text-gray-600">
              Step {step} of 4 - Help us customize your Oracle integration experience
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                {isPreFilled && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-blue-700">
                        Institution details have been automatically populated based on your selection.
                      </p>
                    </div>
                  </div>
                )}
                <div>
                  <Label htmlFor="institution-name">Institution Name</Label>
                  <Input
                    id="institution-name"
                    placeholder="e.g., Banco Nacional de México"
                    value={profile.institutionName}
                    onChange={(e) => setProfile(prev => ({ ...prev, institutionName: e.target.value }))}
                    disabled={isPreFilled}
                    className={isPreFilled ? "bg-gray-100" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="institution-type">Institution Type</Label>
                  <Select 
                    value={profile.institutionType} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, institutionType: value }))}
                    disabled={isPreFilled}
                  >
                    <SelectTrigger className={isPreFilled ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial-bank">Commercial Bank</SelectItem>
                      <SelectItem value="investment-bank">Investment Bank</SelectItem>
                      <SelectItem value="credit-union">Credit Union</SelectItem>
                      <SelectItem value="fintech">FinTech Company</SelectItem>
                      <SelectItem value="sofom">SOFOM</SelectItem>
                      <SelectItem value="payment-processor">Payment Processor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="institution-size">Institution Size</Label>
                  <Select 
                    value={profile.institutionSize} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, institutionSize: value }))}
                    disabled={isPreFilled}
                  >
                    <SelectTrigger className={isPreFilled ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (&lt; 1M customers)</SelectItem>
                      <SelectItem value="medium">Medium (1M - 10M customers)</SelectItem>
                      <SelectItem value="large">Large (10M+ customers)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (50M+ customers)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Select your primary data use cases (choose all that apply):</p>
                <div className="grid grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center space-x-2">
                      <Checkbox
                        id={useCase}
                        checked={profile.primaryUseCases.includes(useCase)}
                        onCheckedChange={(checked) => handleArrayChange('primaryUseCases', useCase, checked as boolean)}
                      />
                      <Label htmlFor={useCase} className="text-sm">{useCase}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Select your current technical capabilities:</p>
                <div className="grid grid-cols-1 gap-3">
                  {techMaturityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={profile.techMaturity.includes(option)}
                        onCheckedChange={(checked) => handleArrayChange('techMaturity', option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Select applicable regulatory requirements:</p>
                <div className="grid grid-cols-1 gap-3">
                  {regulatoryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={profile.regulatoryScope.includes(option)}
                        onCheckedChange={(checked) => handleArrayChange('regulatoryScope', option, checked as boolean)}
                      />
                      <Label htmlFor={option} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-brand-500 hover:bg-brand-600"
              >
                {step === 4 ? 'Complete Profile' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstitutionProfileWizard;
