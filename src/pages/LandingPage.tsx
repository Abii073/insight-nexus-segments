
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from "sonner";
import Logo from '../components/Logo';
import BackgroundGradient from '../components/BackgroundGradient';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [maturityLevel, setMaturityLevel] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || !industry || !companySize || !maturityLevel) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Navigate to loading screen
    navigate('/loading');
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-50">
      <BackgroundGradient />
      
      {/* Left side - Branding */}
      <div className="md:w-1/2 flex flex-col p-8 md:p-16 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="lg" className="mb-6" />
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-powered customer segmentation
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Unlock the full potential of your customer data with our advanced AI segmentation platform.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-brand-100 p-2 rounded-full mr-3">
                <svg 
                  className="w-5 h-5 text-brand-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Deep customer insights in minutes</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-brand-100 p-2 rounded-full mr-3">
                <svg 
                  className="w-5 h-5 text-brand-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Strategic campaign recommendations</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-brand-100 p-2 rounded-full mr-3">
                <svg 
                  className="w-5 h-5 text-brand-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700">Predictive customer behavior analysis</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="md:w-1/2 p-8 md:p-16 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500">Login to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Customize your experience</p>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-50 employees)</SelectItem>
                      <SelectItem value="medium">Medium (51-500 employees)</SelectItem>
                      <SelectItem value="large">Large (501-5000 employees)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (5000+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maturity">Digital Maturity Level</Label>
                  <Select value={maturityLevel} onValueChange={setMaturityLevel}>
                    <SelectTrigger id="maturity">
                      <SelectValue placeholder="Select Maturity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              Log in
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
